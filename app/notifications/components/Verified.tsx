import React from 'react';
import Image from 'next/image';


const Verified = () => {
    return (
        <div className='flex items-center justify-center flex-col w-full'>
            <div className='my-8'>
                <Image
                    src='/images/verified.png'
                    alt='Verified Badge'
                    width={1000}
                    height={1000}
                    className='w-64 h-auto object-cover'
                />
            </div>
            <div className='text-center mx-auto flex flex-col justify-center'>
                <h2 className='text-2xl font-medium text-gray-100'>
                    Nothing to see here for now
                </h2>
                <p className='text-base text-gray-400 max-w-sm mt-3'>
                    Likes, mentions, re-tweets, and a whole lot of more it comes from a verified account, you will find it here. &nbsp;
                    <b className='font-medium text-white cursor-pointer border-b border-gray-400 hover:border-white'>
                        Learn more
                    </b>
                </p>
            </div>
        </div>
    )
}

export default Verified
