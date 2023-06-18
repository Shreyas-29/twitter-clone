'use client';

import React from 'react';
import { CgSpinner } from 'react-icons/cg';


interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    title?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
    large?: boolean;
    small?: boolean;
    secondary?: boolean;
    danger?: boolean;
    outline?: boolean;
    onClick?: any | (() => void);
}

const Button: React.FC<ButtonProps> = ({
    type,
    fullWidth,
    title,
    onClick,
    secondary,
    danger,
    disabled,
    large,
    small,
    isLoading,
    outline
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={`flex justify-center rounded-md py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 select-none ${disabled && 'opacity-50 cursor-auto'} ${fullWidth && 'w-full'} ${large ? 'py-3 px-5' : 'py-2 px-4'} ${small && !large ? 'py-1 px-2.5' : ''} ${secondary && 'text-gray-900 bg-white hover:bg-gray-200'} ${danger && 'text-white bg-rose-500 hover:bg-rose-600'} ${!secondary && !danger && !outline && 'text-white bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'} ${outline ? 'bg-transparent hover:bg-neutral-900' : ''} ${outline ? 'border-white border' : ''} ${outline ? 'text-white' : ''} ${isLoading && 'w-full'} `}
        >
            {isLoading ?
                <CgSpinner className='w-5 h-5 text-current animate-spin' />
                :
                <span>
                    {title}
                </span>
            }
        </button>
    )
}

export default Button

