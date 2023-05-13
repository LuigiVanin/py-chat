import "./styles/App.css";
import "./styles/tailwind.css";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";

function App() {
    return <RouterProvider router={router} />;
}

export default App;
