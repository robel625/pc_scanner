import React from "react";
import ReactDOM from "react-dom";
import './styles/global.css';

import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import DataProvider from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
