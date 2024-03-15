// FilterSelect.tsx
import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "../todolist/Todolist";
import style from './filterSelect.module.scss'

type FilterSelectProps = {
    onChange: (value: FilterValuesType) => void;
};

const FilterSelect: React.FC<FilterSelectProps> = ({onChange}) => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(event.currentTarget.value as FilterValuesType);
    };
    return (
        <select onChange={handleChange} className={style.select}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed" >Completed</option>
        </select>
    );
};

export default FilterSelect;
