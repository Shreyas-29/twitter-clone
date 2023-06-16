'use client';

import React, { useState, useEffect } from 'react';
import { Post, User } from '@prisma/client';
import { IoChatbubbleOutline, IoHeartOutline, IoHeart, IoAnalytics, IoShareSocialOutline, IoStatsChart } from 'react-icons/io5';
import { TbRepeat } from 'react-icons/tb';
import LikeButton from './LikeButton';


interface Tweet extends Post {
    user: User;
}

interface TweetItemProps {
    tweet: Tweet;
}

const TweetItem: React.FC<TweetItemProps> = ({
    tweet
}) => {

    const [liked, setLiked] = useState<boolean>(false);
    const [count, setCount] = useState<number>(30);

    const handleLike = (e: any) => {
        e.stopPropagation();

        setLiked((prev) => !prev);
        setCount(liked ? count - 1 : count + 1);
    };


    // Nice work! Your timeline’s getting better. The more you like, the better your timeline will be – keep liking the stuff you’re into.


    return (
        <div className='flex items-center justify-evenly w-full'>
            <button className='flex items-center py-1 gap-2 text-gray-500 hover:text-blue-500'>
                <IoChatbubbleOutline size={18} className='text-current' />
                <span className='text-sm text-current'>
                    1,786
                </span>
            </button>
            <button className='flex items-center py-1 gap-2 text-gray-500 hover:text-green-500'>
                <TbRepeat size={18} className='text-current rotate-90' />
                <span className='text-sm text-current'>
                    1,786
                </span>
            </button>
            {/* {liked
                    ?
                    <IoHeart size={18} className='text-current' />
                    :
                    <IoHeartOutline size={18} className='text-current' />
                } */}
            <button onClick={handleLike} className={`flex items-center py-1 gap-2 group ${liked ? 'text-pink-600' : 'text-gray-500'}`}>
                <LikeButton liked={liked} onClick={handleLike} />
                <span className='text-sm text-current'>
                    {count}
                </span>
            </button>
            <button className='flex items-center py-1 gap-2 text-gray-500 hover:text-cyan-500'>
                <IoShareSocialOutline size={18} className='text-current' />
                <span className='text-sm text-current'>
                    1,786
                </span>
            </button>
        </div>
    )
}

export default TweetItem
