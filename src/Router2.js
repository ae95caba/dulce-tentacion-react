import React from "react";
import { BrowserRouter } from "react-router-dom";

import { App } from "./components/App";

export function Router2() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
