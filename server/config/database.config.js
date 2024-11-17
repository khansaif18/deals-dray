import mongoose from "mongoose";

const connectDatabase = async () => {
    return mongoose.connect(process.env.DATABSE_URI)
        .then(() => console.log('MongoDB Database Connected'))
        .catch((err) => console.log('MongoDB Database Connection Error : ', err.message))
}

export default connectDatabase