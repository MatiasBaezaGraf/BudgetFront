import React from "react";
import {
    ArrowRightOnRectangleIcon,
    ClipboardDocumentListIcon,
    PlusIcon,
    ChevronRightIcon,
    ListBulletIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import WhatsApp from "../assets/WhatsApp.png";
import Instagram from "../assets/Instagram.png";
import LinkedIn from "../assets/LinkedIn.png";
import Mail from "../assets/Mail.png";
import { useAuth0 } from "@auth0/auth0-react";

const SideMenu = (props: {
    onLogoutSuccess: () => void;
    setClickStateHandler: (arg0: number) => void;
    newExpense: () => void;
    clickState: number;
    name: string;
    imageUrl: string;
}) => {
    const { logout } = useAuth0();
    const itemClasses = [
        "transition duration-200 cursor-pointer p-3 font-title flex flex-row justify-between items-center",
        "bg-green-900",
        "opacity-0",
        "opacity-1",
        "hover:bg-green-600",
    ];

    const socialButtonClasses =
        "transform duration-200 cursor-pointer p-1 m-2 rounded bg-stone-800 hover:bg-stone-700 hover:p-2 hover:m-1 shadow";

    const setClickStateHandler = (state: number) => {
        props.setClickStateHandler(state);
    };

    return (
        <div className="bg-[#0a0a0a] shadow-md w-1/3 min-h-screen hidden md:block">
            <div className="flex flex-col justify-between h-screen">
                <div className="sticky top-0 ">
                    <div className="h-[8.25rem] flex flex-row items-center p-5 bg-green-900 shadow-md z-50">
                        <img
                            className="shadow-md rounded-full border-solid border-2 border-white-400"
                            height="55"
                            width="55"
                            src={props.imageUrl}
                            alt=""
                            referrerPolicy="no-referrer"
                        />
                        <h1 className="font-title p-2 text-md">{props.name}</h1>
                    </div>

                    <ul className="text-left">
                        <li
                            className={`bg-stone-800 ${itemClasses[0]} ${itemClasses[4]}`}
                            onClick={() => {
                                setClickStateHandler(1);
                                logout({
                                    returnTo: window.location.origin,
                                });
                            }}
                        >
                            <div className="flex flex-row justify-start">
                                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                                Cerrar Sesión
                            </div>

                            <ChevronRightIcon
                                className={`transform duration-300 w-5 h-5 mr-2 ${
                                    props.clickState === 1
                                        ? "opacity-1 translate-x-2"
                                        : "opacity-0"
                                }`}
                            />
                        </li>

                        <li
                            className={`${itemClasses[0]} ${itemClasses[4]}`}
                            onClick={() => setClickStateHandler(2)}
                        >
                            <div className="flex flex-row justify-start">
                                <ListBulletIcon className="w-5 h-5 mr-2" />
                                Expensas
                            </div>

                            <ChevronRightIcon
                                className={`transform duration-300 w-5 h-5 mr-2 ${
                                    props.clickState === 2
                                        ? "opacity-1 translate-x-2"
                                        : "opacity-0"
                                }`}
                            />
                        </li>

                        <li
                            className={`${itemClasses[0]} ${itemClasses[4]}`}
                            onClick={() => setClickStateHandler(3)}
                        >
                            <div className="flex flex-row justify-start">
                                <ClipboardDocumentListIcon className="w-5 h-5 mr-2" />
                                Categorías
                            </div>

                            <ChevronRightIcon
                                className={`transform duration-300 w-5 h-5 mr-2 ${
                                    props.clickState === 3
                                        ? "opacity-1 translate-x-2"
                                        : "opacity-0"
                                }`}
                            />
                        </li>

                        <li
                            className={`${itemClasses[0]} ${itemClasses[4]}`}
                            onClick={() => {
                                setClickStateHandler(4);
                                props.newExpense();
                            }}
                        >
                            <div className="flex flex-row justify-start">
                                <PlusIcon className="w-5 h-5 mr-2" />
                                Nueva Expensa
                            </div>

                            <ChevronRightIcon
                                className={`transform duration-300 w-5 h-5 mr-2 ${
                                    props.clickState === 4
                                        ? "opacity-1 translate-x-2"
                                        : "opacity-0"
                                }`}
                            />
                        </li>

                        <li
                            className={`${itemClasses[0]} ${itemClasses[4]}`}
                            onClick={() => setClickStateHandler(5)}
                        >
                            <div className="flex flex-row justify-start">
                                <Cog6ToothIcon className="w-5 h-5 mr-2" />
                                Más
                            </div>

                            <ChevronRightIcon
                                className={`transform duration-300 w-5 h-5 mr-2 ${
                                    props.clickState === 5
                                        ? "opacity-1 translate-x-2"
                                        : "opacity-0"
                                }`}
                            />
                        </li>
                    </ul>
                </div>

                <div className="sticky bottom-0">
                    <h1 className="font-title text-sm">
                        Matias Baeza Graf | 2022
                    </h1>
                    <div className="flex flex-row justify-center">
                        <a
                            href="https://wa.me/5492235440115"
                            target="_blank"
                            className={socialButtonClasses}
                        >
                            <img className="w-6 h-6" src={WhatsApp} alt="" />
                        </a>
                        <a
                            href="https://www.instagram.com/matibaezagraf/"
                            target="_blank"
                            className={socialButtonClasses}
                        >
                            <img className="w-6 h-6" src={Instagram} alt="" />
                        </a>
                        <a
                            href="mailto:matiasbaezagraf@gmail.com"
                            target="_blank"
                            className={socialButtonClasses}
                        >
                            <img className="w-6 h-6" src={Mail} alt="" />
                        </a>
                        <a
                            href="www.linkedin.com/in/matias-baeza-graf-28781a224"
                            target="_blank"
                            className={socialButtonClasses}
                        >
                            <img className="w-6 h-6" src={LinkedIn} alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideMenu;
