import React from "react";
import { IMPORTANCE_CLASSES } from "../../lib/constants";
import { ImportanceIndex, newImportanceIndex } from "../../types/ImportanceIndex";

interface InputProps {
    label: string;
    importance?: ImportanceIndex;
    type: React.HTMLInputTypeAttribute;
    validater?: (value: string) => boolean;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}


const Input = ({
    label,
    importance = newImportanceIndex(3),
    type = 'text',
    validater = () => true,
    value,
    setValue,
}: InputProps): JSX.Element => {
    const importanceStyle = IMPORTANCE_CLASSES[importance] ?? 'font-normal';

    return (
        <label
            className={`${importanceStyle} flex w-full gap-2`}>
            {label}
            <input 
                className="border border-black rounded focus:outline focus:outline-2 focus:outline-messiah-blue"
                type={type}
                value={value as string}
                onChange={e => validater(e.target.value) ? setValue(e.target.value) : ''} />
        </label>
    );
};

export default Input;