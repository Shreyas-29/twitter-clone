import React from 'react';
import Image from 'next/image';
import { TbCameraPlus } from 'react-icons/tb';
import Avatar from '../../../components/Avatar';
import { User } from '@prisma/client';
import { CldUploadButton } from 'next-cloudinary';


interface ImageUploadProps {
    user: User | null;
    coverImage: string;
    profileImage: string;
    handleCoverImage: (result: any) => void;
    handleProfileImage: (result: any) => void;
}


const ImageUpload: React.FC<ImageUploadProps> = ({
    user,
    coverImage,
    profileImage,
    handleCoverImage,
    handleProfileImage
}) => {


    return (
        <div className='flex items-center rounded-md w-full relative'>
            <div className='w-full h-36 relative'>
                <Image
                    src={coverImage ? coverImage : '/images/user.png'}
                    alt='Cover Image'
                    width={1000}
                    height={1000}
                    unoptimized
                    className='w-full h-full object-cover rounded-md'
                />
                <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleCoverImage}
                    uploadPreset='ssqanesp'
                >
                    <div className='absolute top-16 left-[44%] mx-auto flex items-center justify-center w-10 h-10 rounded-full bg-gray-600/40 hover:bg-gray-700/50 cursor-pointer'>
                        <TbCameraPlus className='w-5 h-5 text-gray-100' />
                    </div>
                </CldUploadButton>
            </div>
            <div className='absolute top-28 left-4'>
                <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleProfileImage}
                    uploadPreset='ssqanesp'
                >
                    <Avatar url={profileImage ? profileImage : user?.profileImage!} isLarge medium />
                </CldUploadButton>
            </div>
        </div>
    )
}

export default ImageUpload
