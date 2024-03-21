import React from 'react';
import classNames from 'classnames';
import {useTheme} from "../hooks/useTheme";
type Props = {
    children: React.ReactNode;
};
const Layout : React.FC<Props> = ({children}) =>  {
const {isDark}=useTheme()
    return (<div className={classNames('layout',{
        dark :isDark
    })}>{children}</div>);

};

export default Layout;