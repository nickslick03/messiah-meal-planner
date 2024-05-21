import React from "react";
import { IMPORTANCE_CLASSES } from "../../lib/constants";
import { ImportanceIndex, newImportanceIndex } from "../../types/ImportanceIndex";

interface SelectProps {
    label: string;
    importance?: ImportanceIndex;
    list: string[];
    setSelected: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Renders a select form element
 * @param {string}label The text next to the select dropdown
 * @param {ImportanceIndex}importance The boldness of the label text
 * @param {string[]}list The list of options
 * @param {React.Dispatch<React.SetStateAction<string>>}setSelected A react state setter to track the selected option
 */
const Select = ({
    label,
    importance = newImportanceIndex(3),
    list = [],
    setSelected
}: SelectProps): JSX.Element => {
    const importanceStyle = IMPORTANCE_CLASSES[importance] ?? 'font-normal';

    return (
        <label
            className={`${importanceStyle} flex w-full gap-2`}>
            {label}
            <select 
                className="border border-black rounded focus:outline focus:outline-2 focus:outline-messiah-blue"
                onChange={e => setSelected(e.target.value)}>
                {list.map((opt, i) => 
                <option key={i}>
                    {opt}
                </option>)}
            </select>
        </label>
    );
};

export default Select;