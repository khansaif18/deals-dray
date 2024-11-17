import React, { useEffect, useState } from 'react'
import { useData } from '../context/ContextProvider'
import { useNavigate } from 'react-router-dom'
import { Loader2, SquarePen, Trash2 } from 'lucide-react'
import Delete from '../components/Delete'
import Search from '../components/Search'

export default function Employees() {

    const navigate = useNavigate()
    const { username, employees, deleteEmployee } = useData()

    const [filteredEmployees, setFilteredEmployees] = useState(employees);


    const [search, setSearch] = useState('')
    const [showDelete, setShowDelete] = useState(false)
    const [loading, setLoading] = useState(false)

    const localDate = (serverDate) => {
        const date = new Date(serverDate)
        const year = date.toLocaleString('en-US', { year: 'numeric' });
        const month = date.toLocaleString('en-US', { month: 'long' });
        const day = date.toLocaleString('en-US', { day: 'numeric' });

        return `${day}-${month.slice(0, 3)}-${year.slice(2, 4)}`
    }

    useEffect(() => {
        if (!username) {
            navigate('/')
        }
    }, [username])

    useEffect(() => {
        const searchResult = employees.filter(emp =>
            emp.name.toLowerCase().includes(search.toLowerCase()) ||
            emp.email.toLowerCase().includes(search.toLowerCase()) ||
            emp.mobileNo.toLowerCase().includes(search.toLowerCase()) 
        );
        setFilteredEmployees(searchResult);
    }, [search, employees]);


    return (
        <div className='w-full min-h-screen flex items-center flex-col pt-[6rem] overflow-y-scroll '>

            <div className='w-full flex item-center justify-around mb-2'>
                <h1 className='text-2xl mb-3 font-semibold underline'>Total Employees : {employees ? employees.length : 0}</h1>
                {
                    employees &&
                    <Search
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                }
            </div>

            {
                employees && employees.length > 0 ?
                    <table>
                        <thead>
                            <tr>
                                <th>Unique ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile No.</th>
                                <th>Designation</th>
                                <th>Gender</th>
                                <th>Course</th>
                                <th>Create Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredEmployees.map((employee, index) => (
                                    <tr key={index}>
                                        <td className='relative td'>
                                            <p className='empId'>{employee._id}</p>
                                            {employee._id.slice(0, 5) + '..'}
                                        </td>
                                        <td>
                                            <div className='h-[50px] w-[50px]'>
                                                <img src={employee.image} alt={employee.name} className='h-full w-full object-cover' />
                                            </div>
                                        </td>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.mobileNo}</td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.gender}</td>
                                        {employee.course && employee.course.map((course, idx) => (<td key={idx}>{course}</td>))}
                                        <td>{localDate(employee.createdAt)}</td>
                                        <td className='action '>
                                            <SquarePen
                                                size={16}
                                                className='cursor-pointer'
                                                onClick={() => {
                                                    navigate(`/edit-employee/${employee._id}`)
                                                }}
                                            />
                                            <span className='border h-[3.5rem] ' />
                                            <Trash2
                                                size={16}
                                                className='cursor-pointer'
                                                onClick={async () => setShowDelete(true)}
                                            />
                                        </td>
                                        {
                                            showDelete &&
                                            <Delete
                                                title={loading ? <Loader2 className='rotate' /> : 'Delete'}
                                                disabled={loading}
                                                handleCancel={() => setShowDelete(false)}
                                                handleDelete={async () => {
                                                    try {
                                                        setLoading(true)
                                                        await deleteEmployee(employee._id)
                                                    } catch (error) {

                                                    } finally {
                                                        setLoading(false)
                                                        setShowDelete(false)
                                                    }
                                                }}
                                            />
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table> : ''
            }



        </div >
    )
}
