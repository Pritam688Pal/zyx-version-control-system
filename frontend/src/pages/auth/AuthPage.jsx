import React, { use, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../authContext";
import logo from "../../assets/logo.png";

function AuthPage() {
	const [mode, setMode] = useState(useParams().type);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { setUser } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		setMode(useParams().type);
	}, [location.pathname]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			setLoading(true);
			const endpoint = mode === "login" ? "/user/logIn" : "/user/signUp";
			const payload =
				mode === "login" ? { email, password } : { email, password, username };
			const res = await axios.post(
				`${import.meta.env.VITE_API_URL}${endpoint}`,
				payload,
				{ withCredentials: true },
			);

			setUser(res.data.user);
			navigate("/");
		} catch (err) {
			console.error(err);
			setError(mode === "login" ? "Login Failed!" : "Signup Failed!");
		} finally {
			setLoading(false);
		}
	};

	const switchMode = (nextMode) => {
		if (nextMode !== mode) {
			setMode(nextMode);
			navigate(nextMode === "signup" ? "/signup" : "/login");
		}
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8">
				<div className="flex justify-center">
					<img className="h-12 w-auto" src={logo} alt="Logo" />
				</div>

				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900">
						{mode === "login" ? "Log In" : "Sign Up"}
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						Access your workspace and collaborate with your team.
					</p>
				</div>

				<div className="bg-white p-8 shadow sm:rounded-lg border border-gray-200 space-y-6">
					<div className="flex rounded-lg border border-gray-200 p-1">
						<button
							type="button"
							className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
								mode === "login"
									? "bg-indigo-600 text-white shadow"
									: "text-gray-600 hover:text-gray-900"
							}`}
							onClick={() => switchMode("login")}
						>
							Login
						</button>
						<button
							type="button"
							className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
								mode === "signup"
									? "bg-indigo-600 text-white shadow"
									: "text-gray-600 hover:text-gray-900"
							}`}
							onClick={() => switchMode("signup")}
						>
							Sign Up
						</button>
					</div>

					<form className="space-y-6" onSubmit={handleSubmit}>
						{mode === "signup" && (
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
						)}

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

						{error && <p className="text-sm text-red-600">{error}</p>}

						<div>
							<button
								type="submit"
								disabled={loading}
								className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
							>
								{loading ? "Loading..." : mode === "login" ? "Login" : "Signup"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default AuthPage;
