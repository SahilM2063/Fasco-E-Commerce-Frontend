/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store/store.js";
import { Provider } from "react-redux";
import ContextProvider from "./context/ContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </Provider>
);
