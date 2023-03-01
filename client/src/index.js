import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToggleModeContextProvider } from "./context/toggle-mode";
import { AccountContextProvider } from "./context/account";
import store from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ToggleModeContextProvider>
      <AccountContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AccountContextProvider>
    </ToggleModeContextProvider>
  </Provider>
);
