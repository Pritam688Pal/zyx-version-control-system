import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	Children,
} from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};
