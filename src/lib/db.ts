import mongoose from "mongoose";

export default async () => {
    const uri = process.env.MONGODB_URI
    if (!uri) {
        console.error("MONGODB_URI is not set: set the environment variable in .env")
        return
    }
    try {
        if (mongoose.connection.readyState == 0) {
            await mongoose.connect(uri)
        }
        console.log("Connection to MongoDB established!");
    }
    catch (err) {
        console.log("Connection to MongoDB failed: " + err);
    }
}