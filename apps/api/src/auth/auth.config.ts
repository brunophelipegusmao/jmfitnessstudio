import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { APIError } from 'better-auth/api';
import { eq } from 'drizzle-orm';
import { db, users } from '@jmfitnessstudio/db';
import { accounts, sessions, verifications } from '@jmfitnessstudio/db';

const ADMIN_ROLES = ['owner', 'instructor', 'staff'] as const;

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications,
    },
  }),

  advanced: {
    database: {
      generateId: 'uuid',
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      scope: ['email', 'profile'],
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      // TODO: substituir por email service quando módulo de notificações for implementado
      console.log(`[DEV] Verification URL for ${user.email}: ${url}`);
    },
  },

  databaseHooks: {
    account: {
      create: {
        before: async (data) => {
          if (data.providerId === 'google') {
            const user = await db.query.users.findFirst({
              where: eq(users.id, data.userId),
            });

            if (user && ADMIN_ROLES.includes(user.role as (typeof ADMIN_ROLES)[number])) {
              throw new APIError('FORBIDDEN', {
                message: 'Admin users must sign in with email and password',
              });
            }
          }
        },
      },
    },
  },

  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: 'customer',
        input: false,
      },
      plan: {
        type: 'string',
        required: true,
        defaultValue: 'free',
        input: false,
      },
      planExpiresAt: {
        type: 'date',
        required: false,
        defaultValue: null,
        input: false,
      },
      subscriptionStatus: {
        type: 'string',
        required: false,
        defaultValue: null,
        input: false,
      },
      gracePeriodUntil: {
        type: 'date',
        required: false,
        defaultValue: null,
        input: false,
      },
      stripeCustomerId: {
        type: 'string',
        required: false,
        defaultValue: null,
        input: false,
      },
      stripeSubscriptionId: {
        type: 'string',
        required: false,
        defaultValue: null,
        input: false,
      },
    },
  },

  trustedOrigins: [process.env.FRONTEND_URL ?? 'http://localhost:3000'],
});

export type Auth = typeof auth;
