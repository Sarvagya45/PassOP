import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-700 flex flex-col justify-center items-center w-full'>
            <div className=' text-white text-center'>
                <div className='font-bold text-lg' >
                    <span className='text-green-500'>&lt;</span>
                    <span>Pass</span><span className='text-green-500'>OP</span>
                    <span className='text-green-500'>&gt;</span>
                </div>
                <p><a href="https://github.com/your-username/password-manager" target="_blank">View Source on GitHub</a></p>
            </div>
        </div>
    )
}

export default Footer
