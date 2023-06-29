import './index.css'
import { useState } from 'react'
import { ThemeContext } from "./ThemeContext.jsx";
import Header from "./components/header.jsx";
import Body from "./components/body.jsx";

function App() {
    const [theme, setTheme] = useState("dark");
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <div className={`${theme} ${theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"} min-h-[100vh]`}>
                <Header />
                <Body />
            </div>
        </ThemeContext.Provider>
    )
}

export default App;