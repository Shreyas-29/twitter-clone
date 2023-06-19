'use client';

import React from 'react';
import { IoHomeOutline, IoNotificationsOutline, IoBookmarkOutline, IoPersonOutline, IoLogOutOutline } from 'react-icons/io5';
import { BsTwitter } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { useLoginModal, useLogoutModal } from '@/app/hooks';
import { User } from '@prisma/client';
import SidebarProfile from './SidebarProfile';
import SidebarButton from './SidebarButton';
import SidebarItem from './SidebarItem';
import { toast } from 'react-hot-toast';


interface SidebarProps {
    currentUser: User | null;
}


const Sidebar: React.FC<SidebarProps> = ({
    currentUser
}) => {

    const router = useRouter();

    const logoutModal = useLogoutModal();
    const loginModal = useLoginModal();

    const handleProfile = () => {
        if (!currentUser) {
            loginModal.onOpen();
            return;
        }
        router.push(`/users/${currentUser?.id}`)
    };

    const handleNotification = () => {
        if (!currentUser) {
            toast.promise(
                new Promise((resolve) => {
                    setTimeout(resolve, 2000);
                }),
                {
                    loading: 'Please wait...',
                    success: 'Please sign in to access',
                    error: 'Please sign in to access',
                }
            );
            return;
        };

        router.push('/notifications')
    };

    const handleLogout = () => {
        logoutModal.onOpen();
    };

    const handleHome = () => {
        router.push('/');
    };

    const handleBookmark = () => {
        router.push('/bookmarks');
    };


    const items = [
        {
            id: 1,
            title: 'Home',
            href: '/',
            icon: IoHomeOutline,
            onClick: handleHome
        },
        {
            id: 2,
            title: 'Notifications',
            href: '/notifications',
            icon: IoNotificationsOutline,
            onClick: handleNotification
        },
        {
            id: 3,
            title: 'Bookmarks',
            href: '/bookmarks',
            icon: IoBookmarkOutline,
            onClick: handleBookmark
        },
        {
            id: 4,
            title: 'Profile',
            href: `/users/${currentUser?.id}`,
            icon: IoPersonOutline,
            onClick: handleProfile
        },
    ];

    return (
        <div className='col-span-1 max-h-screen pr-4 md:pr-6 hidden md:block to-neutral-800'>
            <div className='flex flex-col items-end h-full'>
                <div className='flex flex-col items-start justify-between lg:w-[230px] h-full'>
                    <div className='w-full h-full'>
                        <div className='flex items-start py-2'>
                            <div
                                onClick={handleHome}
                                className='flex items-center justify-start w-14'>
                                <div className='hover:bg-sky-500 text-white transition duration-300 hover:text-sky-500 hover:bg-opacity-10 cursor-pointer rounded-full p-3 lg:ml-2 active:scale-90 z-50'>
                                    <BsTwitter className='w-6 h-6' />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col items-start space-y-2 my-2'>
                            {items?.map((item) => (
                                <SidebarItem
                                    key={item.id}
                                    href={item.href}
                                    title={item.title}
                                    icon={item.icon}
                                    onClick={item.onClick}
                                />
                            ))}
                            {currentUser && (
                                <SidebarItem
                                    title='Logout'
                                    icon={IoLogOutOutline}
                                    onClick={handleLogout}
                                    rotate
                                />
                            )}
                            <SidebarButton currentUser={currentUser} />
                        </div>
                    </div>
                    {currentUser && (
                        <SidebarProfile
                            currentUser={currentUser}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
