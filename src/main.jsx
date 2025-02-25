import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import store from "./Redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="81068405910-jeuusvfouafo6kl41juivch7k8eccqc9.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
      <Toaster />
    </BrowserRouter>
  </Provider>
);
