import React, {ChangeEvent} from 'react';
import style from './styles.module.scss'
export type FilterValuesType = 'all' | 'active' | 'completed';
type FilterSelectTaskStatus = {
    onChange?: (value?: FilterValuesType) => void;
};

export const FilterSelectTaskStatus: React.FC<FilterSelectTaskStatus> = ({onChange}) => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(event.currentTarget.value as FilterValuesType);
    };
    return (
        <select onChange={handleChange} className={style.container}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
        </select>
    );
};

