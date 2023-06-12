import type { User } from "../types/user";

interface LocalStorageProxy<T = string> {
    getItem(key: string): T | void;
    setItem(key: string, value: T): void;
    removeItem(key: string): void;
}

export class SerializedLocalStorage<T extends object>
    implements LocalStorageProxy<T>
{
    setItem(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key: string): T | void {
        const item = localStorage.getItem(key);
        if (!item) {
            return;
        }
        return JSON.parse(item) as T;
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}

export class UserLocalStorage extends SerializedLocalStorage<User> {
    private static localStorageKey = "user-data";

    constructor() {
        super();
    }

    getUser(): User | void {
        return this.getItem(UserLocalStorage.localStorageKey);
    }

    setUser(user: User | void) {
        if (!user) {
            return;
        }
        this.setItem(UserLocalStorage.localStorageKey, user);
    }

    removeUser(): void {
        this.removeItem(UserLocalStorage.localStorageKey);
    }
}
