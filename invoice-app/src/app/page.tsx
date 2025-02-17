import Link from 'next/link';
import {Button} from '@/components/ui/button';

export default async function Home() {
	return (
		<main className="flex flex-col justify-center gap-5 text-center h-full">
			<h1 className="text-5xl font-bold">Invoice App</h1>
			<div>
				<Button asChild>
					<Link href="/dashboard">Sign In</Link>
				</Button>
			</div>
		</main>
	);
}
