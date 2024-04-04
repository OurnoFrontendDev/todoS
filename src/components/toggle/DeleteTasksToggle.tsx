import React, {useState} from 'react';
import style from "./deleteTasksToggleStyles.module.scss"
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../state/store";
import classNames from "classnames";
import {deleteAllTasks} from "../../state/actions";

type DeleteTasksToggleProps = {
    isStartShakeInputOrDeletingTasksToggle: (isShake: boolean) => void
    setIsShowModalAddTask: (isShowModalAddTask: boolean) => void
    setIsErrorShowingModalForAddTodo: (isErrorShowingModalForAddTodo: boolean) => void
    titleValueInputForCondition: string
}
export const DeleteTasksToggle: React.FC<DeleteTasksToggleProps> = (props) => {
    const {
        isStartShakeInputOrDeletingTasksToggle,
        setIsShowModalAddTask,
        setIsErrorShowingModalForAddTodo,
        titleValueInputForCondition
    } = props
    const dispatch = useDispatch()
    const tasks = useAppSelector(state => state.tasks.todos)
    const deletedTotal = useAppSelector((state) => state.tasks.deletedTotal);

    const [isChecked, setIsChecked] = useState(false);
    const [isShake, setIsShake] = useState(false)
    const handleDeleteTasks = () => {
        const isEmptyTasks = Object.keys(tasks).length === 0
       debugger
        if (isEmptyTasks) {
           isStartShakeInputOrDeletingTasksToggle(true);
            setIsShowModalAddTask(true);
            setIsShake(true);
            setTimeout(() => {
                setIsShake(false);
                isStartShakeInputOrDeletingTasksToggle(false);
            }, 500);
        } else if (titleValueInputForCondition.trim()==="" && deletedTotal && deletedTotal > 0) {
            setIsShake(true);
            setTimeout(() => {
                setIsErrorShowingModalForAddTodo(true);
            }, 100);
        } else {
            setIsChecked(true);
            setTimeout(() => {
                setIsChecked(false);
            }, 100);
            dispatch(deleteAllTasks());
        }
    }
    const stylesForToggleInput = classNames(
        style.checkedToggle, style.inputToggle
    )
    const stylesForToggleSpan = classNames(
        style.button, {
            [style.shake]: isShake,

        }
    )
    return (
        <div className={style.container}>
            <label>
                <input type="checkbox" className={stylesForToggleInput} checked={isChecked}/>
                <span className={stylesForToggleSpan} onClick={handleDeleteTasks}></span>
            </label>
        </div>
    );
};
