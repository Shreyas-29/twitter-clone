'use client';

import React from 'react';
import { IoHomeOutline, IoNotificationsOutline, IoBookmarkOutline, IoPersonOutline, IoLogOutOutline } from 'react-icons/io5';
import SidebarItem from './SidebarItem';
import { useLoginModal, useLogoutModal } from '@/app/hooks';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';


interface BottomNavProps {
    user: User | null;
}


const BottomNav: React.FC<BottomNavProps> = ({
    user
}) => {

    const router = useRouter();

    const logoutModal = useLogoutModal();

    const loginModal = useLoginModal();

    const handleLogout = () => {
        logoutModal.onOpen();
    };

    const handleProfile = () => {
        if (!user) {
            loginModal.onOpen();
            return;
        }
        router.push(`/users/${user?.id}`)
    };

    const handleNotification = () => {
        if (!user) {
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
            small: true,
            onClick: handleBookmark
        },
        {
            id: 4,
            title: 'Profile',
            href: `/users/${user?.id}`,
            icon: IoPersonOutline,
            onClick: handleProfile
        },
    ];

    return (
        <div className='fixed bottom-0 left-0 w-full h-auto px-4 py-1 bg-black/20 backdrop-blur border-t border-neutral-700 block md:hidden z-[1000]'>
            <div className='flex items-center justify-evenly mx-auto w-full'>
                {items?.map((item) => (
                    <SidebarItem
                        key={item.id}
                        href={item.href}
                        title={item.title}
                        icon={item.icon}
                        onClick={item.onClick}
                        small={item.small}
                    />
                ))}
                {user && (
                    <SidebarItem
                        title='Logout'
                        icon={IoLogOutOutline}
                        onClick={handleLogout}
                        rotate
                    />
                )}
            </div>
        </div>
    )
}

export default BottomNav
