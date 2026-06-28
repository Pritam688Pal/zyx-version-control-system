import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";

// Pages List
import Dashboard from "./pages/dashBoard/DashBoard";
import Profile from "./pages/user/Profile";
import Login from "./pages/auth/LogIn";
import Signup from "./pages/auth/SignUp";

// Auth Context
import { useAuth } from "./authContext";

const ProjectRoutes = () => {
	const { user, setUser } = useAuth();

	let element = useRoutes([
		{
			path: "/",
			element: <Dashboard />,
		},
		{
			path: "/login",
			element: <Login />,
		},
		{
			path: "/signup",
			element: <Signup />,
		},
		{
			path: "/profile/:id",
			element: <Profile />,
		},
	]);

	return element;
};

export default ProjectRoutes;
