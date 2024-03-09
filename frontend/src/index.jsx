import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import axios from "axios";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Pusher from "pusher-js";
import store from "./redux/rtk/app/store";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
const root = ReactDOM.createRoot(document.getElementById("root"));
const accessToken = localStorage.getItem("access-token");

window.Pusher = Pusher;

//Setting AXIOS and token
axios.defaults.baseURL = import.meta.env.VITE_APP_API;

axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

const configuration = {
  onUpdate: (registration) => {
    if (registration && registration.waiting) {
      if (
        window.confirm("New version available!  refresh to update your app?")
      ) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
        window.location.reload();
      }
    }
  },
};
serviceWorkerRegistration.register(configuration);
