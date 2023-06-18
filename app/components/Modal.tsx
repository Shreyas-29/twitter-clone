'use client';

import React, { FormEvent, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import Button from './Button';
import { useLogoutModal } from '../hooks';


interface ModalProps {
    isOpen?: boolean;
    isLoading?: boolean;
    onClose: () => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    body: React.ReactElement;
    title?: string;
    footer?: React.ReactElement;
    actionLabel?: string;
    disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    body,
    title,
    footer,
    actionLabel,
    disabled,
    isLoading
}) => {

    const logoutModal = useLogoutModal();

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }
        onClose();
    }, [disabled, onClose]);

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (disabled) {
            return;
        }
        onSubmit(e);
    }, [disabled, onSubmit]);

    if (!isOpen) return null;


    return (
        <AnimatePresence>
            <div className='absolute z-[1000] top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 flex items-center justify-center h-screen w-screen select-'>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleClose}
                    className='w-screen h-screen bg-neutral-800 bg-opacity-40 backdrop-blur-sm absolute z-10 inset-0'
                />
                <motion.form
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: -0.5 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                    onSubmit={handleSubmit}
                    className='bg-black flex flex-col px-6 py-8 md:py-10 md:px-10 shadow-2xl shadow-black/40 rounded-2xl z-50 h-auto w-full mx-4 md:mx-10 md:max-w-md relative'
                >
                    <div className='flex items-center justify-between rounded-t'>
                        <h3 className='text-2xl font-semibold'>
                            {title}
                        </h3>
                        <div className="absolute right-0 top-0 pr-5 pt-5 block z-10">
                            <button
                                type="button"
                                disabled={isLoading}
                                className="rounded-md bg-neutral-900 p-1 text-gray-400 hover:text-gray-300 outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                                onClick={onClose}
                            >
                                <span className="sr-only">Close</span>
                                <IoClose className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    <div className={`${logoutModal?.isOpen ? 'pt-5' : 'py-6'} flex-auto relative`}>
                        {body}
                    </div>
                    {!logoutModal?.isOpen && (
                        <div className='flex flex-col gap-2 mt-2'>
                            <Button
                                title={actionLabel}
                                isLoading={isLoading}
                                disabled={isLoading}
                                type='submit'
                                secondary
                                fullWidth
                                large
                                onClick={handleSubmit}
                            />
                            {footer}
                        </div>
                    )}
                </motion.form>
            </div>
        </AnimatePresence>
    )
}

export default Modal
