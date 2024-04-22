import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./styles/main.scss";
// import { store } from "./App/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <Provider store={store}>
	// </Provider>
	<App />
);
