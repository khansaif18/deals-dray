import React from 'react'

export default function Search({ value, onChange }) {
    return (
        <div>
            <input
                type="text"
                placeholder='search by name/email/number'
                value={value}
                onChange={onChange}
                autoComplete='off'
                className='py-2 px-3 bg-transparent border border-[#fff] outline-none rounded-md w-[20rem] placeholder:opacity-50'
            />
        </div>
    )
}
