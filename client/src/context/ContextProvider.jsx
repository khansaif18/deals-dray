import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DataContext = createContext()

export const useData = () => {
    return useContext(DataContext)
}

export default function ContextProvider({ children }) {

    const API = import.meta.env.VITE_BACKEND_API
    const navigate = useNavigate()

    const [username, setUsername] = useState(null)
    const [employees, setEmployees] = useState(null)
    const [error, setError] = useState('')
    const [load, setLoad] = useState(false)


    // Emmployee related API Calls

    const getAllEmployees = async () => {
        setLoad(true)
        return axios.get(`${API}/employee`, { withCredentials: true })
            .then(res => {
                setEmployees(res.data.employees)
                setLoad(false)
            })
            .catch(err => {
                setEmployees(null)
                setLoad(false)
            })
    }

    const addNewEmployee = async (data) => {
        setError('')
        return await axios.post(`${API}/employee/register`, data, { withCredentials: true })
            .then(res => {
                getAllEmployees()
                navigate('/employees')
                toast.success(res.data.message)
            })
            .catch(err => {
                toast.error(err.response.data.message)
                setError(err?.response?.data?.error)
            })
    }

    const updateEmployee = async (empId, data) => {
        setError('')
        return axios.put(`${API}/employee/update/${empId}`, data, { withCredentials: true })
            .then(res => {
                getAllEmployees()
                toast.success(res.data.message)
                navigate('/employees')
            })
            .catch(err => {
                toast.error(err.response.data.message)
                setError(err?.response?.data?.error)
            })
    }

    const deleteEmployee = async (employeeId) => {
        try {
            if (employeeId) {
                return await axios.delete(`${API}/employee/delete/${employeeId}`, { withCredentials: true })
                    .then(res => {
                        getAllEmployees()
                        toast.success(res?.data?.message)
                    })
                    .catch(err => {
                        toast.error(err?.response?.data?.message || 'Error Deleting the Employee')
                    })
            }
        } catch (error) {
            toast.error(err?.response?.data?.message || 'Error Deleting the Employee')
        }
    }

    // Admin related API Calls

    const getAdminInfo = async () => {
        return axios.get(`${API}/admin`, { withCredentials: true })
            .then(res => {
                setUsername(res.data.username)
                getAllEmployees()
                navigate('/')
            })
            .catch(err => {
                setUsername(null)
            })
    }

    const adminLogin = async (username, password) => {
        return axios.post(`${API}/admin/login`, { username, password }, { withCredentials: true })
            .then(res => {
                toast.success(res.data.message)
                getAdminInfo()
            })
            .catch(err => {
                toast.error(err.response.data.message)
            })
    }

    const adminRegister = async (username, password) => {
        return await axios.post(`${API}/admin/register`, { username, password }, { withCredentials: true })
            .then(() => {
                adminLogin(username, password)
            })
            .catch(err => {
                toast.error(err?.response?.data?.message)
                setError(err?.response?.data?.error)
            })
    }

    const adminLogout = async () => {
        return toast.promise(
            axios.get(`${API}/admin/logout`, { withCredentials: true }),
            {
                loading: 'Logging out...',
                success: (res) => {
                    getAdminInfo()
                    return res.data.message;
                },
                error: (err) => {
                    return err.response?.data?.message || 'An error occurred';
                }
            }
        );
    };


    useEffect(() => { getAdminInfo() }, [])

    const values = { employees, addNewEmployee, updateEmployee, deleteEmployee, username, adminLogin, adminRegister, adminLogout, error, load }

    return (
        <DataContext.Provider value={values}>
            {children}
        </DataContext.Provider>
    )
}
