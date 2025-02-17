import {db} from '@/db';
import {Invoices, Customers} from '@/db/schema';
import {cn} from '@/lib/utils';
import {auth} from '@clerk/nextjs/server';
import {eq} from 'drizzle-orm';

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import Link from 'next/link';

export default async function Dashboard() {
	const {userId} = await auth();

	if (!userId) return;

	const results = await db
		.select()
		.from(Invoices)
		.innerJoin(Customers, eq(Invoices.customerId, Customers.id))
		.where(eq(Invoices.userId, userId));

	const invoices = results?.map(({invoices, customers}) => ({
		...invoices,
		customer: customers,
	}));

	console.log('invoices', invoices);

	return (
		<main className="flex flex-col gap-5">
			<div className="flex justify-between">
				<h1 className="text-3xl font-bold">Invoices</h1>
				<div>
					<Button className="inline-flex gap-2" variant="ghost" asChild>
						<Link href="/invoices/new">
							<Plus />
							Create Invoice
						</Link>
					</Button>
				</div>
			</div>
			<Table>
				<TableCaption>A list of your recent invoices.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px] p-4">Date</TableHead>
						<TableHead className="p-4">Customer</TableHead>
						<TableHead className="p-4">Email</TableHead>
						<TableHead className="p-4">Status</TableHead>
						<TableHead className="text-right p-4">Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{invoices.map(
						({
							createTs: date,
							id,
							status,
							value,
							customer: {name: customerName, email: customerEmail},
						}) => (
							<TableRow key={id}>
								<TableCell className="text-left font-medium p-0">
									<Link
										href={`invoices/${id}`}
										className="font-semibold block p-4"
									>
										{date.toLocaleDateString('en-GB')}
									</Link>
								</TableCell>
								<TableCell className="text-left p-0">
									<Link
										href={`invoices/${id}`}
										className="font-semibold block p-4"
									>
										{customerName}
									</Link>
								</TableCell>
								<TableCell className="text-left p-0">
									<Link href={`invoices/${id}`} className="block p-4">
										{customerEmail}
									</Link>
								</TableCell>
								<TableCell className="text-left p-0">
									<Link href={`invoices/${id}`} className="block p-4">
										<Badge
											className={cn(
												'rounded-full capitalize',
												status === 'open' && 'bg-blue-500',
												status === 'paid' && 'bg-green-600',
												status === 'void' && 'bg-zinc-700',
												status === 'uncollectible' && 'bg-red-600'
											)}
										>
											{status}
										</Badge>
									</Link>
								</TableCell>
								<TableCell className="text-right p-0">
									<Link
										href={`invoices/${id}`}
										className="font-semibold block p-4"
									>
										${(value / 100).toFixed(2)}
									</Link>
								</TableCell>
							</TableRow>
						)
					)}
				</TableBody>
			</Table>
		</main>
	);
}
