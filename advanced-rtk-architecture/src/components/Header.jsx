import {NavLink} from 'react-router-dom';

const navLinks = [
	{path: '/airlines/europe', label: 'Europe'},
	{path: '/airlines/america', label: 'America'},
	{path: '/airlines/asia', label: 'Asia'},
];

export default function Header() {
	return (
		<header className="text-white py-10 px-20">
			<h1 className="text-5xl font-semibold">World Airports</h1>
			<nav className="mt-5">
				<ul className="flex space-x-4">
					{navLinks.map(({path, label}) => (
						<li key={path} className="font-medium">
							<NavLink
								to={path}
								className={({isActive}) =>
									isActive ? 'underline text-white' : 'text-gray-300'
								}
							>
								{label}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
