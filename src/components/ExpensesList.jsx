import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import SwipeToDelete from "react-swipe-to-delete-ios";

const ExpensesList = (props) => {
    const expenseDeleteHandler = (id) => {
        props.deleteHandler(id);
    };

    return (
        <div className="my-3">
            {props.filteredExpenses.length === 0 ? (
                <div className="bg-stone-800 p-6 mx-7 rounded">
                    <h1>No existen expensas.</h1>
                </div>
            ) : (
                <ul>
                    <div className="rounded-md overflow-hidden bg-stone-700 mx-7 shadow-md">
                        {props.filteredExpenses.map((expense) => (
                            <div
                                key={expense.id}
                                className="border-l-4 border-l-stone-700/70"
                            >
                                <SwipeToDelete
                                    height="64"
                                    onDelete={() =>
                                        expenseDeleteHandler(expense.id)
                                    }
                                    deleteColor="rgba(53, 53, 53, 1.00)"
                                    deleteComponent={
                                        <TrashIcon className="h-5 ml-5 text-red-700 hover:text-red-600" />
                                    }
                                >
                                    <li className="bg-stone-800 text-left">
                                        <div className="flex flex-row justify-between">
                                            <div className="flex-1 p-2">
                                                <h1 className="text-lg text-white">
                                                    {expense.name}
                                                </h1>
                                                <h2 className="text-sm text-gray-400">
                                                    {
                                                        props.categories.find(
                                                            (x) =>
                                                                x.id ===
                                                                expense.category_id
                                                        ).name
                                                    }
                                                </h2>
                                            </div>
                                            <div className="flex flex-row text-center font-display justify-center items-center w-28 p-2 bg-stone-700">
                                                <h1 className="text-lg text-white">
                                                    $
                                                    {props.locale.format(
                                                        expense.amount
                                                    )}
                                                </h1>
                                            </div>
                                        </div>
                                    </li>
                                </SwipeToDelete>
                            </div>
                        ))}
                    </div>
                </ul>
            )}
        </div>
    );
};

export default ExpensesList;
