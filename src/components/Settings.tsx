import React, { useState } from "react";
import {
    ArrowPathIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Switch } from "@headlessui/react";
import { useAuth0 } from "@auth0/auth0-react";
import WhatsApp from "../assets/WhatsApp.png";
import Instagram from "../assets/Instagram.png";
import LinkedIn from "../assets/LinkedIn.png";
import Mail from "../assets/Mail.png";
import { ReactComponent as GoogleIcon } from "../assets/GoogleIcon.svg";

const Settings = (props: {
    mail: string;
    user: string;
    resetUser: (arg0: string) => void;
}) => {
    const { logout } = useAuth0();
    const [enabled, setEnabled] = useState(false);

    const resetAccountHandler = (user: string) => {
        props.resetUser(user);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-stone-800 p-6 m-7 rounded">
                <h1 className="flex flex-col items-center md:flex-row md:items-center font-title">
                    <div className="flex flex-row bg-stone-700 p-2 ml-1 rounded">
                        <span className="text-green-100">{props.mail}</span>
                        {props.user.includes("google-oauth2") && (
                            <GoogleIcon className="w-6 h-6 ml-2" />
                        )}
                    </div>
                </h1>
                <button
                    className="transition duration-300 flex flex-row justify-between items-center bg-green-900 hover:bg-green-900/70 p-3 mt-3 md:mt-0 rounded font-title"
                    onClick={() => logout({ returnTo: window.location.origin })}
                >
                    Salir
                    <ArrowRightOnRectangleIcon className="w-6 h-6 ml-2" />
                </button>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-stone-800 p-6 m-7 rounded">
                <h1 className="font-title text-red-300">
                    Resetear la cuenta. Se borrarán todas las categorías y
                    expensas.
                </h1>
                <div className="flex flex-row justify-center items-center mt-3 md:mt-0">
                    <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        className={`${enabled ? "bg-red-500" : "bg-red-800"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                        <span className="sr-only">Use setting</span>
                        <span
                            aria-hidden="true"
                            className={`${
                                enabled ? "translate-x-9" : "translate-x-0"
                            }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-stone-800 shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                    </Switch>
                    <button
                        onClick={() => resetAccountHandler(props.user)}
                        className={`transition duration-300 flex flex-row justify-between items-center p-3 ml-5 rounded font-title bg-red-800 ${
                            enabled
                                ? " hover:bg-red-800/70"
                                : " text-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!enabled}
                    >
                        Resetear
                        <ArrowPathIcon className="w-6 h-6 ml-2" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col p-6 m-7 rounded text-left md:hidden">
                <h1 className="font-title">Matias Baeza Graf 2022</h1>
                <div className="flex flex-row items-center font-title text-sm mt-1">
                    <img
                        className="mr-2"
                        src={WhatsApp}
                        width="20"
                        height="20"
                        alt=""
                    />
                    +54 9 223 5 440 115
                </div>
                <div className="flex flex-row items-center font-title text-sm mt-1">
                    <img
                        className="mr-2"
                        src={Mail}
                        width="20"
                        height="20"
                        alt=""
                    />
                    matiasbaezagraf@gmail.com
                </div>
                <div className="flex flex-row items-center font-title text-sm mt-1">
                    <img
                        className="mr-2"
                        src={Instagram}
                        width="20"
                        height="20"
                        alt=""
                    />
                    matibaezagraf
                </div>
                <div className="flex flex-row items-center font-title text-sm mt-1">
                    <img
                        className="mr-2"
                        src={LinkedIn}
                        width="20"
                        height="20"
                        alt=""
                    />
                    Matias Baeza Graf
                </div>
            </div>
        </div>
    );
};

export default Settings;
