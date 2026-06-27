import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get("http://localhost:3000/user/userProfile", {
					withCredentials: true,
				});
				setUser(res.data);
			} catch (err) {
				if (err.response?.status === 401) {
					try {
						await axios.get("http://localhost:3000/user/refreshAccessToken", {
							withCredentials: true,
						});
						// Token refreshed, retry
						const res = await axios.get(
							"http://localhost:3000/user/userProfile",
							{
								withCredentials: true,
							},
						);
						setUser(res.data);
					} catch {
						window.location.href = "/login";
					}
				}
			}
		};
		// console.log(user);
		fetchUser();
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};
