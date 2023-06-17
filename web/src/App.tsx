import "./styles/app.css";
import "./styles/tailwind.css";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { fetchUser } from "./store/userSlice";
import { useAppDispatch } from "./hooks";
import { UserLocalStorage } from "./helpers/localStorageProxy";

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUser());
        const storage = new UserLocalStorage();
        if (!storage.getUser()) {
            router.navigate("/");
        }
    }, []);

    return <RouterProvider router={router} />;
}

export default App;
