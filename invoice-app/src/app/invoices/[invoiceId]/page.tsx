import {notFound} from 'next/navigation';

import {eq, and} from 'drizzle-orm';
import {auth} from '@clerk/nextjs/server';
import {db} from '@/db';
import {Invoices, Customers} from '@/db/schema';

import Invoice from './invoice';

export default async function InvoicePage({
	params,
}: {
	params: {invoiceId: string};
}) {
	const {userId} = await auth();

	if (!userId) return;

	const params2 = await params;
	const invoiceId = parseInt(params2.invoiceId);

	if (isNaN(invoiceId)) {
		throw new Error('Invalid Invoice ID');
	}

	const [result] = await db
		.select()
		.from(Invoices)
		.innerJoin(Customers, eq(Invoices.customerId, Customers.id))
		.where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)))
		.limit(1);

	if (!result) {
		notFound();
	}

	const invoices = {
		...result.invoices,
		customer: result.customers,
	};

	return <Invoice invoice={invoices} />;
}
