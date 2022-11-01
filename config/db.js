import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const url = `${connection.connection.host}: ${connection.connection.port}`;
        console.log(`mongo deb connectado en , ${url}`)
        console.log(url)
    } catch (error) {
        console.log(`error: ${error.message}`)
        process.exit(1); //forzar que el proceso termine
    } 
} 
 
export default connectDb;