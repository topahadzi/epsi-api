import dotenv from 'dotenv'

dotenv.config()
export default {
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    DB: {
      URI: process.env.MONGODB_URI || 'mongodb+srv://epsi:QzzZ6WsBLSqHLyjX@cluster0.xsaxvmh.mongodb.net/?retryWrites=true&w=majority',
      USER: process.env.MONGODB_USER,
      PASSWORD: process.env.MONGODB_PASSWORD
    }
  };