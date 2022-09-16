import React, { Fragment } from "react";
import { Tab } from "@headlessui/react";
import {
    Cog6ToothIcon,
    ClipboardDocumentListIcon,
    ListBulletIcon,
} from "@heroicons/react/24/solid";

const TabBar = (props) => {
    const settingsHandler = () => {
        props.setOrder(5);
    };
    const categoryHandler = () => {
        props.setOrder(3);
    };
    const dateHandler = () => {
        props.setOrder(2);
    };

    return (
        <div className="transform duration-200 sticky md:hidden">
            <Tab.Group>
                <Tab.List
                    className={`flex flex-row justify-around md:justify-center text-white`}
                >
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                onClick={categoryHandler}
                                className={
                                    selected
                                        ? `transform duration-100 px-8 py-2 text-green-400 ${
                                              props.isShrunk
                                                  ? ""
                                                  : "border-b-4 border-green-400"
                                          }`
                                        : "transform duration-100 px-8 py-2 text-white hover:border-b-4 border-white/30"
                                }
                            >
                                <ClipboardDocumentListIcon className="w-5 h-5" />
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                onClick={dateHandler}
                                className={
                                    selected
                                        ? `transform duration-100 px-8 py-2 text-green-400 ${
                                              props.isShrunk
                                                  ? ""
                                                  : "border-b-4 border-green-400"
                                          }`
                                        : "transform duration-100 px-8 py-2 text-white hover:border-b-4 border-white/30"
                                }
                            >
                                <ListBulletIcon className="w-5 h-5" />
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                onClick={settingsHandler}
                                className={
                                    selected
                                        ? `transform duration-100 px-8 py-2 text-green-400 ${
                                              props.isShrunk
                                                  ? ""
                                                  : "border-b-4 border-green-400"
                                          }`
                                        : "transform duration-100 px-8 py-2 text-white hover:border-b-4 border-white/30"
                                }
                            >
                                <Cog6ToothIcon className="w-5 h-5" />
                            </button>
                        )}
                    </Tab>
                </Tab.List>
            </Tab.Group>
        </div>
    );
};

export default TabBar;
