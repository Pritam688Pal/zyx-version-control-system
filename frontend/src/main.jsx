import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./authContext.jsx";
import ProjectRoutes from "./route.jsx";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Router>
			<AuthProvider>
				<ProjectRoutes />
			</AuthProvider>
		</Router>
	</StrictMode>,
);
