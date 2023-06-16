'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FaFeather } from 'react-icons/fa';
import { useLoginModal } from '@/app/hooks';
import { User } from '@prisma/client';

interface SidebarButtonProps {
    currentUser: User | null;
}


const SidebarButton: React.FC<SidebarButtonProps> = ({
    currentUser
}) => {

    const router = useRouter();

    const loginModal = useLoginModal();

    const openModal = useCallback(() => {
        loginModal.onOpen();
    }, [loginModal]);


    return (
        <div onClick={() => router.push('/')} className='w-full'>
            <div className='mt-6 lg:hidden rounded-full h-12 w-14 p-3 bg-sky-500 text-white flex items-center justify-center cursor-pointer'>
                <FaFeather className='w-6 h-6' />
            </div>
            <div className='mt-4 w-full hidden lg:flex'>
                <button
                    type='button'
                    disabled={currentUser ? true : false}
                    onClick={openModal}
                    className='w-full bg-sky-500 hover:bg-[#1a8cd8] transition-colors duration-300 ease-out px-4 py-2 rounded-full font-medium cursor-pointer disabled:cursor-not-allowed disabled:opacity-75'
                >
                    Tweet
                </button>
            </div>
        </div>
    )
}

export default SidebarButton
