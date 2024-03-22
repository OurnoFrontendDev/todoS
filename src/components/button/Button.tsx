import React from 'react';
import style from './buttonStyle.module.scss';
import classNames from "classnames";
export type buttonVariantToClassNameMap ="primary"|"secondary"|"icons"|"default"
export type buttonSizeToClassNameMap ="extraLarge" | "large" | "small"

type ButtonProps = {
    children?: React.ReactNode
    onClick: () => void
    className?: string
    size: buttonSizeToClassNameMap
    variant?:buttonVariantToClassNameMap
}

export const Button = (props: ButtonProps) => {
    const buttonSizeToClassNameMap: Record<ButtonProps["size"], string> = {
        extraLarge: style.extraButton,
        large: style.largeButton,
        small: style.smallButton
    }
    const buttonVariantToClassNameMap: Record<buttonVariantToClassNameMap, string> = {
        primary: style.primary,
        secondary: style.secondary,
        icons:style.icons,
        default:""
    }
    const onClickButtonHandler= () => props.onClick()
    const classNamesButton = classNames(props.className, style.button, buttonSizeToClassNameMap[props.size],buttonVariantToClassNameMap[props.variant||"default"])
    return (
        <>
            <button onClick={onClickButtonHandler} className={classNamesButton}>{props.children}</button>
        </>
    );
};
