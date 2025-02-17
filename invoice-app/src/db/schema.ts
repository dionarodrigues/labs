import {
	pgTable,
	pgEnum,
	serial,
	timestamp,
	integer,
	text,
} from 'drizzle-orm/pg-core';

import {AVAILABLE_STATUSES} from '@/data/invoices';

export type Status = (typeof AVAILABLE_STATUSES)[number]['id'];

const statuses = AVAILABLE_STATUSES.map(({id}) => id) as Array<Status>;

export const statusEnum = pgEnum(
	'status',
	statuses as [Status, ...Array<Status>]
);

export const Invoices = pgTable('invoices', {
	id: serial().primaryKey().notNull(),
	createTs: timestamp().defaultNow().notNull(),
	status: statusEnum().notNull(),
	value: integer().notNull(),
	userId: text().notNull(),
	customerId: integer()
		.notNull()
		.references(() => Customers.id),
	description: text().notNull(),
});

export const Customers = pgTable('customers', {
	id: serial().primaryKey().notNull(),
	createTs: timestamp().defaultNow().notNull(),
	userId: text().notNull(),
	name: text().notNull(),
	email: text().notNull(),
});
