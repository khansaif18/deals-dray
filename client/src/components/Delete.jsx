import { Trash } from 'lucide-react'
import React, { useEffect, useRef } from 'react'

export default function Delete({ handleDelete, handleCancel, title, disabled }) {

    const delRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (delRef.current && !delRef.current.contains(e.target)) {
                handleCancel()
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleCancel])

    return (
        <div className='fixed right-0 left-0 top-0 h-screen w-full flex items-center justify-center  '>
            <div className='border border-[#ffffff28] w-[20rem] flex items-center justify-center flex-col p-5 rounded-md bg-[#1e1e1e]' ref={delRef}>
                <Trash size={50} className='opacity-50' />
                <h1 className='text-3xl font-bold '>Are You Sure?</h1>
                <p className=' text-base text-white/60'>This can not be undone</p>
                <div className='w-full flex items-center justify-center gap-5 mt-2'>
                    <button className='border border-[#ffffff28] py-1 px-3 text-lg text-white/60 hover:text-white rounded-md w-[90px]' onClick={handleCancel}>Cancel</button>
                    <button className='border border-[#ffffff28] py-1 px-3 text-lg text-white/60 hover:text-white hover:bg-red-600 rounded-md disabled:cursor-not-allowed w-[90px] flex items-center justify-center' onClick={handleDelete} disabled={disabled}>{title}</button>
                </div>
            </div>
        </div>
    )
}
