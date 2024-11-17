import { Router } from "express";
import Employee from "../model/employee.model.js";
import upload from "../middleware/fileUpload.js";
import uploadOnCloudinary from "../service/cloudianry.js";

const employeeRoute = Router()


employeeRoute.get('/', async (req, res) => {
    try {

        const employees = await Employee.find({})

        if (employees) {
            return res.status(200).json({ message: 'Fetched all employees', employees })
        }

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message })
    }
})



employeeRoute.post('/register', upload.single('image'), async (req, res) => {
    const { name, email, mobileNo, designation, gender, course } = req.body;
    const imageFile = req.file;

    try {

        if (!name || !email || !mobileNo || !designation || !gender || !course || !imageFile) {
            return res.status(400).json({ message: 'Provide all required fields' });
        }

        const selectedCourses = Array.isArray(course) ? course : [course];
        const allowedCourses = ['MCA', 'BCA', 'BSC'];
        if (!selectedCourses.every(c => allowedCourses.includes(c))) {
            return res.status(400).json({ message: 'Invalid courses selected' });
        }

        const isEmailTaken = await Employee.findOne({ email });
        const isMobileNoTaken = await Employee.findOne({ mobileNo });
        if (isEmailTaken || isMobileNoTaken) {
            return res.status(409).json({
                message: isEmailTaken ? 'Email is already taken' : 'Phone Number is already taken'
            });
        }

        const cloudinaryUrl = await uploadOnCloudinary(imageFile.path);
        if (!cloudinaryUrl || cloudinaryUrl.error) {
            return res.status(500).json({ message: 'Error uploading image to Cloudinary', error: cloudinaryUrl.error });
        }

        const employee = await Employee.create({
            name,
            email,
            mobileNo,
            designation,
            gender,
            course: selectedCourses,
            image: cloudinaryUrl
        });

        if (employee) {
            return res.status(201).json({ message: 'Employee registered', employee });
        }

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});


employeeRoute.put('/update/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, email, mobileNo, designation, course } = req.body;
    const image = req.file;

    try {
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if (email || mobileNo) {
            const isEmailMobileAvailable = await Employee.findOne({
                $or: [
                    { email: email || employee.email },
                    { mobileNo: mobileNo || employee.mobileNo }
                ],
                _id: { $ne: id }
            })
            if (isEmailMobileAvailable) {
                return res.status(409).json({ message: 'Email or Phone Number is already taken' });
            }
        }

        let imageUrl = '';
        if (image) {
            imageUrl = await uploadOnCloudinary(image.path);
            if (!imageUrl || imageUrl.error) {
                return res.status(500).json({ message: 'Error uploading image to Cloudinary', error: imageUrl.error });
            }
        }

        const updateFields = { name, email, mobileNo, designation, course };
        for (const key in updateFields) {
            if (updateFields[key]) {
                employee[key] = updateFields[key];
            }
        }
        if (imageUrl) employee.image = imageUrl;

        const updatedEmployee = await employee.save();

        return res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
})


employeeRoute.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    try {

        await Employee.findByIdAndDelete(id)

        const employees = await Employee.find({})

        return res.status(201).json({ message: 'Employee deleted', employees })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
})



export default employeeRoute