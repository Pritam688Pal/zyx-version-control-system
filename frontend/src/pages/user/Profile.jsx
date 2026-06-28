import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../compoents/Navbar";
// import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";

const Profile = () => {
	const id = useParams().id;
	const navigate = useNavigate();
	const { user, loading } = useAuth();
	// console.log(user);

	if (loading) return <div>Loading...</div>;

	if (!user) return <div>Not logged in</div>;

	return (
		<div className="min-h-screen bg-gray-50 text-gray-900">
			{/* Dynamic Navbar integration */}
			<Navbar />

			{/* Tailwind Refactored Underline Navigation */}
			<div className="border-b border-gray-200 bg-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<nav className="-mb-px flex space-x-8" aria-label="Tabs">
						<button
							type="button"
							aria-current="page"
							className="flex items-center gap-2 border-b-2 border-indigo-600 px-1 py-4 text-sm font-medium text-indigo-600"
						>
							{/* Custom SVG Overview Icon replacing BookIcon */}
							<svg
								className="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M4 6h16M4 12h16M4 18h7"
								/>
							</svg>
							Overview
						</button>

						<button
							type="button"
							onClick={() => navigate("/repo")}
							className="flex items-center gap-2 border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
						>
							{/* Custom SVG Star Icon replacing RepoIcon */}
							<svg
								className="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.252.588 1.81l-3.974 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.49 11.1c-.773-.558-.375-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z"
								/>
							</svg>
							Starred Repositories
						</button>
					</nav>
				</div>
			</div>

			{/* Main Profile Page Layout */}
			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
				{/* Left Side: User Details Section */}
				<div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center h-fit">
					{/* Default user avatar fallback */}
					<div className="h-28 w-28 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-indigo-200 text-indigo-600 font-bold text-3xl shadow-inner">
						{user.username.charAt(0).toUpperCase()}
					</div>

					<div className="mt-4">
						<h3 className="text-xl font-bold text-gray-900">{user.username}</h3>
					</div>

					<button
						type="button"
						className="mt-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
					>
						Follow
					</button>

					<div className="mt-6 flex gap-4 text-sm text-gray-500 border-t border-gray-100 pt-4 w-full justify-center">
						<p>
							<span className="font-semibold text-gray-900">10</span> Followers
						</p>
						<p>•</p>
						<p>
							<span className="font-semibold text-gray-900">3</span> Following
						</p>
					</div>
				</div>

				{/* Right Side: Contribution Matrix Section */}
				<div className="lg:col-span-3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Contribution History
					</h3>
					{/* <HeatMapProfile /> */}
				</div>
			</div>
		</div>
	);
};

export default Profile;
