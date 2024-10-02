import React from "react";
import ReactDOM from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AeKLtF6av2ycflZw7V_9hI6yV9sP7K0XQN6gETt7avFKD7zVNgBA3QVPd7Vw9i5PKqmKyZdSqKJWJX_o",
        }}
      >
        <Provider store={store}>
          <ToastContainer
            theme="dark"
            position="top-right"
            autoClose={3000}
            closeOnClick
            pauseOnHover={false}
          />

          <App />
        </Provider>
      </PayPalScriptProvider>
    </BrowserRouter>
  </React.StrictMode>
);
