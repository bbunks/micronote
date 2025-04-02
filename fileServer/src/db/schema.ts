import { bigint, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("files", {
  id: serial().primaryKey().notNull(),
  name: varchar({ length: 36 }).notNull().unique(),
  owner: varchar({ length: 255 }).notNull(),
  size: bigint({ unsigned: true, mode: "bigint" }),
});
