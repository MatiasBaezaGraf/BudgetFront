import React from "react";

const TotalAmount = (props) => {
    let total = 0;

    const settingsHandle = () => {
        props.setOrder(5);
    };

    if (props.filteredExpenses.length > 0) {
        for (let i = 0; i < props.filteredExpenses.length; i++) {
            total += props.filteredExpenses[i].amount;
        }
    }

    return (
        <div className="flex flex-row justify-between items-center">
            <div
                className={`transform duration-500 text-left ${
                    props.isShrunk ? "px-6" : "py-7 px-7"
                }`}
            >
                <h1
                    className={`transform duration-500 font-title text-white ${
                        props.isShrunk ? "opacity-0 text-[1px] " : "text-lg"
                    }`}
                >
                    Total del mes:
                </h1>
                <h1
                    className={`transform duration-500 font-display rounded-sm w-min ${
                        props.isShrunk
                            ? "text-2xl text-green-400 bg-stone-800"
                            : "text-5xl text-white"
                    }`}
                >
                    ${props.locale.format(Math.trunc(total))}
                </h1>
            </div>
            <div
                className={`md:hidden transform duration-500 ${
                    props.isShrunk ? "p-2" : "p-4"
                }`}
            >
                <img
                    className={`transform duration-500 shadow-md rounded-full border-solid border-2 border-green-600 ${
                        props.isShrunk ? "" : ""
                    }`}
                    height={props.isShrunk ? "40" : "80"}
                    width={props.isShrunk ? "40" : "80"}
                    src={props.imageUrl}
                    alt=""
                    referrerPolicy="no-referrer"
                    onClick={settingsHandle}
                />
            </div>
        </div>
    );
};

export default TotalAmount;
