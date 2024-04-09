import React, {useEffect, useState} from 'react';
import style from "./styles.module.scss";
import {useAppSelector} from "../../state/store";
import classNames from "classnames";

export const TodosCounter = () => {
    const addedNowTasks = useAppSelector((state) => state.tasks.addedNow);
    const deletedTotalTasks = useAppSelector((state) => state.tasks.deletedTotal);
    const addTasksAllTimes = useAppSelector((state) => state.tasks.addedTotal)

    const [isVisibleCounter, setIsVisibleCounter] = useState(false);
    useEffect(() => {
        if (addTasksAllTimes && addTasksAllTimes > 0) {
            setIsVisibleCounter(true);
        }
    }, [addTasksAllTimes]);

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
                    className={style.value}>{addTasksAllTimes}</span></div>
                <div className={style.counterItem}>Удалено задач за все время: <span
                    className={style.value}>{deletedTotalTasks}</span></div>
            </div>
        </div>
    );
};