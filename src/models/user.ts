import mongoose, { Schema, Document } from "mongoose"

export interface IUser extends Document {
    firstName: string // user's first name
    lastName: string // user's last name
    email: string // user's email
    password: string // user's password used only in level 3 and beyond
    profilePicture?: string // pointer to user's profile picture in cloud storage --> used in Expert level
}

const schema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true }, 
    password: { type: String, required: true }, 
    profilePicture: { type: String, required: false }
})


export default mongoose.models.User || mongoose.model<IUser>("User", schema); 