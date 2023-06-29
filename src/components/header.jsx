import { Clock } from "./clock.jsx";
import { HiMoon, HiSun } from "react-icons/hi";
import { ThemeContext } from "../ThemeContext.jsx";
import { useContext } from "react";

export default function Header() {
    const {theme, setTheme} = useContext(ThemeContext);
    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-8 border-b border-gray-600 pb-5 flex items-center justify-between">
            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-200 sm:ml-5 pr-5 sm:pr-0 pt-5">
                Customer Rewards - Quarter 2 for 2023
            </h3>
            <div className="pt-5 flex sm:mr-10 sm:mt-0">
                {theme === 'light' ? (
                    <HiSun
                       className="cursor-pointer"
                       onClick={() => {
                           setTheme('dark');
                           localStorage.setItem('theme', 'dark')
                       }}
                    />
                ) : (
                    <HiMoon
                        className="cursor-pointer dark:text-gray-200"
                        onClick={() => {
                            setTheme('light');
                            localStorage.setItem('theme', 'light')
                        }}
                    />
                )}
                <Clock/>
            </div>
        </div>
    )
}