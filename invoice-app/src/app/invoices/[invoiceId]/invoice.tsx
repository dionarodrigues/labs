'use client';

import {useOptimistic} from 'react';

import {Invoices, Customers} from '@/db/schema';
import {Badge} from '@/components/ui/badge';
import {cn} from '@/lib/utils';
import {ChevronDown, Ellipsis, Trash2} from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import {Button} from '@/components/ui/button';
import {AVAILABLE_STATUSES} from '@/data/invoices';

import {updateStatusAction, deleteInvoiceAction} from '@/app/actions';

interface InvoiceProps {
	invoice: typeof Invoices.$inferSelect & {
		customer: typeof Customers.$inferSelect;
	};
}

export default function Invoice({invoice}: InvoiceProps) {
	const {
		createTs: date,
		id: invoiceId,
		status,
		description,
		value,
		customer: {name: customerName, email: customerEmail},
	} = invoice;

	const [currentStatus, setCurrentStatus] = useOptimistic(
		status,
		(_, newStatus) => {
			return String(newStatus);
		}
	);

	const handleOnUpdateStatus = async (formData: FormData) => {
		const originalStatus = currentStatus;
		setCurrentStatus(formData.get('status'));

		try {
			await updateStatusAction(formData);
		} catch {
			setCurrentStatus(originalStatus);
		}
	};

	return (
		<main className="max-w-5xl">
			<div className="flex justify-between mb-8">
				<h1 className="text-3xl font-bold flex items-center gap-4">
					Invoice #{invoiceId}
					<Badge
						className={cn(
							'rounded-full capitalize',
							currentStatus === 'open' && 'bg-blue-500',
							currentStatus === 'paid' && 'bg-green-600',
							currentStatus === 'void' && 'bg-zinc-700',
							currentStatus === 'uncollectible' && 'bg-red-600'
						)}
					>
						{currentStatus}
					</Badge>
				</h1>
				<div className="flex gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="flex items-center gap-2" variant="outline">
								Change Status
								<ChevronDown className="w-4 h-auto" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{AVAILABLE_STATUSES.map(status => (
								<DropdownMenuItem key={status.id}>
									<form action={handleOnUpdateStatus}>
										<input type="hidden" name="id" value={invoiceId} />
										<input type="hidden" name="status" value={status.id} />
										<button>{status.label}</button>
									</form>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>

					<Dialog>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button className="flex items-center gap-2" variant="outline">
									<span className="sr-only">More Option</span>
									<Ellipsis className="w-4 h-auto" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>
									<DialogTrigger asChild>
										<button className="flex items-center gap-2">
											<Trash2 className="w-4 h-auto" /> Delete Invoice
										</button>
									</DialogTrigger>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader className="gap-4">
								<DialogTitle className="text-3xl">
									Delete Invoice #{invoiceId}?
								</DialogTitle>
								<DialogDescription>
									This action cannot be undone. This will permanetelly delete
									your account and remove your data from our servers.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<form
									action={deleteInvoiceAction}
									className="flex justify-center"
								>
									<input type="hidden" name="id" value={invoiceId} />
									<Button
										variant="destructive"
										className="flex items-center gap-2"
									>
										<Trash2 className="w-4 h-auto" /> Delete Invoice
									</Button>
								</form>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			<p className="text-3xl mb-3">${(value / 100).toFixed(2)}</p>
			<p className="text-lg mb-8">{description}</p>
			<h2 className="font-bold text-lg mb-4">Billing details</h2>

			<ul className="grid gap-2">
				<li className="flex gap-4">
					<strong className="block w-28 flex-shrink-0 font-medium text-sm">
						Invoice ID
					</strong>
					<span>{invoiceId}</span>
				</li>
				<li className="flex gap-4">
					<strong className="block w-28 flex-shrink-0 font-medium text-sm">
						Invoice Date
					</strong>
					<span>{date.toLocaleDateString('en-GB')}</span>
				</li>
				<li className="flex gap-4">
					<strong className="block w-28 flex-shrink-0 font-medium text-sm">
						Billing Name
					</strong>
					<span>{customerName}</span>
				</li>
				<li className="flex gap-4">
					<strong className="block w-28 flex-shrink-0 font-medium text-sm">
						Billing Email
					</strong>
					<span>{customerEmail}</span>
				</li>
			</ul>
		</main>
	);
}
