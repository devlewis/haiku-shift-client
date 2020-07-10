import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "../src/components/App/App";
import * as serviceWorker from "./serviceWorker";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById("root")
);

serviceWorker.unregister();
