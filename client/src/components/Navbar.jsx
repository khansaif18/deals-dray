import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useData } from '../context/ContextProvider'


export default function Navbar() {

    const { username, adminLogout } = useData()

    return (
        <nav className='flex items-center justify-around gap-5 p-4 w-full fixed top-0 bg-black z-50'>

            <div className='flex gap-5 items-center justify-center'>
                <NavLink className='font-bold text-xl' to='/' style={({ isActive }) => { return { color: isActive ? "red" : "" } }}>
                    Deals-Dray
                </NavLink>

                {
                    username && <>
                        <NavLink to='/employees' className='py-2 px-3 bg-[#131313] rounded-md'
                            style={({ isActive }) => { return { color: isActive ? "red" : "" } }}>
                            Employee List
                        </NavLink>

                        <NavLink to='/add-employee' className='py-2 px-3 bg-[#131313] rounded-md'
                            style={({ isActive }) => { return { color: isActive ? "red" : "" } }}>
                            Add Employee
                        </NavLink>
                    </>
                }

            </div>

            <div className='flex gap-5'>

                {
                    username && username ?
                        <div className='flex items-center justify-center gap-2'>
                            <h2> {username && username} - </h2>

                            <button onClick={async () => {
                                await adminLogout()
                            }}
                                className='py-2 px-3 bg-[#131313] rounded-md'>
                                Logout
                            </button>
                        </div> :

                        <Link> Login </Link>
                }

            </div>

        </nav>
    )
}
