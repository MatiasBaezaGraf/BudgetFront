import React, { forwardRef, useImperativeHandle, useState } from "react";
import ReactLoading from "react-loading";
import Modal from "./Modal";
import ExpensesForm from "./ExpensesForm";
import ExpensesList from "./ExpensesList";
import CategoriesList from "./CategoriesList";
import CategoriesForm from "./CategoriesForm.tsx";
import Header from "./Header.tsx";
import axios from "axios";
import TabBar from "./TabBar";
import TotalAmount from "./TotalAmount";
import { PlusIcon } from "@heroicons/react/24/solid";
import Settings from "./Settings.tsx";

const Expenses = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        modal() {
            toggleModalHandler();
        },
    }));

    const [enteredMonth, setEnteredMonth] = useState(
        `${new Date().toISOString().substring(0, 7)}`
    );
    const [openModal, setOpenModal] = useState(false);
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [shrunkNavBar, setShrunkNavBar] = useState(false);
    //Este estado se cambia a true si no se selecciona ninguna categoria, y se vuelve a false cuando el form se envia. Este controla el mensaje de adevertencia rojo
    const [invalidCategory, setInvalidCategory] = useState(false);

    const filterHandler = (event) => {
        setEnteredMonth(event.target.value);
    };

    const saveExpenseHandler = async (enteredData) => {
        try {
            await axios
                .post(
                    `http://matiasbaezagraf1999.pythonanywhere.com/expenses/`,
                    {
                        name: enteredData.name,
                        amount: enteredData.amount,
                        date: enteredData.date,
                        category_id: enteredData.category_id,
                        user: props.userIdentification,
                    }
                )
                .then(() => {
                    setOpenModal(false);
                    setInvalidCategory(false);
                    setOrderHandler(2);
                    props.updateExpenses(props.userIdentification);
                });
        } catch (error) {
            console.log(error);
            setInvalidCategory(true);
        }
    };

    const deleteExpenseHandler = async (id) => {
        try {
            await axios
                .delete(
                    `http://matiasbaezagraf1999.pythonanywhere.com/expense/delete/${id}/`
                )
                .then(() => {
                    props.updateExpenses(props.userIdentification);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const saveCategoryHandler = async (enteredCategory) => {
        try {
            await axios
                .post(
                    `http://matiasbaezagraf1999.pythonanywhere.com/categories/`,
                    {
                        name: enteredCategory,
                        user: props.userIdentification,
                    }
                )
                .then(() => {
                    setOpenCategoryModal(false);
                    setOrderHandler(3);
                    props.updateCategories(props.userIdentification);
                });
        } catch (error) {
            console.log(error);
            setInvalidCategory(true);
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
                });
        } catch (error) {
            console.log(error);
        }
    };

    const resetAccount = async (user) => {
        try {
            await axios
                .delete(
                    `http://matiasbaezagraf1999.pythonanywhere.com/reset/${user}/`
                )
                .then(() => {
                    props.updateCategories(props.userIdentification);
                    props.updateExpenses(props.userIdentification);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const setOrderHandler = (state) => {
        props.setClickStateHandler(state);
    };

    const toggleModalHandler = () => {
        if (openModal === true) {
            setOrderHandler(2);
        }
        setOpenModal(!openModal);
    };

    const toggleCategoryModalHandler = () => {
        setOpenCategoryModal(!openCategoryModal);
    };

    const shrunkNavHandler = (set) => {
        setShrunkNavBar(set);
    };

    return (
        <div className="h-auto w-full flex flex-col justify-between">
            <Header
                locale={props.locale}
                filteredExpenses={props.expenses.filter(
                    (expense) => expense.date.substring(0, 7) === enteredMonth
                )}
                enteredMonth={enteredMonth}
                imageUrl={props.imageUrl}
                isShrunkHandler={shrunkNavHandler}
            >
                <TotalAmount
                    isShrunk={shrunkNavBar}
                    locale={props.locale}
                    filteredExpenses={props.expenses.filter(
                        (expense) =>
                            expense.date.substring(0, 7) === enteredMonth
                    )}
                    imageUrl={props.imageUrl}
                    setOrder={setOrderHandler}
                />
                <TabBar isShrunk={shrunkNavBar} setOrder={setOrderHandler} />
            </Header>
            <div className="flex-auto">
                {toggleModalHandler && (
                    <Modal
                        isOpen={openModal}
                        isClosed={toggleModalHandler}
                        title="Nueva Expensa"
                    >
                        <ExpensesForm
                            categories={props.categories}
                            expenses={props.expenses}
                            updateCategories={props.updateCategories}
                            saveExpenseData={saveExpenseHandler}
                            invalidCategory={invalidCategory}
                            apiIp={props.apiIp}
                            userIdentification={props.userIdentification}
                        />
                    </Modal>
                )}
                {toggleCategoryModalHandler && (
                    <Modal
                        isOpen={openCategoryModal}
                        isClosed={toggleCategoryModalHandler}
                        title={"Nueva Categoría"}
                    >
                        <CategoriesForm
                            saveCategoryData={saveCategoryHandler}
                        />
                    </Modal>
                )}
                {props.clickState === 2 && (
                    <div>
                        <div className="flex flex-row justify-between items-center text-left px-7 pt-6 mb-7">
                            <input
                                className="font-title text-md border-none inline-flex w-full appearance-none justify-start rounded-md bg-stone-700 bg-opacity-40 mr-3 text-xl text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                type="month"
                                value={enteredMonth}
                                onChange={filterHandler}
                            />
                            <button onClick={toggleModalHandler}>
                                <PlusIcon className="transform duration-300 w-7 h-7 cursor-pointer text-green-400 hover:text-green-500" />
                            </button>
                        </div>

                        <ExpensesList
                            locale={props.locale}
                            filteredExpenses={props.expenses.filter(
                                (expense) =>
                                    expense.date.substring(0, 7) ===
                                    enteredMonth
                            )}
                            categories={props.categories}
                            deleteHandler={deleteExpenseHandler}
                        />
                    </div>
                )}
                {props.clickState === 3 && (
                    <CategoriesList
                        locale={props.locale}
                        categories={props.categories}
                        expenses={props.expenses}
                        deleteExpenseHandler={deleteExpenseHandler}
                        deleteCategoryHandler={deleteCategoryHandler}
                        newCategoryHandler={toggleCategoryModalHandler}
                    />
                )}
                {props.clickState === 1 && (
                    <div className="flex flex-row justify-center items-center m-12">
                        <ReactLoading type="spin" height={70} width={70} />
                    </div>
                )}
                {props.clickState === 5 && (
                    <Settings
                        user={props.userIdentification}
                        mail={props.userEmail}
                        resetUser={resetAccount}
                    />
                )}
            </div>
        </div>
    );
});

export default Expenses;
