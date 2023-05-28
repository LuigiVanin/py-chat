export const SignIn = () => {
    return (
        <div>
            <h1 className="text-red-200">Sign In</h1>
            <main>
                <div className="border-1 border-solid border-black">
                    <input
                        type="text"
                        placeholder="Escreva o nome do seu usuários"
                        className="border-solid border-[1px]  border-red-100 bg-slate-50"
                    />
                </div>
            </main>
        </div>
    );
};
