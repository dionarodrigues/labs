import {Routes, Route, Link} from 'react-router-dom';

import Header from '@components/Header';
import Airlines from '@pages/Airlines';

export default function App() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1">
				<Routes>
					{/* Default route that redirects to Europe */}
					<Route path="/" element={<Link to="/airlines/europe" />} />
					{/* Dynamic route for different regions */}
					<Route path="/airlines/:region" element={<Airlines />} />
				</Routes>
			</main>
		</div>
	);
}
