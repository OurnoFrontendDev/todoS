import React from 'react';
import style from './styles.module.scss';
import classNames from "classnames";

export type ButtonVariant = "primary" | "secondary" | "icons"
export type ButtonSize = "extraLarge" | "large" | "small"

type ButtonProps = {
    children?: React.ReactNode
    onClick: () => void
    className?: string
    buttonSize: ButtonSize
    buttonVariant?: ButtonVariant
}
export const Button: React.FC<ButtonProps> = (props) => {
    const {children, onClick, className, buttonSize, buttonVariant} = props

    const buttonSizeToClassNameMap: Record<ButtonProps["buttonSize"], string> = {
        extraLarge: style.extraButton,
        large: style.largeButton,
        small: style.smallButton
    }
    const buttonVariationsToClassNameMap: Record<ButtonVariant, string> = {
        primary: style.primary,
        secondary: style.secondary,
        icons: style.icons,
    }
    const classNameButton = classNames(className, style.button, buttonSizeToClassNameMap[buttonSize], buttonVariationsToClassNameMap[buttonVariant || "primary"])
    return (<button onClick={onClick} className={classNameButton}>{children}</button>);
};
