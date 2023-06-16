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
        } else {
            router.push(`/users/${currentUser?.id}`);
        }
    };

    const handleLogout = () => {
        logoutModal.onOpen();
    };


    const items = [
        {
            id: 1,
            title: 'Home',
            href: '/',
            icon: IoHomeOutline
        },
        {
            id: 2,
            title: 'Notifications',
            href: '/notifications',
            icon: IoNotificationsOutline
        },
        {
            id: 3,
            title: 'Bookmarks',
            href: '/bookmarks',
            icon: IoBookmarkOutline
        },
        {
            id: 4,
            title: 'Profile',
            href: `/users/${currentUser?.id}`,
            icon: IoPersonOutline,
            onClick: handleProfile()
        },
    ];


    return (
        <div className='col-span-1 max-h-screen pr-4 md:pr-6'>
            <div className='flex flex-col items-end h-full'>
                <div className='flex flex-col items-start justify-between lg:w-[230px] h-full'>
                    <div className='w-full h-full'>
                        <div className='flex items-start py-2'>
                            <div
                                onClick={() => router.push('/')}
                                className='flex items-center justify-start w-14'>
                                <div className='hover:bg-sky-500 text-white transition duration-300 hover:text-sky-500 hover:bg-opacity-10 cursor-pointer rounded-full p-3 lg:ml-2 active:scale-90'>
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
                                    onClick={handleProfile}
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