import "./styles/app.css";
import "./styles/tailwind.css";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { fetchUser } from "./store/userSlice";
import { useAppDispatch } from "./hooks";

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log("Dispathcing fetchUser");
        dispatch(fetchUser());
    });

    return <RouterProvider router={router} />;
}

export default App;
