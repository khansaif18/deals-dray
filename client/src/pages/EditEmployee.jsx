import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useData } from '../context/ContextProvider'
import Button from '../components/Button'
import { Loader2 } from 'lucide-react'
import Input from '../components/Input'
import toast from 'react-hot-toast'

export default function EditEmployee() {
    const [emp, setEmp] = useState(null)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [designation, setDesignation] = useState('')
    const [gender, setGender] = useState('')
    const [course, setCourse] = useState([])
    const [image, setImage] = useState(null)

    const [loading, setLoading] = useState(false)

    const { empId } = useParams()
    const { employees, error, updateEmployee } = useData()

    useEffect(() => {
        if (employees) {
            const employee = employees.find(emp => emp._id === empId)
            setEmp(employee)
            setName(employee.name)
            setEmail(employee.email)
            setNumber(employee.mobileNo)
            setDesignation(employee.designation)
            setGender(employee.gender)
            setCourse(employee.course)
        }
    }, [])


    const handleCourseChange = (e) => {
        const { value, checked } = e.target
        if (checked) {
            setCourse(prev => [...prev, value])
        } else {
            setCourse(prev => prev.filter(crs => crs !== value))
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()

        if (name) formData.append('name', name)
        if (email) formData.append('email', email)
        if (number) formData.append('mobileNo', number)
        if (designation) formData.append('designation', designation)
        if (gender) formData.append('gender', gender);
        if (course) formData.append('course', course);
        if (image) formData.append('image', image)

        try {
            setLoading(true)
            await updateEmployee(emp._id, formData)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full min-h-screen flex items-center justify-center py-[5rem] z-0'>
            <form className='flex flex-col items-center justify-center w-full ' onSubmit={handleSubmit} encType='multipart/form-data'>

                <h1 className='text-3xl underline font-bold pb-4'>Edit Details of : {emp && emp.name}</h1>
                {error && <p className='text-sm text-center w-full text-red-600'>
                    {error}
                </p>}

                <div>
                    <Input
                        label='Employee Name'
                        type='text'
                        placeholder=' name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    <Input
                        label='Employee Email'
                        type='email'
                        placeholder=' email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <Input
                        label='Mobile Number'
                        type='tel'
                        placeholder=' number'
                        value={number}
                        onChange={e => setNumber(e.target.value)}
                    />
                </div>

                <div className="designation flex flex-col w-[20rem] my-2 gap-2 ">
                    <label htmlFor="designation" className="text-base font-medium text-white/60">Designation</label>
                    <select id="designation" value={designation} onChange={e => setDesignation(e.target.value)} className='bg-transparent rounded-md border text-white border-gray-300 px-3 py-2 text-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1'>
                        <option className='bg-black text-base font-medium text-white/60' value="" disabled>Select Designation</option>
                        <option className='bg-black text-base font-medium text-white/60' value="HR">HR</option>
                        <option className='bg-black text-base font-medium text-white/60' value="Manager">Manager</option>
                        <option className='bg-black text-base font-medium text-white/60' value="Sales">Sales</option>
                    </select>
                </div>

                <div className="gender flex flex-col w-[20rem] my-2 gap-2">
                    <label className="text-base font-medium text-white/60">Gender</label>
                    <div className='flex justify-evenly bg-transparent rounded-md border text-white border-gray-300 px-3 py-2 text-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1'>
                        <label>
                            <input
                                type="radio"
                                name='gender'
                                value='Male'
                                checked={gender === "Male"}
                                onChange={e => setGender(e.target.value)}
                                className='mr-1'
                            />
                            Male
                        </label>

                        <label>
                            <input
                                type="radio"
                                name='gender'
                                value='Female'
                                checked={gender === "Female"}
                                onChange={e => setGender(e.target.value)}
                                className='mr-1'
                            />
                            Female
                        </label>
                    </div>
                </div>

                <div className="course flex flex-col w-[20rem] my-2 gap-2">
                    <label className="text-base font-medium text-white/60">Course</label>
                    <div className='flex justify-evenly bg-transparent rounded-md border text-white border-gray-300 px-3 py-2 text-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1'>
                        <label>
                            <input
                                type="checkbox"
                                value='MCA'
                                checked={course.includes('MCA')}
                                onChange={handleCourseChange}
                                className='mr-1'
                            />
                            MCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value='BCA'
                                checked={course.includes('BCA')}
                                onChange={handleCourseChange}
                                className='mr-1'
                            />
                            BCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value='BSC'
                                checked={course.includes('BSC')}
                                onChange={handleCourseChange}
                                className='mr-1'
                            />
                            BSC
                        </label>
                    </div>
                </div>

                <div className="image flex flex-col w-[20rem] my-2 gap-2">
                    <label className="text-base font-medium text-white/60 " htmlFor="image">Image</label>
                    <input
                        type="file"
                        name='image'
                        id='image'
                        accept="image/png, image/jpeg"
                        className='flex justify-evenly bg-transparent rounded-md border text-white border-gray-300 px-3 py-2 text-md placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1'
                        onChange={e => {
                            const selectedFile = e.target.files[0]
                            setImage(selectedFile)
                        }}
                    />
                </div>

                <Button title={loading ? <Loader2 className='rotate' /> : 'Update Employee'} type='submit' disabled={loading} />
            </form>
        </div>
    )
}
