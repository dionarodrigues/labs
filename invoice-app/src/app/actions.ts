'use server';

import {redirect} from 'next/navigation';
import {auth} from '@clerk/nextjs/server';
import {revalidatePath} from 'next/cache';

import {eq, and} from 'drizzle-orm';
import {db} from '@/db';
import {Invoices, Customers, Status} from '@/db/schema';

export async function createAction(formData: FormData) {
	const {userId} = await auth();

	if (!userId) {
		return;
	}

	const value = Math.floor(parseFloat(String(formData.get('value'))) * 100);
	const description = formData.get('description') as string;
	const name = formData.get('name') as string;
	const email = formData.get('email') as string;

	const [customer] = await db
		.insert(Customers)
		.values({
			name,
			email,
			userId,
		})
		.returning({
			id: Customers.id,
		});

	const results = await db
		.insert(Invoices)
		.values({
			value,
			description,
			status: 'open',
			userId,
			customerId: customer.id,
		})
		.returning({
			id: Invoices.id,
		});

	redirect(`/invoices/${results[0].id}`);
}

export async function updateStatusAction(formData: FormData) {
	const {userId} = await auth();

	if (!userId) {
		return;
	}

	const id = formData.get('id') as string;
	const status = formData.get('status') as Status;

	await db
		.update(Invoices)
		.set({status})
		.where(and(eq(Invoices.id, parseInt(id)), eq(Invoices.userId, userId)));

	revalidatePath(`/invoices/${id}`, 'page');
}

export async function deleteInvoiceAction(formData: FormData) {
	const {userId} = await auth();

	if (!userId) {
		return;
	}

	const id = formData.get('id') as string;

	await db
		.delete(Invoices)
		.where(and(eq(Invoices.id, parseInt(id)), eq(Invoices.userId, userId)));

	redirect(`/dashboard`);
}
