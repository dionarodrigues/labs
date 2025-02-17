import {SignInButton, SignedIn, SignedOut, UserButton} from '@clerk/nextjs';

import Container from '@/components/Container';
import Link from 'next/link';

const Header = () => {
	return (
		<header className="mt-8 mb-12">
			<Container>
				<div className="flex justify-between items-center gap-4">
					<Link href="/dashboard">
						<p className="font-bold">Invoice</p>
					</Link>
					<div>
						<SignedOut>
							<SignInButton />
						</SignedOut>
						<SignedIn>
							<UserButton />
						</SignedIn>
					</div>
				</div>
			</Container>
		</header>
	);
};

export default Header;
