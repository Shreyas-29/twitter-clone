'use client';

import React from 'react';
import { IoHomeOutline, IoNotificationsOutline, IoBookmarkOutline, IoPersonOutline, IoLogOutOutline } from 'react-icons/io5';
import SidebarItem from './SidebarItem';
import { useLoginModal, useLogoutModal } from '@/app/hooks';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';


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
    };

    const items = [
        {
            id: 1,
            title: 'Home',
            href: '/',
            icon: IoHomeOutline,
            onClick: () => router.push('/')
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
            icon: IoBookmarkOutline,
            small: true
        },
        {
            id: 4,
            title: 'Profile',
            href: `${user ? `/users/${user?.id}` : '/'}`,
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
