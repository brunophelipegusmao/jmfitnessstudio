import { Injectable } from '@nestjs/common';
import { db, users } from '@jmfitnessstudio/db';
import { eq } from 'drizzle-orm';
import type { Role } from '@jmfitnessstudio/db';

@Injectable()
export class AuthService {
  async findById(id: string) {
    return db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }

  async updateRole(id: string, role: Role) {
    const [updated] = await db
      .update(users)
      .set({ role })
      .where(eq(users.id, id))
      .returning();
    return updated;
  }
}
