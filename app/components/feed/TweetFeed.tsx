'use client';

import React, { useState, useEffect } from 'react';
import { Post, User } from '@prisma/client';
import Tweet from './Tweet';
import { pusherClient } from '@/app/libs/pusher';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../Loader';


interface TweetFeedProps {
    currentUser: User | null;
}

const TweetFeed: React.FC<TweetFeedProps> = ({
    currentUser
}) => {

    const [tweets, setTweets] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        const fetchInitialTweets = async () => {
            try {
                const response = await fetch('/api/tweets');
                const data = await response.json();
                setTweets(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        // Fetch initial tweets
        fetchInitialTweets();

        const channel = pusherClient.subscribe('tweets');

        const newTweetHandler = (newTweet: Post) => {
            setTweets((currentTweets) => {
                // Check if the new tweet is already present in the current tweets
                if (currentTweets.some((tweet) => tweet.id === newTweet.id)) {
                    return currentTweets; // Do not add duplicate tweet
                }

                return [newTweet, ...currentTweets]; // Add the new tweet at the beginning
            });
        };

        const removeTweetHandler = (tweetId: string) => {
            setTweets((currentTweets) => {
                return currentTweets.filter((tweet) => tweet.id !== tweetId);
            });
        };

        channel.bind('tweets:new', newTweetHandler);
        channel.bind('tweets:remove', removeTweetHandler);

        return () => {
            pusherClient.unsubscribe('tweets');
            channel.unbind('tweets:new', newTweetHandler);
            channel.unbind('tweets:remove', removeTweetHandler);
        };

    }, []);


    return (
        <div className='pb-40'>
            {loading ? (
                <Loader />
            ) : (
                <AnimatePresence initial={false}>
                    {tweets?.map((tweet: any, index: number) => (
                        <motion.div
                            key={tweet?.id}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, type: 'keyframes', ease: 'easeInOut' }}
                            // transition={{ duration: 0.7, type: 'spring', mass: 0.5, stiffness: 200 }}
                            style={{ zIndex: tweets.length - index }}
                        >
                            <Tweet
                                tweet={tweet}
                                user={currentUser}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            )}
        </div>
    )
}

export default TweetFeed
