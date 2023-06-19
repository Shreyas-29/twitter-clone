'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import Avatar from '../Avatar';
import { User } from '@prisma/client';
import { useLoginModal } from '@/app/hooks';


interface HeaderProps {
    title: string;
    isBack?: boolean;
    user?: User | null;
}


const Header: React.FC<HeaderProps> = ({
    title,
    isBack,
    user
}) => {

    const router = useRouter();

    const loginModal = useLoginModal();

    const handleClick = useCallback(() => {
        router.back();
    }, [router]);


    const handleProfile = useCallback(() => {
        router.push(`/users/${user?.id}`);
    }, [router, user?.id]);

    const handleLogin = useCallback(() => {
        loginModal.onOpen();
    }, [loginModal]);


    return (
        <header className='border-b border-neutral-800 bg-black/20 backdrop-blur px-4 py-3 col-span-2 sticky z-[500] top-0 left-0 w-full'>
            <div className='flex flex-row items-center justify-between w-full gap-2 py-1 md:py-0'>
                <div className='flex items-center gap-2'>
                    {isBack && (
                        <div onClick={handleClick} className='item w-8 h-8 flex items-center justify-center rounded-full'>
                            <IoArrowBack className={`w-5 h-5 text-white cursor-pointer`} />
                        </div>
                    )}
                    <h1 onClick={() => router.push('/')} className='text-lg font-medium cursor-pointer select-none capitalize'>
                        {title}
                    </h1>
                </div>
                <div className='hidden md:flex items-center justify-center w-9 h-9 rounded-full item'>
                    <HiOutlineLightningBolt className='w-5 h-5 text-white cursor-pointer' />
                </div>
                {user && (
                    <div onClick={handleProfile} className='block md:hidden'>
                        <Avatar url={user?.profileImage!} small />
                    </div>
                )}
                {!user && (
                    <div onClick={handleLogin} className='block md:hidden'>
                        <Avatar url={'/images/profile.png'} small />
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
