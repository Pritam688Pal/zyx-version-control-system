import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../authContext";
import axios from "axios";
import logo from "../../assets/logo.png"; // Adjust path as necessary

function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setUser } = useAuth();
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			const res = await axios.post(
				`http://${import.meta.env.API_URL}:3000/user/logIn`,
				{
					email,
					password,
				},
				{ withCredentials: true },
			);

			setUser(res.data.user);
			setLoading(false);

			window.location.href = "/";
		} catch (err) {
			console.error(err);
			alert("Login Failed!");
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8">
				{/* Logo Container */}
				<div className="flex justify-center">
					<img className="h-12 w-auto" src={logo} alt="Logo" />
				</div>

				{/* Heading Area */}
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900">
						Log In
					</h2>
				</div>

				{/* Main Form Box */}
				<div className="bg-white p-8 shadow sm:rounded-lg border border-gray-200 space-y-6">
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
							onClick={handleLogin}
							className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
						>
							{loading ? "Loading..." : "Login"}
						</button>
					</div>
				</div>

				{/* Footer Link Box */}
				<div className="text-center text-sm text-gray-600">
					<p>
						New to GitHub?{" "}
						<Link
							to="/signup"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							Create an account
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default SignIn;
