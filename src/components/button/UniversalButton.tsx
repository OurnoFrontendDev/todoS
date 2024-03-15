import React from 'react';
import style from '/src/components/button/universalButton.module.scss';
import classNames from "classnames";

type UniversalButtonProps = {
    children?: React.ReactNode
    callBack: () => void
    className?: string
    size: "extraLargeBT" | "large" | "small"
    level?:buttonLevelToClassNameMap
}
type buttonLevelToClassNameMap ="primary"|"secondary"|"icons"|"default"

export const UniversalButton = (props: UniversalButtonProps) => {
    const buttonSizeToClassNameMap: Record<UniversalButtonProps["size"], string> = {
        extraLargeBT: style.extraBT,
        large: style.largeButton,
        small: style.smallButton
    }
    const buttonLevelToClassNameMap: Record<buttonLevelToClassNameMap, string> = {
        primary: style.primary,
        secondary: style.secondary,
        icons:style.icons,
        default:""
    }
    const onClickHandler = () => {
        props.callBack()
    }
    return (
        <>
            <button onClick={onClickHandler} className={classNames(props.className, style.button, buttonSizeToClassNameMap[props.size],buttonLevelToClassNameMap[props.level||"default"])}>{props.children}</button>
        </>
    );
};
// buttonSizeToClassNameMap[props.size], buttonLevelToClassNameMap[props.level || "primary"], buttonModalToClassNameMap[props.modalButton || "left"])