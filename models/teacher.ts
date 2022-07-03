import mongoose from 'mongoose'

export interface ITeacher {
  name: string
}

const teacherSchema = new mongoose.Schema<ITeacher>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export const Teacher =
  mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', teacherSchema)
