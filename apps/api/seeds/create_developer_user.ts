import 'dotenv/config';
import { db, users } from '@jmfitnessstudio/db';
import { eq } from 'drizzle-orm';
import { auth } from './src/auth/auth.config';

async function seed() {
  const existing = await db.query.users.findFirst({
    where: eq(users.role, 'developer'),
  });

  if (existing) {
    console.log(`Developer user already exists: ${existing.email}`);
    process.exit(0);
  }

  const email = process.env.DEV_EMAIL;
  const password = process.env.DEV_PASSWORD;
  const name = process.env.DEV_NAME ?? 'Developer';

  if (!email || !password) {
    console.error('DEV_EMAIL and DEV_PASSWORD must be set in .env');
    process.exit(1);
  }

  await auth.api.signUpEmail({
    body: { email, password, name },
  });

  await db
    .update(users)
    .set({ role: 'developer', emailVerified: true })
    .where(eq(users.email, email));

  console.log(`Developer user created: ${email}`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
