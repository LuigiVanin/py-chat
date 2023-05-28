import { Avatar } from "../Avatar";

export const Sidebar = () => {
    return (
        <aside className="min-w-[250px] max-w-[400px] w-[35%] bg-white drop-shadow-md">
            <header className="w-full h-16 flex flex-row px-3 items-center gap-3 border-b-[1px] border-gray-150">
                <Avatar src={"nada"} size="nothing" />
                <div className="">
                    <h4 className="font-semibold line-clamp-1 text-ellipsis">
                        O nome do Infeliz
                    </h4>
                    <p className="leading-4 text-sm text-gray-400">#1234</p>
                </div>

                <button className="ml-auto w-9 h-9 hover:bg-slate-50 flex items-center justify-center rounded-full">
                    <svg
                        width="9"
                        height="30"
                        viewBox="0 0 9 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="3.5" cy="4" r="3.5" fill="#e5e7eb" />
                        <circle cx="3.5" cy="16.5" r="3.5" fill="#e5e7eb" />
                        <circle cx="3.5" cy="28.5" r="3.5" fill="#e5e7eb" />
                    </svg>
                </button>
            </header>
            <div className="main-content">
                <h4>Connected</h4>
                <ul className="connected-rooms"></ul>
                <h4>Disconnected</h4>
                <ul className="disconnected-rooms"></ul>
            </div>
        </aside>
    );
};
