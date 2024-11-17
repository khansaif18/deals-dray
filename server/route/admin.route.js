import { Router } from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../model/admin.model.js'
import validateToken from '../middleware/validateToken.js'

const adminRoute = Router()

adminRoute.get('/', validateToken, async (req, res) => {
    try {
        const id = req.admin.id
        const admin = await Admin.findById(id)

        if (admin) {
            return res.status(200).json({ username: admin.username })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message })
    }
})

adminRoute.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {

        if (!username || !password) {
            return res.status(401).json({ message: 'Provide the required fields' })
        }

        const admin = await Admin.findOne({ username })
        if (!admin) {
            return res.status(404).json({ message: 'Invalid username or password' })
        }

        const isPasswordValid = await bcryptjs.compare(password, admin.password)
        if (!isPasswordValid) {
            return res.status(404).json({ message: 'Invalid username or password' })
        }

        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET)

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ message: 'Logged in as admin' })

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message })
    }
})


adminRoute.post('/register', async (req, res) => {
    const { username, password } = req.body
    try {

        if (!username || !password) {
            return res.status(403).json({ message: 'Provide the required fields' })
        }

        const isUsernameAvailable = await Admin.findOne({ username })

        if (isUsernameAvailable) {
            return res.status(409).json({ message: 'This username is taken, try another' })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        const admin = await Admin.create({
            username,
            password: hashedPassword
        })

        if (admin) {
            return res.status(201).json({ message: 'Admin registered', username: admin.username })
        }

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message })
    }
})

adminRoute.get('/logout', (req, res) => {
    try {
        res.set('Cache-Control', 'no-store');

        res.cookie('token', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 0
        });

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Backend is down', error: error.message });
    }
});

export default adminRoute