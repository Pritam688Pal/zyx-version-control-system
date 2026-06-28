import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../authContext";

const Navbar = () => {
	const { user } = useAuth();
	const onLogout = () => {};
	return (
		<nav className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white/90 px-6 py-3 backdrop-blur-sm">
			{/* Brand Logo & Name */}
			<Link
				to="/"
				className="group flex items-center gap-3 transition-opacity hover:opacity-90"
			>
				<div className="flex items-center gap-3">
					<img
						src={logo}
						alt="ZHYXhub Logo"
						className="h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
					/>
				</div>
			</Link>

			{/* Navigation Links */}
			<div className="flex items-center gap-6">
				{user ? (
					<>
						<Link
							to="/create"
							className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-indigo-600"
						>
							Create a Repository
						</Link>
						<Link
							to={`/profile/${user._id}`}
							className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-indigo-600"
						>
							Profile
						</Link>
						{/* New Logout Button */}
						<button
							type="button"
							// onClick={onLogout}
							className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
						>
							Logout
						</button>
					</>
				) : (
					<>
						<Link
							to="/login"
							className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-indigo-600"
						>
							Login
						</Link>
						<Link
							to="/signup"
							className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Sign Up
						</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
