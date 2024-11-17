import jwt from 'jsonwebtoken'

const validateToken = async (req, res, next) => {
    const token = req.cookies.token
    try {
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized access, Please Login' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        req.admin = { id: decodedToken.adminId };
        
        next()

    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Access token expired. Please log in again.' });
        }

        else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid access token.' });
        }

        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export default validateToken