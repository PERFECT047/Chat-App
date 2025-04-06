import mongoose from 'mongoose'

export const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MOGODB_URI)
        console.log(`MongoDB connection established successfully : ${conn.connection.host}`)
    }
    catch( err ){
        console.log(`MongoDB connection failed : ${err}`)
    }
}