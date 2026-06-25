import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@jmfitnessstudio/db';
import { users, sessions, accounts, verifications } from '@jmfitnessstudio/db';

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

  generateId: () => crypto.randomUUID(),

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

  user: {
    additionalFields: {
      // input: false em todos — nenhum campo de negócio
      // pode ser definido pelo usuário durante o cadastro
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
