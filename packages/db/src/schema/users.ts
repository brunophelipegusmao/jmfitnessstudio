import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { accounts } from "./accounts";
import { sessions } from "./sessions";

export const roleEnum = pgEnum("role", [
  "developer",
  "owner",
  "instructor",
  "staff",
  "student",
  "customer",
]);

export const planEnum = pgEnum("plan", ["free", "guest", "master"]);

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "canceling",
  "grace",
  "expired",
]);

export const users = pgTable(
  "user",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),

    role: roleEnum("role").default("customer").notNull(),
    plan: planEnum("plan").default("free").notNull(),

    planExpiresAt: timestamp("plan_expires_at"),
    subscriptionStatus: subscriptionStatusEnum("subscription_status"),
    gracePeriodUntil: timestamp("grace_period_until"),
    stripeCustomerId: text("stripe_customer_id").unique(),
    stripeSubscriptionId: text("stripe_subscription_id").unique(),
  },
  (table) => [index("user_email_idx").on(table.email)],
);

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Role = (typeof roleEnum.enumValues)[number];
export type Plan = (typeof planEnum.enumValues)[number];
export type SubscriptionStatus =
  (typeof subscriptionStatusEnum.enumValues)[number];
