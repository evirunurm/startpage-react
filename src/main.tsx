import React from "react";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "./service/store";

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
	<Provider>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>
);
