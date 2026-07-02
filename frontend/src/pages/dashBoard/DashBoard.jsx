import React, { useState, useEffect } from "react";
import Navbar from "../../compoents/Navbar";

function Dashboard() {
	const [repositories, setRepositories] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [suggestedRepositories, setSuggestedRepositories] = useState([]);
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		const fetchRepositories = async () => {
			console.log("host:", import.meta.env);
			try {
				const response = await fetch(
					`http://${import.meta.env.VITE_API_URL}/repo`,
					{
						credentials: "include",
					},
				);
				if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
				const data = await response.json();
				setRepositories(data.repo);
			} catch (err) {
				console.error("Error while fetching repositories: ", err);
			}
		};

		const fetchSuggestedRepositories = async () => {
			try {
				const response = await fetch(
					`http://${import.meta.env.VITE_API_URL}/repo/allrepo`,
					{
						credentials: "include",
					},
				);
				if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
				const data = await response.json();
				setSuggestedRepositories(data.repos);
			} catch (err) {
				console.error("Error while fetching suggested repositories: ", err);
			}
		};

		fetchRepositories();
		fetchSuggestedRepositories();
	}, []);

	useEffect(() => {
		if (searchQuery === "") {
			setSearchResults(repositories);
		} else {
			const filteredRepo = repositories.filter((repo) =>
				repo.name.toLowerCase().includes(searchQuery.toLowerCase()),
			);
			setSearchResults(filteredRepo);
		}
	}, [searchQuery, repositories]);
	return (
		<>
			<Navbar />
			<section
				id="dashboard"
				className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 lg:grid-cols-4"
			>
				{/* Left Sidebar: Suggested Repositories */}
				<aside className="lg:col-span-1 space-y-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
					<h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">
						Suggested Repositories
					</h3>
					<div className="space-y-3">
						{suggestedRepositories.length > 0 ? (
							suggestedRepositories.map((repo) => (
								<div
									key={repo._id}
									className="p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
								>
									<h4 className="font-semibold text-sm text-indigo-600 hover:underline cursor-pointer">
										{repo.name}
									</h4>
									<p className="text-xs text-gray-500 line-clamp-2 mt-1">
										{repo.description || "No description provided."}
									</p>
								</div>
							))
						) : (
							<p className="text-sm text-gray-400 italic">
								No suggestions available.
							</p>
						)}
					</div>
				</aside>

				{/* Main Content Area: Search & Main Repositories */}
				<main className="lg:col-span-2 space-y-6">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<h2 className="text-2xl font-bold tracking-tight text-gray-900">
							Your Repositories
						</h2>

						{/* Search Input Container */}
						<div id="search" className="w-full sm:max-w-xs">
							<input
								type="text"
								value={searchQuery}
								placeholder="Search repositories..."
								onChange={(e) => setSearchQuery(e.target.value)}
								className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
							/>
						</div>
					</div>

					{/* Repository Search Results */}
					<div className="space-y-4">
						{searchResults.length > 0 ? (
							searchResults.map((repo) => (
								<div
									key={repo._id}
									className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
								>
									<h4 className="text-lg font-semibold text-gray-900 hover:text-indigo-600 cursor-pointer transition-colors">
										{repo.name}
									</h4>
									<p className="text-sm text-gray-600 mt-1">
										{repo.description || "No description provided."}
									</p>
								</div>
							))
						) : (
							<div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
								<p className="text-sm text-gray-500">
									No repositories match your criteria.
								</p>
							</div>
						)}
					</div>
				</main>

				{/* Right Sidebar: Upcoming Events */}
				<aside className="lg:col-span-1 space-y-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
					<h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">
						Upcoming Events
					</h3>
					<ul className="space-y-3 divide-y divide-gray-100">
						<li className="pt-2 first:pt-0">
							<p className="text-sm font-medium text-gray-800 hover:text-indigo-600 cursor-pointer">
								Tech Conference
							</p>
							<span className="text-xs text-gray-400">Dec 15</span>
						</li>
						<li className="pt-3">
							<p className="text-sm font-medium text-gray-800 hover:text-indigo-600 cursor-pointer">
								Developer Meetup
							</p>
							<span className="text-xs text-gray-400">Dec 25</span>
						</li>
						<li className="pt-3">
							<p className="text-sm font-medium text-gray-800 hover:text-indigo-600 cursor-pointer">
								React Summit
							</p>
							<span className="text-xs text-gray-400">Jan 5</span>
						</li>
					</ul>
				</aside>
			</section>
		</>
	);
}

export default Dashboard;
