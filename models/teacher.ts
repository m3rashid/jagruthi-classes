import mongoose from 'mongoose'

const TeacherTypes = ['coaching', 'home_tutor', 'both'] as const

export type TEACHER_TYPE = typeof TeacherTypes[number]

export interface ITeacher {
  name: string
  qualifications: string[]
  type: TEACHER_TYPE
  experience: number
  availableTimings: string[]
  feesPerStudent: number
  draft: boolean
  deleted: boolean
  bio?: string
}

const teacherSchema = new mongoose.Schema<ITeacher>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    qualifications: [
      {
        type: String,
        required: true,
      },
    ],
    type: {
      type: String,
      enum: TeacherTypes,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
      max: 60,
    },
    availableTimings: [
      {
        type: String,
        required: true,
      },
    ],
    feesPerStudent: {
      type: Number,
      required: true,
      min: 0,
      max: 10000,
    },
    draft: {
      type: Boolean,
      default: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      minlength: 10,
      maxlength: 5000,
    },
  },
  { timestamps: true }
)

export const Teacher =
  mongoose.models.Teacher || mongoose.model<ITeacher>('Teacher', teacherSchema)
