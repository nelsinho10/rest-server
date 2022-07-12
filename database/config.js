import mongoose from 'mongoose'

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
        throw new Error('Error launching database connection')
    }
}
