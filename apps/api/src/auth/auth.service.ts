import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { db, users } from '@jmfitnessstudio/db';
import { eq } from 'drizzle-orm';
import type { Role, User } from '@jmfitnessstudio/db';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  async findById(id: string): Promise<User | undefined> {
    return db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }

  async updateRole(id: string, role: Role): Promise<User> {
    const [updated] = await db
      .update(users)
      .set({ role })
      .where(eq(users.id, id))
      .returning();

    if (!updated) {
      throw new NotFoundException(`User ${id} not found`);
    }

    this.logger.log(`Role changed: userId=${id} newRole=${role}`);
    return updated;
  }
}
