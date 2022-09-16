import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import {
    ChevronDownIcon,
    TrashIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";
import SwipeToDelete from "react-swipe-to-delete-ios";

const CategoriesList = (props) => {
    const categoriesExpenses = props.categories.map((c) => [
        c,
        props.expenses.filter((e) => e.category_id === c.id),
        props.expenses
            .filter((e) => e.category_id === c.id)
            .map((e) => e.amount)
            .reduce((partialSum, a) => partialSum + a, 0),
    ]);

    const expenseDeleteHandler = (id) => {
        props.deleteExpenseHandler(id);
    };

    const newCategoryHandler = () => {
        props.newCategoryHandler();
    };

    const categoryDeleteHandler = (id) => {
        props.deleteCategoryHandler(id);
    };

    return (
        <div className="my-5 text-center">
            <div className="flex flex-row justify-between items-center p-7">
                <h1 className="font-title text-white text-2xl">Categorías</h1>
                <PlusIcon
                    className="transform duration-300 w-7 h-7 cursor-pointer text-green-400 hover:text-green-500"
                    onClick={newCategoryHandler}
                />
            </div>
            {props.categories.length === 0 ? (
                <div className="bg-stone-800 p-6 mx-7 rounded">
                    <h1>No existen categorias. Carga una para empezar.</h1>
                </div>
            ) : (
                <ul>
                    {categoriesExpenses.map((categoryExpense) => (
                        <li
                            key={categoryExpense[0].id}
                            className="w-full px-5 py-2"
                        >
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button
                                            className={`w-full flex flex-row justify-between items-center p-4 rounded text-white bg-stone-800 border-l-4 border-l-green-900 hover:bg-stone-700/50 ${
                                                open ? "rounded-b-none" : ""
                                            }`}
                                        >
                                            <span className="font-title text-xl">
                                                {categoryExpense[0].name}
                                            </span>
                                            <div className="flex flex-row">
                                                <span className="font-display text-xl px-4">
                                                    $
                                                    {props.locale.format(
                                                        categoryExpense[2]
                                                    )}
                                                </span>
                                                <ChevronDownIcon
                                                    className={`w-6 h-6 ${
                                                        open
                                                            ? "rotate-180 transform"
                                                            : ""
                                                    }`}
                                                />
                                            </div>
                                        </Disclosure.Button>
                                        <Transition
                                            enter="transform transition duration-200"
                                            enterFrom="-translate-y-3 opacity-0"
                                            enterTo="translate-y-0 opacity-100"
                                            leave="transform transition duration-200"
                                            leaveFrom="translate-y-0 opacity-100"
                                            leaveTo="-translate-y-3 opacity-0"
                                        >
                                            <Disclosure.Panel
                                                className={`rounded-b bg-stone-700 border-l-4  ${
                                                    categoryExpense[1]
                                                        .length === 0
                                                        ? "border-black"
                                                        : "border-green-400"
                                                }`}
                                            >
                                                {categoryExpense[1].length ===
                                                0 ? (
                                                    <div className="flex flex-row justify-between text-white p-4">
                                                        <h1>No hay expensas</h1>
                                                        <TrashIcon
                                                            className="w-6 h-6 cursor-pointer text-red-500 hover:text-red-600"
                                                            onClick={() =>
                                                                categoryDeleteHandler(
                                                                    categoryExpense[0]
                                                                        .id
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                ) : (
                                                    categoryExpense[1].map(
                                                        (expense) => (
                                                            <SwipeToDelete
                                                                key={expense.id}
                                                                className="rounded-b"
                                                                height="auto"
                                                                onDelete={() =>
                                                                    expenseDeleteHandler(
                                                                        expense.id
                                                                    )
                                                                }
                                                                deleteColor="rgba(53, 53, 53, 1.00)"
                                                                deleteWidth="60"
                                                                deleteThreshold="50"
                                                                deleteComponent={
                                                                    <TrashIcon className="h-5 ml-5 text-red-700 hover:text-red-600" />
                                                                }
                                                            >
                                                                <div
                                                                    key={
                                                                        expense.id
                                                                    }
                                                                    className="flex flex-row justify-between items-center bg-stone-700 rounded-b text-white p-4"
                                                                >
                                                                    <div className="flex flex-col items-start">
                                                                        <h1 className="text-lg font-medium">
                                                                            {
                                                                                expense.name
                                                                            }
                                                                        </h1>
                                                                        <h1 className="text-sm text-gray-400">
                                                                            {expense.date.substring(
                                                                                8,
                                                                                10
                                                                            )}
                                                                            /
                                                                            {expense.date.substring(
                                                                                5,
                                                                                7
                                                                            )}
                                                                            /
                                                                            {expense.date.substring(
                                                                                2,
                                                                                4
                                                                            )}
                                                                        </h1>
                                                                    </div>
                                                                    <div className="font-bold font-display">
                                                                        ${" "}
                                                                        {props.locale.format(
                                                                            expense.amount
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </SwipeToDelete>
                                                        )
                                                    )
                                                )}
                                            </Disclosure.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Disclosure>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CategoriesList;
