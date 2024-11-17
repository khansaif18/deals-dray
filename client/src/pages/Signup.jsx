import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import toast from 'react-hot-toast'
import { useData } from '../context/ContextProvider'
import { Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const navigate = useNavigate()
    const [formValue, setFormValue] = useState({ username: '', password: '', cnfPassword: '' })
    const [loading, setLoading] = useState(false)

    const { adminRegister, username, error } = useData()

    useEffect(() => {
        if (username) {
            navigate('/')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formValue.username && formValue.password && formValue.cnfPassword) {
            if (formValue.password === formValue.cnfPassword) {
                try {
                    setLoading(true)
                    await adminRegister(formValue.username, formValue.password)
                } catch (error) {

                }
                finally {
                    setLoading(false)
                }
            } else {
                toast.error('Passwords do not match')
            }
        } else {
            toast.error('fill the required fields')
        }
    }
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <form className='flex flex-col gap-3 justify-center items-center' onSubmit={handleSubmit}>

                <h1 className='text-3xl mb-5 font-bold tracking-wide underline'>Register as Admin </h1>

                {error && <p className='text-sm text-center w-full text-red-600'>
                    {error}
                </p>}

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

                <Input
                    id='password'
                    label='Confirm Password *'
                    type='password'
                    placeholder='confirm password'
                    value={formValue.cnfPassword}
                    onChange={e => setFormValue({ ...formValue, cnfPassword: e.target.value })}
                />

                <Button title={loading ? <Loader2 className='rotate' /> : 'Register'} type='submit' disabled={loading} />

                <p>Already have an account? <Link to='/login' className='hover:underline'>Login</Link></p>
            </form>
        </div>
    )
}
