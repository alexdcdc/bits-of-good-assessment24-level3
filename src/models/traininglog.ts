import mongoose, { Schema, Document } from "mongoose"

export interface ITrainingLog extends Document {
    date: Date // date of training log
    description: string // description of training log
    hours: number // number of hours the training log records
    animal: Schema.Types.ObjectId // animal this training log corresponds to
    user: Schema.Types.ObjectId // user this training log corresponds to
    trainingLogVideo?: string // pointer to training log video in cloud storage --> used in Expert level
}

const schema = new Schema<ITrainingLog>({
    date: { type: Date, required: true },
    description: { type: String, required: true },
    hours: { type: Number, required: true },
    animal: { type: Schema.Types.ObjectId, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    trainingLogVideo: { type: String, required: false }
})

export default mongoose.models.TrainingLog || mongoose.model<ITrainingLog>("TrainingLog", schema);