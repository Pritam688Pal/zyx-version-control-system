import React from "react";
import { useRoutes } from "react-router-dom";

// Pages List
import Dashboard from "./pages/dashBoard/DashBoard";
import Profile from "./pages/user/Profile";
import Login from "./pages/auth/LogIn";
import Signup from "./pages/auth/SignUp";

const ProjectRoutes = () => {
	return useRoutes([
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
};

export default ProjectRoutes;
