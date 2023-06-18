'use client';

import React, { useState, useEffect } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { motion, AnimatePresence } from 'framer-motion';
import { Tweet } from '@/app/components';
import { Post, User } from '@prisma/client';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { pusherClient } from '@/app/libs/pusher';


interface TweetFeedProps {
    user: User | null;
    posts?: Post[]
}


const TweetFeed: React.FC<TweetFeedProps> = ({
    user,
    posts
}) => {

    return (
        <div className='mt-8 pb-40 border-t border-neutral-800'>
            <AnimatePresence initial={false}>
                {posts?.map((tweet: any, index: number) => (
                    <motion.div
                        key={tweet?.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, type: 'keyframes', ease: 'easeInOut' }}
                        // transition={{ duration: 0.7, type: 'spring', mass: 0.5, stiffness: 200 }}
                        style={{ zIndex: posts.length - index }}
                    >
                        <Tweet
                            tweet={tweet}
                            user={user}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

export default TweetFeed
