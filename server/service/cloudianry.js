import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

const uploadOnCloudinary = async (localPath) => {
    try {
        if (localPath) {
            const response = await cloudinary.uploader.upload(localPath, {
                folder: 'Employees',
                resource_type: 'auto',
                transformation: [
                    { quality: 'auto', format: 'webp' }
                ]
            })

            fs.unlinkSync(localPath)

            const url = response.url

            return url
        }
    } catch (error) {
        fs.unlinkSync(localPath)
        return { message: 'Error Uploading File', error: error.message }
    }
}

export default uploadOnCloudinary