import React, {useEffect, useState} from 'react';
import style from "./todosCounterStyles.module.scss";
import {useAppSelector} from "../../state/store";
import classNames from "classnames";

export const TodosCounter = () => {
    const addedNowTasks = useAppSelector((state) => state.tasks.addedNow);
    const deletedTotalTasks = useAppSelector((state) => state.tasks.deletedTotal);
    const addTasksForAllTimes = Number(localStorage.getItem("addedTotal") || "0")

    const [isVisibleCounter, setIsVisibleCounter] = useState(false);
    useEffect(() => {
        if (addTasksForAllTimes > 0) {
            setIsVisibleCounter(true);
        }
    }, [addTasksForAllTimes]);
    const containerClassName = classNames(
        style.container,
        {[style.visible]: isVisibleCounter}
    )
    return (
        <div className={containerClassName}>
            <div className={style.content}>
                <div className={style.counterItem}>Добавленные задачи(сейчас): <span
                    className={style.value}>{addedNowTasks}</span>
                </div>
                <div className={style.counterItem}>Добавленные задачи за все время: <span
                    className={style.value}>{addTasksForAllTimes}</span></div>
                <div className={style.counterItem}>Удалено задач за все время: <span
                    className={style.value}>{deletedTotalTasks}</span></div>
            </div>
        </div>
    );
};