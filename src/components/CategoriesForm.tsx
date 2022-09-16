import React, { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import ReactLoading from "react-loading";

const CategoriesForm = (props: { saveCategoryData: (string) => void }) => {
    const [enteredName, setEnteredName] = useState("");
    const [loading, setLoading] = useState(false);

    const nameHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        props.saveCategoryData(enteredName);
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input
                    className="border-none inline-flex w-full justify-center rounded-md bg-black bg-opacity-40 px-4 py-2 mb-4 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    type="text"
                    value={enteredName}
                    onChange={nameHandler}
                    placeholder="Nombre..."
                    required
                />
                <button
                    className={`w-full flex flex-row items-center justify-center  mt-4 rounded-md shadow-md px-4 py-2 ${
                        loading
                            ? "bg-green-400 text-gray-500"
                            : "text-black bg-green-500 hover:bg-green-600"
                    }`}
                    disabled={loading && true}
                    type="submit"
                >
                    {!loading && (
                        <div className="flex flex-row justify-around items-center">
                            <h1>Crear</h1>
                            <CheckCircleIcon className="w-5 h-5 ml-1" />
                        </div>
                    )}
                    {loading && (
                        <ReactLoading type="spin" height={20} width={20} />
                    )}
                </button>
            </form>
        </div>
    );
};

export default CategoriesForm;
