import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Expenses from "./components/Expenses";
import axios from "axios";
import Login from "./components/Login.tsx";
import SideMenu from "./components/SideMenu.tsx";

function App() {
    const apiIp = "localhost";

    const expensesRef = useRef(null);

    const [profile, setProfile] = useState();
    const [categories, setCategories] = useState("");
    const [expenses, setExpenses] = useState("");
    const [clickState, setClickState] = useState(3);

    let arLocale = Intl.NumberFormat("es-AR");

    useEffect(() => {
        if (profile) {
            getCategories(profile.sub);
            getExpenses(profile.sub);
        }
    }, [profile]);

    const getCategories = async (user) => {
        try {
            await axios
                .get(
                    `https://matiasbaezagraf1999.pythonanywhere.com/categories/${user}`,
                    {}
                )
                .then((response) => {
                    setCategories(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const getExpenses = async (user) => {
        try {
            await axios
                .get(
                    `https://matiasbaezagraf1999.pythonanywhere.com/expenses/${user}`,
                    {}
                )
                .then((response) => {
                    setExpenses(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const clickStateHandler = (state) => {
        setClickState(state);
    };

    const onSuccess = (res) => {
        setProfile(res);
        getCategories(res.sub);
        getExpenses(res.sub);
    };

    const logOut = () => {
        setProfile(null);
    };

    return (
        <div className="App">
            {profile ? (
                <div className={`flex text-white flex-row`}>
                    <SideMenu
                        setClickStateHandler={clickStateHandler}
                        clickState={clickState}
                        newExpense={() => expensesRef.current.modal()}
                        onLogoutSuccess={logOut}
                        name={profile.email}
                        imageUrl={profile.picture}
                    />
                    {categories && expenses && (
                        <Expenses
                            ref={expensesRef}
                            locale={arLocale}
                            expenses={expenses}
                            categories={categories}
                            updateCategories={getCategories}
                            updateExpenses={getExpenses}
                            apiIp={apiIp}
                            onLogoutSuccess={logOut}
                            imageUrl={profile.picture}
                            userIdentification={profile.sub}
                            userEmail={profile.email}
                            setClickStateHandler={clickStateHandler}
                            clickState={clickState}
                        />
                    )}
                </div>
            ) : (
                <div>
                    <Login onSuccess={onSuccess} />
                </div>
            )}
        </div>
    );
}

export default App;
