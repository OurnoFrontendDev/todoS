import React, {useContext} from 'react';
import {ThemeContext} from "../contexts/ThemeProvider";

 const UseTheme = () => {
    const value =useContext(ThemeContext)
    return value
};
export default UseTheme

