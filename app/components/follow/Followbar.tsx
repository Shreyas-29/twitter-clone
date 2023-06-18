'use client';

import { User } from '@prisma/client';
import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import FollowCard from './FollowCard';
import Updates from './Updates';


interface FollowBarProps {
    users: User[];
}

const Followbar: React.FC<FollowBarProps> = ({
    users
}) => {

    return (
        <div className='pl-4 py-4 hidden md:block lg:col-span-1'>
            <div className='sticky pb-2 top-0 left-0'>
                <div className='px-5 py-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 hover:bg-opacity-70 cursor-pointer border-y border-neutral-800 focus-within:border focus-within:border-sky-500 flex items-start relative'>
                    <IoSearchOutline className='absolute focus-within:text-sky-500 top-2.5 left-4 w-5 h-5 text-gray-400' />
                    <input
                        type="search"
                        placeholder='Search Twitter'
                        autoComplete='off'
                        className='pl-6 rounded-full placeholder:text-gray-500 cursor-pointer bg-transparent outline-none'
                    />
                </div>
            </div>
            <div className='flex flex-col items-start pt-4 rounded-2xl bg-[#16181c]/80 my-5'>
                <h3 className='text-xl font-semibold mx-4'>
                    What&apos;s happening
                </h3>
                <div className='space-y-4 mt-4 w-full'>
                    <Updates />
                </div>
                <button className='text-sm text-sky-500 pt-3 pb-4 hover:bg-zinc-800/30 w-full px-4'>
                    Show more
                </button>
            </div>
            <FollowCard users={users} />
        </div>
    )
}

export default Followbar
