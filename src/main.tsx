import React from "react";
import "./index.css";
import App from "./App.tsx";
import './i18n';

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
