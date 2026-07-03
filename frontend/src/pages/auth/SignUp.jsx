import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../authContext";
// import logo from "./logo.svg";

function SignUp() {
	// 1. Fixed the missing state variables
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const { user, setUser } = useAuth();

	const handleSignup = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			const res = await axios.post(
				`https://${import.meta.env.VITE_API_URL}/user/signUp`,
				{ email, password, username },
				{ withCredentials: true },
			);

			setUser(res.data.user);
			console.log(res.data.user);

			setLoading(false);
			// console.log(user);

			// window.location.href = "/";
		} catch (err) {
			console.error(err);
			alert("Signup Failed!");
			setLoading(false);
		}
		// console.log(user);
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8">
				{/* Logo Container */}
				<div className="flex justify-center">
					{/* <img className="h-12 w-auto" src={logo} alt="Logo" /> */}
				</div>

				{/* Heading Area */}
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900">
						Sign Up
					</h2>
				</div>

				{/* Main Form Box */}
				<div className="bg-white p-8 shadow sm:rounded-lg border border-gray-200 space-y-6">
					{/* Username Input */}
					<div>
						<label
							htmlFor="Username"
							className="block text-sm font-medium text-gray-700"
						>
							Username
						</label>
						<div className="mt-1">
							<input
								autoComplete="off"
								name="Username"
								id="Username"
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
							/>
						</div>
					</div>

					{/* Email Input */}
					<div>
						<label
							htmlFor="Email"
							className="block text-sm font-medium text-gray-700"
						>
							Email address
						</label>
						<div className="mt-1">
							<input
								autoComplete="off"
								name="Email"
								id="Email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
							/>
						</div>
					</div>

					{/* Password Input */}
					<div>
						<label
							htmlFor="Password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<div className="mt-1">
							<input
								autoComplete="off"
								name="Password"
								id="Password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
							/>
						</div>
					</div>

					{/* Submit Button */}
					<div>
						<button
							type="button"
							disabled={loading}
							onClick={handleSignup}
							className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transitions-all duration-200"
						>
							{loading ? "Loading..." : "Signup"}
						</button>
					</div>
				</div>

				{/* Footer Link Box */}
				<div className="text-center text-sm text-gray-600">
					<p>
						Already have an account?{" "}
						<Link
							to="/auth"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
