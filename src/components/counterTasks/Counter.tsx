import React, {useEffect, useState} from 'react';
import s from "/src/components/counterTasks/Counter.module.scss";
import {RootState, useAppSelector} from "../../state/store";
import {useSelector} from "react-redux";

export const Counter = () => {

    const addedNow = useAppSelector((state) => state.tasks.addedNow);
    const deletedTotal = useAppSelector((state) => state.tasks.deletedTotal);
    const actTasksString = localStorage.getItem("addedTotal") || "0";
    const actTasks = parseInt(actTasksString);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(actTasks > 0);
    }, [actTasks]);
    const containerClassName = isVisible ? `${s.containerCounter} ${s.visible}` : `${s.containerCounter}`;
    return (
        <div className={containerClassName}>
            <div className={s.content}>
                <div className={s.firstBlock}>Добавленные задачи(сейчас): <span className={s.value}>{addedNow}</span>
                </div>
                <div className={s.secondBlock}>Добавленные задачи за все время: <span
                    className={s.value}>{actTasks}</span></div>
                <div className={s.thirdBlock}>Удалено задач за все время: <span
                    className={s.value}>{deletedTotal}</span></div>
            </div>
        </div>
    );
};