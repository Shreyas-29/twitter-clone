import React from 'react'

const Bookmarks = () => {
    return (
        <div className='flex items-center justify-center flex-col w-full mt-10'>
            <div className='text-center mx-auto flex flex-col justify-center'>
                <h2 className='text-2xl font-medium text-gray-100'>
                    You have no bookmarks
                </h2>
                <p className='text-base text-gray-400 max-w-xs md:max-w-md mt-3'>
                    When you bookmark you tweets will shown here.
                </p>
            </div>
        </div>
    )
}

export default Bookmarks
