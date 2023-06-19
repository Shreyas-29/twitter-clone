'use client';

import React, { useState, useEffect } from 'react';
import Notifications from './Notifications';
import Verified from './Verified';
import Mentions from './Mentions';
import { Notification, User } from '@prisma/client';
import axios from 'axios';
import { pusherClient } from '@/app/libs/pusher';
import Loader from '../../components/Loader';


interface NotificationFeedProps {
    currentUser: User | null;
}

type Variant = 'All' | 'Verified' | 'Mentions';

const NotificationFeed: React.FC<NotificationFeedProps> = ({
    currentUser
}) => {

    const [activeTab, setActiveTab] = useState<Variant>("All");
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {

        try {

            if (!currentUser) {
                setLoading(false);
                return;
            }

            const fetchNotifications = async () => {
                const response = await axios.get(`/api/notifications/${currentUser?.id}`);
                if (response.status === 200) {
                    const data = response.data;
                    setNotifications(data);
                    setLoading(false);
                } else {
                    console.log('Error fetching notifications:', response.status);
                }
            };

            fetchNotifications();
        } catch (error) {
            console.log("Error", error);
            setLoading(false);
        }

        const channel = pusherClient.subscribe('notifications');

        const newNotificationHandler = (newNotification: Notification) => {
            setNotifications((prevNotifications) => {
                if (prevNotifications.some((notification) => notification.id === newNotification.id)) {
                    return prevNotifications;
                }

                return [newNotification, ...prevNotifications];
            });
        };

        channel.bind('notifications:new', newNotificationHandler);

        return () => {
            pusherClient.unsubscribe('notifications');
            channel.unbind('notifications:new', newNotificationHandler);
        }

    }, [currentUser?.id, currentUser]);

    const handleTabClick = (tab: Variant) => {
        setActiveTab(tab);
    };

    return (
        <div className="container mx-auto pb-8">
            {loading ? (
                <div className='mt-20'>
                    <Loader />
                </div>
            ) : (
                <div className="flex justify-center">
                    <div className="w-full">
                        <div className="flex border-b border-gray-800 sticky top-0 left-0">
                            <button
                                className={`flex-1 py-2.5 px-4 hover:bg-[#16181c] transition-colors duration-500 ${activeTab === 'All' ? 'bg-sky-500 hover:bg-sky-400 text-white' : 'text-gray-500 hover:text-gray-400'
                                    }`}
                                onClick={() => handleTabClick('All')}
                            >
                                All
                            </button>
                            <button
                                className={`flex-1 py-2.5 px-4 hover:bg-[#16181c] transition-colors duration-500 ${activeTab === 'Verified' ? 'bg-sky-500 hover:bg-sky-400 text-white' : 'text-gray-500 hover:text-gray-400'
                                    }`}
                                onClick={() => handleTabClick('Verified')}
                            >
                                Verified
                            </button>
                            <button
                                className={`flex-1 py-2.5 px-4 hover:bg-[#16181c] transition-colors duration-500 ${activeTab === 'Mentions' ? 'bg-sky-500 hover:bg-sky-400 text-white' : 'text-gray-500 hover:text-gray-400'
                                    }`}
                                onClick={() => handleTabClick('Mentions')}
                            >
                                Mentions
                            </button>
                        </div>
                        <div>
                            {activeTab === 'All' &&
                                <Notifications
                                    notifications={notifications}
                                    currentUser={currentUser}
                                />}
                            {activeTab === 'Verified' && <Verified />}
                            {activeTab === 'Mentions' && <Mentions />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NotificationFeed
