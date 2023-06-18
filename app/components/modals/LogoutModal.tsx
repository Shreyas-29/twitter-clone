'use client';

import { useLogoutModal } from '@/app/hooks';
import React, { useState } from 'react';
import Modal from '../Modal';
import { toast } from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import Button from '../Button';
import { useRouter } from 'next/navigation';

const LogoutModal = () => {

    const router = useRouter();

    const logoutModal = useLogoutModal();

    const [loading, setLoading] = useState<boolean>(false);

    const handleLogout = async () => {
        setLoading(true);
        signOut()
            .then(() => {
                toast.success('You are successfully signed out!');
                logoutModal.onClose();
                router.push('/');
                router.refresh();
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    const handleClose = () => {
        logoutModal.onClose();
    }

    const body = (
        <div className='flex flex-col gap-4'>
            <h2 className='text-xl font-normal text-gray-200'>Are you sure want to Logout?</h2>
            <div className='pt-2 flex items-end justify-end w-full gap-4'>
                <Button
                    title='Close'
                    type='button'
                    secondary
                    onClick={handleClose}
                />
                <Button
                    title='Logout'
                    type='submit'
                    danger
                    onClick={handleLogout}
                    disabled={loading}
                />
            </div>
        </div>
    );


    return (
        <Modal
            title='Logout'
            isOpen={logoutModal.isOpen}
            onClose={logoutModal.onClose}
            onSubmit={handleLogout}
            body={body}
        />
    )
}

export default LogoutModal;
