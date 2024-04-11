import React from 'react';
import "/src/styles/App.scss"
import {Todolist} from "./components/todolist";
import {useTheme} from "./hooks/useTheme";
import classNames from "classnames";

function App() {
    const {isDark} = useTheme()

    const appClassName = classNames("App", {
        AppDark: isDark,
        AppLight: !isDark,
    });
    return (
        <div className={appClassName}><Todolist/></div>
    )
}

export default App;
