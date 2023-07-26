// import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store  from "./redux/store";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Provider store={store}>
        <App />
    </Provider>
  </HashRouter>
);
