import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import toast from 'react-hot-toast'
import { useData } from '../context/ContextProvider'
import { Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
    const [formValue, setFormValue] = useState({ username: '', password: '' })
    const [loading, setLoading] = useState(false)

    const { adminLogin, username } = useData()

    useEffect(() => {
        if (username) {
            navigate('/')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formValue.username && formValue.password) {
            try {
                setLoading(true)
                await adminLogin(formValue.username, formValue.password)
            } catch (error) {

            }
            finally {
                setLoading(false)
            }
        } else {
            toast.error('fill the required fields')
        }
    }



    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <form className='flex flex-col gap-3 justify-center items-center' onSubmit={handleSubmit}>

                <h1 className='text-3xl mb-5 font-bold tracking-wide underline'>Login as Admin </h1>

                <Input
                    id='username'
                    label='Enter Username *'
                    type='text'
                    placeholder='username'
                    value={formValue.username}
                    onChange={e => setFormValue({ ...formValue, username: e.target.value })}
                />

                <Input
                    id='password'
                    label='Enter Password *'
                    type='password'
                    placeholder='password'
                    value={formValue.password}
                    onChange={e => setFormValue({ ...formValue, password: e.target.value })}
                />

                <Button title={loading ? <Loader2 className='rotate' /> : 'Login'} type='submit' disabled={loading} />

                <p>Don't have an account? <Link to='/signup' className='hover:underline'>Register</Link></p>
            </form>
        </div>
    )
}
