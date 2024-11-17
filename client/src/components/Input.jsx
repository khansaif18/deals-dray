import React from 'react'
import { Eye, EyeOff } from 'lucide-react'


export default function Input({ label, type, id, placeholder, value, onChange, inpType, handleType, readOnly }) {

    return (
        <div className='w-full px-1 my-2'>
            <div className="flex items-center justify-between">
                <label htmlFor={id} className="text-base font-medium text-white/60"> {label} </label>
            </div>
            <div className="mt-2 relative w-full">
                <input
                    id={id}
                    readOnly={readOnly}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    autoComplete='off'
                    className="flex h-10 w-[20rem] rounded-md  bg-transparent  border text-white border-gray-300 px-3 py-2 text-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 placeholder:opacity-50"
                />
                {
                    inpType &&
                    <span className='absolute right-2 top-[9px] cursor-pointer opacity-80' onClick={handleType}>
                        {
                            value.length > 0 &&
                            <>
                                {
                                    inpType === 'text' ? <EyeOff size={20} /> : <Eye size={20} />
                                }
                            </>
                        }
                    </span>
                }
            </div>
        </div>
    )
}
