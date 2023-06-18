import { Notification, User } from '@prisma/client';
import { format } from 'date-fns';
import React from 'react';
import { BsTwitter } from 'react-icons/bs';


interface NotificationsProps {
    notifications: Notification[];
    currentUser: User | null;
}

const Notifications: React.FC<NotificationsProps> = ({
    notifications,
    currentUser
}) => {

    const notification = notifications?.map((notification) => notification?.createdAt.toString());

    const notifiedTime = () => {
        if (!notification || notification.length === 0) {
            return null;
        }

        const formattedDate = format(
            new Date(notification[0]),
            "MMM dd, yyyy"
        );

        return formattedDate;
    };

    return (
        <div className='flex flex-col'>
            {!currentUser && (
                <div className='my-4 text-center mx-auto'>
                    <p className='text-lg text-gray-300'>
                        You must be logged in to view notifications.
                    </p>
                </div>
            )}
            {notifications.length === 0 && (
                <div className='my-4 text-center mx-auto'>
                    <p className='text-lg text-gray-300'>
                        You have no notifications.
                    </p>
                </div>
            )}

            {notifications?.map((notification) => (
                <div key={notification?.id} className='flex items-center justify-start gap-3 w-full px-4 py-3 bg-transparent hover:bg-[#16181c] cursor-pointer transition-colors duration-500 ease-out border-b border-neutral-800 select-none'>
                    <div className='w-8 h-8 flex items-center justify-center'>
                        <BsTwitter className='w-6 h-6 text-white' />
                    </div>
                    <div className='flex-1 flex-wrap'>
                        <p className='text-base text-gray-300'>
                            {notification?.body} on {notifiedTime()}.
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Notifications
