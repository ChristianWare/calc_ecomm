import mongoose from "mongoose";

const startDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI!);
    console.log("MongoDB Connected");
  } catch (error) {
    throw new Error("Connection Failed");
  }
};

export default startDb;
