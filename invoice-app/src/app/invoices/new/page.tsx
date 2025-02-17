'use client';

import {SyntheticEvent, useState} from 'react';
import Form from 'next/form';

import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import SubmitBtn from '@/components/SubmitBtn';

import {createAction} from '@/app/actions';

export default function NewInvoice() {
	const [state, setState] = useState('ready');
	const handleSubmit = async (event: SyntheticEvent) => {
		if (state === 'pending') {
			event.preventDefault();
		}
		setState('pending');
	};

	return (
		<main className="flex flex-col gap-5 max-w-5xl">
			<div className="flex justify-between">
				<h1 className="text-3xl font-bold">Create Invoice</h1>
			</div>

			<Form
				action={createAction}
				onSubmit={handleSubmit}
				className="grid gap-4 max-w-xs"
			>
				<div>
					<Label htmlFor="name" className="block font-semibold text-sm mb-2">
						Billing Name
					</Label>
					<Input name="name" id="name" type="text" />
				</div>
				<div>
					<Label htmlFor="email" className="block font-semibold text-sm mb-2">
						Billing Email
					</Label>
					<Input name="email" id="email" type="text" />
				</div>
				<div>
					<Label htmlFor="value" className="block font-semibold text-sm mb-2">
						Value
					</Label>
					<Input name="value" id="value" type="text" />
				</div>
				<div>
					<Label
						htmlFor="description"
						className="block font-semibold text-sm mb-2"
					>
						Description
					</Label>
					<Textarea name="description" id="description" />
				</div>
				<SubmitBtn />
			</Form>
		</main>
	);
}
