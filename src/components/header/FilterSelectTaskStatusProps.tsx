import React, {ChangeEvent} from 'react';
import style from './filterSelect.module.scss'
export type FilterValuesType = 'all' | 'active' | 'completed'|undefined ;
type FilterSelectTaskStatusProps = {
    onChange?: (value?: FilterValuesType) => void;
};

export const FilterSelectTaskStatus: React.FC<FilterSelectTaskStatusProps> = ({onChange}) => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(event.currentTarget.value as FilterValuesType);
    };
    return (
        <select onChange={handleChange} className={style.select}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
        </select>
    );
};

