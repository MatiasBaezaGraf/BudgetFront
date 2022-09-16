import React from "react";
import ledger from "../assets/ledger.png";
import { useAuth0 } from "@auth0/auth0-react";
import ReactLoading from "react-loading";

const Login = (propsWithType: { onSuccess: (user: any) => void }) => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    const { loginWithRedirect } = useAuth0();

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center m-12">
                <ReactLoading type="spin" height={70} width={70} />
            </div>
        );
    }

    if (isAuthenticated) {
        propsWithType.onSuccess(user);
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center ">
            <div className="flex flex-col items-center bg-stone-700  shadow-md rounded-md">
                <img
                    className="mt-5"
                    src={ledger}
                    width={"80"}
                    height="50"
                    alt=""
                />
                <div className="flex flex-col p-7">
                    <h1 className="font-title text-5xl text-white">
                        Bienvenido
                    </h1>
                    <p className="font-title text-sm text-white">
                        Ingrese para continuar
                    </p>
                </div>

                <button
                    className="flex flex-row bg-green-500 rounded p-4 mb-5 font-title text-white shadow-md hover:bg-green-600"
                    onClick={() => loginWithRedirect()}
                >
                    Ingresar
                </button>
            </div>
            <div className="opacity-0 h-1/3">...</div>
        </div>
    );
};

export default Login;
