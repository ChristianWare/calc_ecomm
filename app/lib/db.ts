import mongoose from "mongoose";

// let connection: typeof mongoose;

// const url = "mongodb: //127.0.0.1:27017/next_ecom";

const startDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI!);
    console.log("MongoDB Connected");
  } catch (error) {
    throw new Error((error as any).message);
  }
};

export default startDb;
