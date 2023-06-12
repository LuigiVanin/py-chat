import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster, ToasterProps } from "react-hot-toast";
import "./styles/index.css";

const toastConfig: ToasterProps = {
    position: "top-right",
    toastOptions: {
        duration: 3000,
        className: "border-2 border-solid border-violet-500 rounded-md",
        iconTheme: {
            primary: "rgb(139, 92, 246)",
            secondary: "white",
        },
    },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
            <Toaster {...toastConfig} />
        </Provider>
    </React.StrictMode>
);
