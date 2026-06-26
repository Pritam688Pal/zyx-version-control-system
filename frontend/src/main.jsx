import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { cookiesProvider } from "react-cookie";
import { AuthProvider } from "./authContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<cookiesProvider>
				<App />
			</cookiesProvider>
		</AuthProvider>
	</StrictMode>,
);
