import dotenv from 'dotenv'

dotenv.config()
export default {
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    DB: {
      URI: process.env.MONGODB_URI || 'mongodb+srv://epsi:QzzZ6WsBLSqHLyjX@cluster0.xsaxvmh.mongodb.net/?retryWrites=true&w=majority',
      USER: process.env.MONGODB_USER,
      PASSWORD: process.env.MONGODB_PASSWORD
    },
    aws_access_key_id : process.env.AWS_ACCESS_KEY_ID ?? "AKIAZY6HWSJDWF37VSMO",
    aws_secret_access_key : process.env.AWS_SECRET_ACCESS_KEY ?? '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',
    bucket_name: process.env.BUCKET_NAME ?? 'epsi'
  };