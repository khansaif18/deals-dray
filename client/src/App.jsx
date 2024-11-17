import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Employees from './pages/Employees'
import AddEmployee from './pages/AddEmployee'
import CheckboxForm from './components/Form'
import EditEmployee from './pages/EditEmployee'
import Signup from './pages/Signup'


export default function App() {
  return (
    <div className='bg-black/90 text-white min-h-screen'>
      <Toaster position='top-center' reverseOrder={false} toastOptions={{ duration: 3000 }} />
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/add-employee' element={<AddEmployee />} />
        <Route path='/edit-employee/:empId' element={<EditEmployee />} />
      </Routes>
    </div>
  )
}
