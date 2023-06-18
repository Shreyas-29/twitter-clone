import React from 'react';
import { BsTwitter } from 'react-icons/bs';


const Loader = () => {
    return (
        <div className='flex flex-col items-center justify-center mx-auto w-full relative'>
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
            <BsTwitter className='w-4 h-4 absolute top-3 text-white' />
        </div>
    )
}

export default Loader
