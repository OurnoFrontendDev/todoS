import React, {useState} from 'react';
import style from "./styles.module.scss"
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../state/store";
import classNames from "classnames";
import {deleteAllTasks} from "../../state/actions";

type DeleteTasksToggleProps = {
    isStartShakeInputOrDeletingTasksToggle: (isShake: boolean) => void
    setIsShowModalAddTask: (isShow: boolean) => void
    setIsErrorShowingModalAddTodo: (isError: boolean) => void
    inputTitleAddTaskOrTodo: string
}
export const DeleteTasksToggle: React.FC<DeleteTasksToggleProps> = (props) => {
    const {
        isStartShakeInputOrDeletingTasksToggle,
        setIsShowModalAddTask,
        setIsErrorShowingModalAddTodo,
        inputTitleAddTaskOrTodo
    } = props
    const dispatch = useDispatch()
    const tasks = useAppSelector(state => state.tasks.todos)
    const deletedTotal = useAppSelector((state) => state.tasks.deletedTasksTotal);

    const [isChecked, setIsChecked] = useState(false);
    const [isShake, setIsShake] = useState(false)

    const handleDeleteTasks = () => {
        const isEmptyTasks = Object.keys(tasks).length === 0
        if (isEmptyTasks) {
            isStartShakeInputOrDeletingTasksToggle(true);
            setIsShowModalAddTask(true);
            setIsShake(true);
            setTimeout(() => {
                setIsShake(false);
                isStartShakeInputOrDeletingTasksToggle(false);
            }, 500);
        } else if (inputTitleAddTaskOrTodo.trim() === "" && deletedTotal && deletedTotal > 0) {
            setIsShake(true);
            setTimeout(() => {
                setIsErrorShowingModalAddTodo(true);
            }, 100);
        } else {
            setIsChecked(true);
            setTimeout(() => {
                setIsChecked(false);
            }, 100);
            dispatch(deleteAllTasks());
        }
    }

    const deleteTasksToggleClassNameInput = classNames(
        style.checkedToggle, style.inputToggle
    )

    const deleteTaskToggleClassName = classNames(
        style.button, {
            [style.shake]: isShake,
        }
    )
    return (
        <div className={style.container}>
            <label>
                <input type="checkbox" className={deleteTasksToggleClassNameInput} checked={isChecked}/>
                <span className={deleteTaskToggleClassName} onClick={handleDeleteTasks}></span>
            </label>
        </div>
    );
};
