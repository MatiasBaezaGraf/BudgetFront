import React, { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
    ChevronUpDownIcon,
    CheckIcon,
    PlusCircleIcon,
    XMarkIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import ReactLoading from "react-loading";
import axios from "axios";

const ExpensesForm = (props) => {
    const [enteredName, setEnteredName] = useState("");
    const [enteredAmount, setEnteredAmount] = useState("");
    const [enteredDate, setEnteredDate] = useState(
        `${new Date().toISOString().substring(0, 10)}`
    );
    const [enteredCategory, setEnteredCategory] = useState(""); //For display
    const [enteredId, setEnteredId] = useState(-1); //For expense

    const [loading, setLoading] = useState(false);

    const [query, setQuery] = useState("");

    // Limites para el datepicker
    const max = new Date().toISOString().substring(0, 10);
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const min = lastWeek.toISOString().substring(0, 10);

    const categoriesExpenses = props.categories.map((c) => [
        c,
        props.expenses.filter((e) => e.category_id === c.id),
        props.expenses
            .filter((e) => e.category_id === c.id)
            .map((e) => e.amount)
            .reduce((partialSum, a) => partialSum + a, 0),
    ]);

    const filteredCategories =
        query === ""
            ? categoriesExpenses
            : categoriesExpenses.filter((categoryExpense) => {
                  return categoryExpense[0].name
                      .toLowerCase()
                      .includes(query.toLowerCase());
              });

    const newCategoryHandler = async () => {
        const categoryData = {
            name: query,
        };

        try {
            await axios
                .post(
                    `http://matiasbaezagraf1999.pythonanywhere.com/categories/`,
                    {
                        name: categoryData.name,
                        user: props.userIdentification,
                    }
                )
                .then(() => {
                    props.updateCategories(props.userIdentification);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCategoryHandler = async (id) => {
        try {
            await axios
                .delete(
                    `http://matiasbaezagraf1999.pythonanywhere.com/categories/delete/${id}/`
                )
                .then(() => {
                    props.updateCategories(props.userIdentification);
                    setEnteredCategory(query);
                });
        } catch (error) {
            console.log(error.response.status);
        }
    };

    const nameHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const amountHandler = (event) => {
        setEnteredAmount(event.target.value);
    };

    const dateHandler = (event) => {
        setEnteredDate(event.target.value);
    };

    const categoryHandler = (name) => {
        setEnteredCategory(name);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);

        const expenseData = {
            name: enteredName,
            amount: enteredAmount,
            date: enteredDate,
            category_id: enteredId,
        };

        props.saveExpenseData(expenseData);
    };

    return (
        <div className="flex flex-col">
            <form onSubmit={submitHandler}>
                <input
                    className="border-none inline-flex w-full justify-center rounded-md bg-black bg-opacity-40 px-4 py-2 mb-4 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    type="text"
                    value={enteredName}
                    onChange={nameHandler}
                    placeholder="Nombre..."
                    required
                />
                <input
                    className="border-none inline-flex w-full appearance-none justify-center rounded-md bg-black bg-opacity-40 px-4 py-2 mb-4 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    type="number"
                    min="0"
                    value={enteredAmount}
                    onChange={amountHandler}
                    placeholder="$"
                    required
                />

                <input
                    className="border-none inline-flex w-full appearance-none rounded-md bg-black bg-opacity-40 px-4 py-2 mb-4 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    type="date"
                    min={min}
                    max={max}
                    value={enteredDate}
                    onChange={dateHandler}
                    required
                />

                <Combobox value={enteredCategory} onChange={categoryHandler}>
                    <div className="relative">
                        <div className="relative w-full cursor-default overflow-hidden rounded-md bg-stone-900 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                            <Combobox.Input
                                placeholder="Categoría..."
                                className="w-full bg-stone-900 border-none py-2 pl-3 pr-10 text-sm font-medium leading-5 text-white focus:ring-0"
                                displayValue={enteredCategory}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-white"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-in duration-100"
                            enterFrom="opacity-0"
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery("")}
                        >
                            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-stone-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredCategories.length === 0 &&
                                query !== "" ? (
                                    <div className="relative flex flex-row justify-between cursor-default select-none py-2 px-4 text-white">
                                        <span>
                                            Agregar categoría{" "}
                                            <span className="font-medium">
                                                '{query}'
                                            </span>
                                            ?
                                        </span>
                                        <Combobox.Button>
                                            <PlusCircleIcon
                                                onClick={newCategoryHandler}
                                                className="w-5 h-5 text-green-700 hover:text-green-800 cursor-pointer"
                                            />
                                        </Combobox.Button>
                                    </div>
                                ) : (
                                    filteredCategories.map(
                                        (categoryExpense) => (
                                            <Combobox.Option
                                                key={categoryExpense[0].id}
                                                onClick={() =>
                                                    setEnteredId(
                                                        categoryExpense[0].id
                                                    )
                                                }
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                                                        active
                                                            ? "bg-stone-700 text-white"
                                                            : "text-white"
                                                    }`
                                                }
                                                value={categoryExpense[0].name}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span
                                                            className={`truncate flex flex-row justify-between ${
                                                                selected
                                                                    ? "font-medium"
                                                                    : "font-normal"
                                                            }`}
                                                        >
                                                            {
                                                                categoryExpense[0]
                                                                    .name
                                                            }
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                                className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
                                                                    active
                                                                        ? "text-white"
                                                                        : "text-white"
                                                                }`}
                                                            >
                                                                <CheckIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        ) : (
                                                            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                                {categoryExpense[1]
                                                                    .length ===
                                                                    0 && (
                                                                    <Combobox.Button>
                                                                        <XMarkIcon
                                                                            onClick={(
                                                                                e
                                                                            ) => {
                                                                                e.stopPropagation();
                                                                                deleteCategoryHandler(
                                                                                    categoryExpense[0]
                                                                                        .id
                                                                                );
                                                                            }}
                                                                            className="h-5 w-5 cursor-pointer text-red-500 hover:text-red-600"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </Combobox.Button>
                                                                )}
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        )
                                    )
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
                {props.invalidCategory && (
                    <h4 className="flex flex-row items-center pt-1 text-sm text-red-600">
                        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                        Ingrese una categoría válida!
                    </h4>
                )}
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

export default ExpensesForm;
