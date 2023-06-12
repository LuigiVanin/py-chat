import { redirect } from "react-router-dom";
import { UserLocalStorage } from "../../helpers/localStorageProxy";

export const userGuard = () => {
    const storage = new UserLocalStorage();
    if (storage.getUser()?.id) {
        return redirect("/chat");
    }
    return false;
};
