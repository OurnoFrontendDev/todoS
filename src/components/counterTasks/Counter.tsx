import React, {useEffect, useState} from 'react';
import s from "./Counter.module.scss";
import {useAppSelector} from "../../state/store";

export const Counter = () => {
    const addedNowTasks = useAppSelector((state) => state.tasks.addedNow);
    const deletedTotalTasks = useAppSelector((state) => state.tasks.deletedTotal);
    const addTasksForAllTimes = Number(localStorage.getItem("addedTotal") || "0")

    const [isVisibleCounter, setIsVisibleCounter] = useState(false);
    useEffect(() => {
        setIsVisibleCounter(addTasksForAllTimes > 0);
    }, [addTasksForAllTimes]);
    const containerClassName = isVisibleCounter ? `${s.counterContainer} ${s.visible}` : `${s.counterContainer}`;
    return (
        <div className={containerClassName}>
            <div className={s.content}>
                <div className={s.counterItem}>Добавленные задачи(сейчас): <span
                    className={s.value}>{addedNowTasks}</span>
                </div>
                <div className={s.counterItem}>Добавленные задачи за все время: <span
                    className={s.value}>{addTasksForAllTimes}</span></div>
                <div className={s.counterItem}>Удалено задач за все время: <span
                    className={s.value}>{deletedTotalTasks}</span></div>
            </div>
        </div>
    );
};