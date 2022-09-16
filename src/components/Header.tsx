import React, { useEffect, useState } from "react";

const Header = (props: {
    locale: Intl.NumberFormat;
    filteredExpenses: any;
    children: any;
    enteredMonth: string;
    imageUrl: string;
    isShrunkHandler: (bool) => void;
}) => {
    const [isShrunk, setShrunk] = useState(false);

    useEffect(() => {
        const handler = () => {
            setShrunk((isShrunk) => {
                if (
                    !isShrunk &&
                    (document.body.scrollTop > 20 ||
                        document.documentElement.scrollTop > 20)
                ) {
                    props.isShrunkHandler(true);
                    return true;
                }

                if (
                    isShrunk &&
                    document.body.scrollTop < 4 &&
                    document.documentElement.scrollTop < 4
                ) {
                    props.isShrunkHandler(false);
                    return false;
                }

                return isShrunk;
            });
        };

        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, [props]);

    return (
        <header
            id="header"
            className={`transform duration-500 sticky top-0 shadow-md z-50 bg-stone-800 ${
                isShrunk ? "mb-[81px]" : ""
            }`}
        >
            {props.children}
        </header>
    );
};

export default Header;
