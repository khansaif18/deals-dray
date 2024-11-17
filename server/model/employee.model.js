import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    mobileNo: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number']
    },
    designation: {
        type: String,
        required: true,
        enum: ['HR', 'Manager', 'Sales']
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    course: {
        type: [String],
        required: true,
        enum: ['MCA', 'BCA', 'BSC']
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });


const Employee = mongoose.model('Employee', employeeSchema)

export default Employee