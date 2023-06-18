'use client';

import React, { useState, useEffect } from 'react';
import { getUpdates } from '@/app/graphql';
import { CgSpinner } from 'react-icons/cg';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';


const Updates = () => {

    const [updates, setUpdates] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const data = await getUpdates();
                setUpdates(data);
                setLoading(false);
            };

            fetchData();
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, []);

    const shuffledUpdates = [...updates].sort(() => Math.random() - 0.5);

    const randomUpdates = shuffledUpdates.slice(0, 3);

    return (
        <div>
            {loading ? (
                <div className='flex items-center justify-center w-full py-4'>
                    <CgSpinner className='w-5 h-5 text-sky-500 animate-spin' />
                </div>
            ) : (
                <>
                    {randomUpdates?.slice(0, 3)?.map((update: any) => {
                        const { slug, title, about, tweet } = update?.node;
                        return (
                            <div key={slug} className='flex items-start justify-between hover:bg-zinc-80030 transition-colors px-4 py-2 w-full cursor-pointer select-none'>
                                <div className='flex flex-col items-start'>
                                    <span className='text-xs text-gray-500'>
                                        {about}
                                    </span>
                                    <h4 className='text-gray-50 font-medium'>
                                        #{title}
                                    </h4>
                                    <span className='text-xs text-gray-500'>
                                        {tweet.toLocaleString()} Tweets
                                    </span>
                                </div>
                                <div className='item w-9 h-9 flex items-center justify-center rounded-full'>
                                    <IoEllipsisHorizontalSharp className='w-5 h-5 text-gray-500' />
                                </div>
                            </div>
                        )
                    })}
                </>
            )}
        </div>
    )
}

export default Updates
