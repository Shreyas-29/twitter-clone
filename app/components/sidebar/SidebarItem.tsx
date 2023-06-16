'use client';

import React from 'react';
import { IconType } from 'react-icons';

interface ItemProps {
    title: string;
    href?: string;
    icon: IconType;
    onClick?: () => void;
    rotate?: boolean;
}

const SidebarItem: React.FC<ItemProps> = ({
    title,
    href,
    icon: Icon,
    onClick,
    rotate
}) => {
    return (
        <div onClick={onClick} className='flex flex-row items-center w-full'>
            <div className='relative rounded-full h-12 w-12 flex items-center justify-center p-3 item cursor-pointer lg:hidden'>
                <Icon className='w-7 h-7 text-white' />
            </div>
            <div className='relative w-full rounded-full hidden lg:flex items-center justify-start gap-3 px-5 py-3 item'>
                <Icon className={`w-6 h-6 text-white ${rotate && 'rotate-180'}`} />
                <span className='text-base font-medium hidden lg:block'>
                    {title}
                </span>
            </div>
        </div>
    )
}

export default SidebarItem
