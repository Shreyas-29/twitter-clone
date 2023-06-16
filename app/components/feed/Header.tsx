'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoArrowBack, IoFlashOutline } from 'react-icons/io5';
import { HiOutlineLightningBolt } from 'react-icons/hi';


interface HeaderProps {
    title: string;
    isBack?: boolean;
}


const Header: React.FC<HeaderProps> = ({
    title,
    isBack
}) => {

    const router = useRouter();

    const handleClick = useCallback(() => {
        router.back();
    }, [router]);

    const [posts, setPosts] = useState<any>();

    const fetchTweets = async () => {
        try {
            const response = await fetch('/api/tweets');
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error)
        }
    };

    const handleRefresh = async () => {
        try {
            const data = await fetchTweets();
            setPosts(data);
            console.log("Feed updated!")
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <header className='border-b border-neutral-800 bg-black/20 backdrop-blur px-4 py-3 col-span-2 sticky z-[500] top-0 left-0 w-full'>
            <div className='flex flex-row items-center justify-between w-full gap-2'>
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
                <div onClick={handleRefresh} className='flex items-center justify-center w-9 h-9 rounded-full item'>
                    <HiOutlineLightningBolt className='w-5 h-5 text-white cursor-pointer' />
                </div>
            </div>
        </header>
    )
}

export default Header
