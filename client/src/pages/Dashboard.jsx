import React, { useEffect } from 'react'
import { useData } from '../context/ContextProvider'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

export default function Dashboard() {

    const navigate = useNavigate()
    const { username, load } = useData()

    useEffect(() => {
        if (!username) {
            navigate('/login')
        }
    }, [username])

    {
        load &&
            <div className='w-full h-screen flex items-center justify-center'>
                <Loader2 size={40} className='rotate' />
            </div>
    }

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <h1 className='text-3xl font-semibold '>Welcome to Admin Panel -
                <b className='tracking-wide text-4xl underline'>{username && username}</b></h1>
        </div>
    )
}
