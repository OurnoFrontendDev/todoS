import React, {useEffect, useState} from 'react';
import style from "./styles.module.scss";
import {useAppSelector} from "../../state/store";
import classNames from "classnames";

export const TodosCounter = () => {
    const addedTasksNow = useAppSelector((state) => state.tasks.addedNow);
    const deletedTasksTotal = useAppSelector((state) => state.tasks.deletedTasksTotal);
    const addTasksAllTimes = useAppSelector((state) => state.tasks.addedTasksTotal)

    const [isVisibleCounter, setIsVisibleCounter] = useState(false);

    useEffect(() => {
        const updatedDeleteTotal = deletedTasksTotal ? deletedTasksTotal + 1 : 1;
        localStorage.setItem('deletedTotalTasks', JSON.stringify(updatedDeleteTotal));
    }, [deletedTasksTotal]);

    useEffect(() => {
        if (addTasksAllTimes && addTasksAllTimes > 0) {
            setIsVisibleCounter(true);
        }
    }, []);

    const containerClassName = classNames(
        style.container,
        {[style.visible]: isVisibleCounter}
    )
    return (
        <div className={containerClassName}>
            <div className={style.content}>
                <div className={style.counterItem}>Добавленные задачи(сейчас): <span
                    className={style.value}>{addedTasksNow}</span>
                </div>
                <div className={style.counterItem}>Добавленные задачи за все время: <span
                    className={style.value}>{addTasksAllTimes}</span></div>
                <div className={style.counterItem}>Удалено задач за все время: <span
                    className={style.value}>{deletedTasksTotal}</span></div>
            </div>
        </div>
    );
};