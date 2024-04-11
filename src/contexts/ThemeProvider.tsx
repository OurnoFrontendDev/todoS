import React, {createContext, Dispatch, ReactNode, SetStateAction, useMemo, useState} from "react";

interface ThemeContextType {
    isDark: boolean;
    setIsDark?: Dispatch<SetStateAction<boolean>>;
}

type ThemeProviderProps = {
    children: ReactNode;
};
export const ThemeContext = createContext<ThemeContextType>({isDark: false});
export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const [isDark, setIsDark] = useState(false);
    const value = useMemo(() => ({isDark, setIsDark}), [isDark])
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};