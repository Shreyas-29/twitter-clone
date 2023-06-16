import React from 'react';
import Image from 'next/image';;


interface AvatarProps {
    isLarge?: boolean;
    url: string;
    border?: boolean;
    medium?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
    isLarge,
    url,
    border,
    medium
}) => {
    return (
        <div className={`rounded-full hover:brightness-110 transition-all cursor-pointer relative ${isLarge && !medium ? 'w-32 h-32' : 'w-11 h-11'} ${medium && 'w-16 h-16'} ${border && 'border-4 border-black'}`}>
            <Image
                src={url! || '/images/profile.png'}
                alt='User Image'
                width={1000}
                height={1000}
                className='w-full h-full object-cover rounded-full'
            />
        </div>
    )
}

export default Avatar
