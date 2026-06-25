import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

jest.mock('./auth.config', () => ({
  auth: {
    handler: jest.fn(),
  },
}));

jest.mock('better-auth/node', () => ({
  fromNodeHeaders: jest.fn((headers: Record<string, string>) => new Headers(headers)),
}));

import { auth } from './auth.config';

const mockReply = {
  status: jest.fn().mockReturnThis(),
  header: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
};

const mockRequest = {
  url: '/api/auth/sign-in/email',
  protocol: 'http',
  hostname: 'localhost',
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: { email: 'test@example.com', password: 'secret' },
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);

    jest.clearAllMocks();
    mockReply.status.mockReturnValue(mockReply);
    mockReply.header.mockReturnValue(mockReply);
    mockReply.send.mockReturnValue(mockReply);
  });

  describe('handler', () => {
    it('should forward status, headers and body from BetterAuth response', async () => {
      const mockResponse = {
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        text: jest.fn().mockResolvedValue('{"token":"abc"}'),
      };
      (auth.handler as jest.Mock).mockResolvedValue(mockResponse);

      await controller.handler(mockRequest as never, mockReply as never);

      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith('{"token":"abc"}');
    });

    it('should send null body when BetterAuth response body is empty', async () => {
      const mockResponse = {
        status: 204,
        headers: new Headers(),
        text: jest.fn().mockResolvedValue(''),
      };
      (auth.handler as jest.Mock).mockResolvedValue(mockResponse);

      await controller.handler(mockRequest as never, mockReply as never);

      expect(mockReply.send).toHaveBeenCalledWith(null);
    });

    it('should return 500 when auth.handler throws', async () => {
      (auth.handler as jest.Mock).mockRejectedValue(new Error('DB unavailable'));

      await controller.handler(mockRequest as never, mockReply as never);

      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
  });
});
