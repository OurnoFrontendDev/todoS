import React from 'react';
import "/src/App.scss"
import {Todolist} from "./components/todolist/Todolist";
import {useTheme} from "./hooks/useTheme";

function App() {
    const {isDark} = useTheme()
    const appClassName = `App ${isDark ? 'AppDark' : 'AppLight'}`;
    return (
        <div className={appClassName}><Todolist/></div>
    )
}
export default App;
