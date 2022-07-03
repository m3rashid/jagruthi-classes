import mongoose from 'mongoose'

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return
  }
  await mongoose.connect('mongodb://localhost:27017/jagruthi-classes')
}

export default connectDb
