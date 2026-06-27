import { pgTable, serial, timestamp, varchar, text, integer, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"


export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

// 个人基本情况表
export const personalProfile = pgTable("personal_profile", {
	id: serial().primaryKey(),
	name: varchar("name", { length: 100 }).notNull(),
	title: varchar("title", { length: 100 }).notNull(),
	avatar_url: varchar("avatar_url", { length: 500 }),
	email: varchar("email", { length: 100 }),
	phone: varchar("phone", { length: 50 }),
	education: text("education"),
	research_interests: text("research_interests"),
	created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { withTimezone: true }),
});

// 科研成果表
export const researchResults = pgTable(
	"research_results",
	{
		id: serial().primaryKey(),
		profile_id: integer("profile_id").notNull().references(() => personalProfile.id, { onDelete: "cascade" }),
		type: varchar("type", { length: 50 }).notNull(), // 论文/项目/专利等
		title: varchar("title", { length: 255 }).notNull(),
		description: text("description"),
		authors: text("authors"),
		journal: varchar("journal", { length: 200 }),
		year: varchar("year", { length: 20 }).notNull(),
		link: varchar("link", { length: 500 }),
		arxiv_id: varchar("arxiv_id", { length: 50 }), // arXiv号
		order_index: integer("order_index").default(0), // 手动排序索引
		created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
		updated_at: timestamp("updated_at", { withTimezone: true }),
	},
	(table) => [
		index("research_results_profile_id_idx").on(table.profile_id),
		index("research_results_type_idx").on(table.type),
		index("research_results_year_idx").on(table.year),
		index("research_results_order_index_idx").on(table.order_index),
	]
);

// 标签配置表（存储自定义标签名称）
export const labelConfig = pgTable(
	"label_config",
	{
		id: serial().primaryKey(),
		key: varchar("key", { length: 100 }).notNull().unique(), // 标签key，如 "title_label", "email_label"
		value: varchar("value", { length: 100 }).notNull(), // 标签显示名称，如 "单位", "联系方式"
		created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
		updated_at: timestamp("updated_at", { withTimezone: true }),
	},
	(table) => [
		index("label_config_key_idx").on(table.key),
	]
);
