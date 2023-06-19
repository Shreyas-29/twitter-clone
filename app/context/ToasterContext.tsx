'use client';

import React from 'react'
import { Toaster } from 'react-hot-toast'

const ToasterContext = () => {

    const customToastStyle = {
        background: '#1f2937',
        borderRadius: '5px',
        color: '#fff',
        fontSize: '14px',
    };

    const customToastOptions = {
        style: customToastStyle,
        success: {
            style: customToastStyle,
        },
        error: {
            style: customToastStyle,
        },
        loading: {
            style: customToastStyle,
        },
    };

    return (
        <Toaster position="top-right" toastOptions={customToastOptions} />
    )
}

export default ToasterContext;