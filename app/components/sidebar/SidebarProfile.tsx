import React from 'react';
import { User } from '@prisma/client';
import Image from 'next/image';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { useRouter } from 'next/navigation';


interface SidebarButtonProps {
    currentUser: User | null;
}


const SidebarProfile: React.FC<SidebarButtonProps> = ({
    currentUser
}) => {

    const router = useRouter();

    return (
        <div className='mt-auto mb-3 w-full'>
            <div
                onClick={() => router.push(`/users/${currentUser?.id}`)}
                className='border border-neutral-800 rounded-full flex items-center justify-between w-full py-2 pl-3 pr-4 cursor-pointer hover:bg-neutral-900/80'
            >
                <div className='flex items-center justify-start gap-2'>
                    <div className='w-10 h-10 rounded-full'>
                        <Image
                            src={currentUser?.profileImage! || '/images/profile.png'}
                            alt={currentUser?.name!}
                            width={1000}
                            height={1000}
                            className='object-cover rounded-full w-full h-full'
                        />
                    </div>
                    <div className='flex flex-col items-start'>
                        <h4 className='text-gray-50 font-medium capitalize'>
                            {currentUser?.name}
                        </h4>
                        <span className='text-sm text-gray-500 -mt-1'>
                            @{currentUser?.username}
                        </span>
                    </div>
                </div>
                <div>
                    <IoEllipsisHorizontal className='w-5 h-5 text-white' />
                </div>
            </div>
        </div>
    )
}

export default SidebarProfile
