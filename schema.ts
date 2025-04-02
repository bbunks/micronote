import { relations } from "drizzle-orm";
import { mysqlTable as table } from "drizzle-orm/mysql-core";
import * as t from "drizzle-orm/mysql-core";

const time = {
  created_date: t.timestamp("created_date", { fsp: 6 }),
  last_update: t.timestamp("last_update", { fsp: 6 }),
};

export const role = table("role", {
  id: t.bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  title: t.varchar("title", { length: 255 }),
  ...time,
});

export const user = table("user", {
  id: t.bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  email: t.varchar("email", { length: 255 }),
  enabled: t.boolean("enabled").notNull(),
  first_name: t.varchar("first_name", { length: 255 }),
  last_name: t.varchar("last_name", { length: 255 }),
  password: t.varchar("password", { length: 255 }),
  ...time,
});

export const note = table("note", {
  id: t.bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  user_id: t
    .bigint("user_id", { mode: "number" })
    .notNull()
    .references(() => user.id),
  title: t.varchar("title", { length: 255 }),
  ...time,
});

export const note_content = table("note_content", {
  id: t.bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  type: t.mysqlEnum("type", ["PICTURE", "TEXT"]),
  value: t.mediumtext("value"),
  note_id: t
    .bigint("note_id", { mode: "number" })
    .notNull()
    .references(() => note.id),
  user_id: t
    .bigint("user_id", { mode: "number" })
    .notNull()
    .references(() => user.id),
  ...time,
});

export const tag = table("tag", {
  id: t.bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  color: t.varchar("color", { length: 255 }),
  label: t.varchar("label", { length: 255 }),
  user_id: t
    .bigint("user_id", { mode: "number" })
    .notNull()
    .references(() => user.id),
  ...time,
});

export const note_tag = table("note_tag", {
  note_id: t
    .bigint("note_id", { mode: "number" })
    .notNull()
    .references(() => note.id),
  tag_id: t
    .bigint("tag_id", { mode: "number" })
    .notNull()
    .references(() => tag.id),
  ...time,
});

export const user_role = relations(user, ({ one }) => ({
  role: one(role, {
    fields: [user.id],
    references: [role.id],
  }),
}));
