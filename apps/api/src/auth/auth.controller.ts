import { All, Controller, Logger, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from './auth.config';

@ApiExcludeController()
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  @All('*')
  async handler(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
  ): Promise<void> {
    try {
      const url = new URL(
        request.url,
        `${request.protocol}://${request.hostname}`,
      );

      const headers = fromNodeHeaders(request.headers);

      const req = new Request(url.toString(), {
        method: request.method,
        headers,
        ...(request.body ? { body: JSON.stringify(request.body) } : {}),
      });

      const response = await auth.handler(req);

      reply.status(response.status);

      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });

      const body = await response.text();
      reply.send(body || null);
    } catch (error) {
      this.logger.error('BetterAuth handler error', error);
      reply.status(500).send({ message: 'Internal server error' });
    }
  }
}
