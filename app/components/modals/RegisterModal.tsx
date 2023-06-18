'use client';

import React, { useCallback, FormEvent, useState } from 'react';
import { useLoginModal, useRegisterModal } from '@/app/hooks';
import Input from '../Input';
import Modal from '../Modal';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';



const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<boolean>(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        registerModal.onClose();
        loginModal.onOpen();

    }, [isLoading, registerModal, loginModal]);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            setIsLoading(true);

            if (!name || !username || !email || !password) {
                setError(true);
                setIsLoading(false);
                return;
            }

            await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    name,
                    email,
                    password
                })
            });

            signIn('credentials', {
                email,
                password
            });

            toast.success("You are Logged In!");
            registerModal.onClose();

        } catch (error) {
            toast.error("Something went wrong!");
            console.log("Error", error);
        } finally {
            if (!error) {
                setIsLoading(false);
            }
        }

    };

    const body = (
        <div className='flex flex-col gap-4'>
            <Input
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                error={error}
            />
            <Input
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                error={error}
            />
            <Input
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                error={error}
            />
            <Input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                error={error}
            />
            {error && <p className='py-1 text-xs text-rose-500'>All fields are required!</p>}
        </div>
    );

    const footer = (
        <div className='text-gray-400 text-center mt-4 font-medium'>
            <p>
                Already have an account? {` `}
                <span
                    onClick={onToggle}
                    className='text-gray-400 hover:text-sky-400 cursor-pointer'>
                    Sign In
                </span>
            </p>
        </div>
    );

    return (
        <Modal
            title='Create an account'
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={onSubmit}
            body={body}
            footer={footer}
        />
    )
}

export default RegisterModal
