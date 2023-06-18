'use client';

import { useLoginModal, useRegisterModal } from '@/app/hooks';
import React, { FormEvent, useCallback, useState } from 'react';
import Input from '../Input';
import Modal from '../Modal';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<boolean>(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        loginModal.onClose();
        registerModal.onOpen();

    }, [isLoading, registerModal, loginModal]);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if (!email || !password) {
            setError(true);
            setIsLoading(false);
            return;
        }

        try {

            const result = await signIn('credentials', {
                email,
                password,
                redirect: false
            });

            if (result?.error === 'InvalidCredentials') {
                toast.error("Invalid password");
            } else if (result?.error) {
                toast.error("Invalid Credentials");
            } else {
                toast.success("You are Logged In!");
                loginModal.onClose();
                router.refresh();
            }

        } catch (error) {
            toast.error("Invalid Credentials");
            console.log("Error", error);
        } finally {
            setIsLoading(false);
        }

    };

    const body = (
        <div className='flex flex-col gap-4'>
            <Input
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
                error={error}
            />
            <Input
                type='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
                error={error}
            />
            {error && <p className='py-1 text-xs text-rose-500'>All fields are required!</p>}
        </div>
    );

    const footer = (
        <div className='text-gray-400 text-center mt-4 font-medium'>
            <p>
                New to Twitter? {` `}
                <span
                    onClick={onToggle}
                    className='text-gray-400 hover:text-sky-400 cursor-pointer'>
                    Create an account
                </span>
            </p>
        </div>
    );

    return (
        <Modal
            title='Login'
            disabled={isLoading}
            isLoading={isLoading}
            isOpen={loginModal.isOpen}
            actionLabel='Sign In'
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={body}
            footer={footer}
        />
    )
}

export default LoginModal
