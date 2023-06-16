import React from 'react';


interface InputProps {
    placeholder?: string;
    value?: string;
    type?: string;
    disabled?: boolean;
    error?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
    placeholder,
    value,
    type,
    disabled,
    onChange,
    error
}) => {
    return (
        <input
            disabled={disabled}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            pattern='^[@#$]+$'
            className={`w-full px-4 py-3 rounded-md bg-transparent border border-neutral-800 outline-none focus:border-sky-500 focus:border transition duration-300 disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-auto ${error && 'border border-rose-500 focus:border-red-500 focus:border'}`}
        />
    )
}

export default Input
