import mongoose, { Schema, Document } from "mongoose"

export interface IAnimal extends Document {
    name: string // animal's name
    hoursTrained: number // total number of hours the animal has been trained for
    owner: Schema.Types.ObjectId // id of the animal's owner
    dateOfBirth?: Date // animal's date of birth
    profilePicture?: string // pointer to animal's profile picture in cloud storage --> used in Expert level
}

const schema = new Schema<IAnimal>({
    name: { type: String, required: true },
    hoursTrained: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, required: true },
    dateOfBirth: { type: Date, required: false },
    profilePicture: { type: String, required: false }
})

export default mongoose.models.Animal || mongoose.model<IAnimal>("Animal", schema);