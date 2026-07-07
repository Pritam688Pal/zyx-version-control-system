import React from "react";
import { useRoutes } from "react-router-dom";

// Pages List
import Dashboard from "./pages/dashBoard/DashBoard";
import Profile from "./pages/user/Profile";
import AuthPage from "./pages/auth/AuthPage";

const ProjectRoutes = () => {
	return useRoutes([
		{
			path: "/",
			element: <Dashboard />,
		},
		{
			path: "/profile/:id",
			element: <Profile />,
		},
		{
			path: "/auth/:type",
			element: <AuthPage />,
		},
		{
			path: "*",
			element: <h1>404 Not Found</h1>,
		},
	]);
};

export default ProjectRoutes;
