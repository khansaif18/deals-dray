import React from 'react'

export default function Button({ title, type, onClick, disabled }) {
    return (
        <div>
            <button className="inline-flex mt-2 w-[20rem] items-center justify-center rounded-md font-bold tracking-wide outline-none bg-white px-3.5 py-2.5 leading-7 text-black hover:bg-white/60 duration-200 disabled:cursor-not-allowed"
                type={type}
                onClick={onClick}
                disabled={disabled}
            >
                {title}
            </button>
        </div>
    )
}
