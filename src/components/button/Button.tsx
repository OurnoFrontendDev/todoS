import React from 'react';
import style from './buttonStyles.module.scss';
import classNames from "classnames";

export type ButtonVariations = "primary" | "secondary" | "icons"
export type ButtonSize = "extraLarge" | "large" | "small"

type ButtonProps = {
    children?: React.ReactNode
    onClick: () => void
    className?: string
    buttonSize: ButtonSize
    buttonVariations?: ButtonVariations
}

export const Button: React.FC<ButtonProps> = (props) => {
    const {children, onClick, className, buttonSize, buttonVariations} = props

    const buttonSizeToClassNameMap: Record<ButtonProps["buttonSize"], string> = {
        extraLarge: style.extraButton,
        large: style.largeButton,
        small: style.smallButton
    }
    const buttonVariationsToClassNameMap: Record<ButtonVariations, string> = {
        primary: style.primary,
        secondary: style.secondary,
        icons: style.icons,
    }
    const classNamesButton = classNames(className, style.button, buttonSizeToClassNameMap[buttonSize], buttonVariations ? buttonVariationsToClassNameMap[buttonVariations] : "")
    return (<button onClick={onClick} className={classNamesButton}>{children}</button>);
};
