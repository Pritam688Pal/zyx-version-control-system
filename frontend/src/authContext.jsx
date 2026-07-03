import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true);
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_API_URL}/user/userProfile`,
					{
						withCredentials: true,
					},
				);
				setUser(res.data);
			} catch (err) {
				if (err.response?.status === 401) {
					try {
						await axios.get(
							`${import.meta.env.VITE_API_URL}/user/refreshAccessToken`,
							{
								withCredentials: true,
							},
						);
						// Token refreshed, retry
						const res = await axios.get(
							`${import.meta.env.VITE_API_URL}/user/userProfile`,
							{
								withCredentials: true,
							},
						);
						setUser(res.data);
					} catch {
						if (location.pathname !== "/login") {
							navigate("/login");
						}
					}
				} else {
					setUser(null);
					console.error("Auth check failed:", err.message);
				}
			} finally {
				setLoading(false);
			}
		};
		// console.log(user);
		fetchUser();
	}, [location]);

	return (
		<AuthContext.Provider value={{ user, setUser, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
