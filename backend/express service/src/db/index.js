import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error ", error);
    process.exit(1);
  }
};

export default connectDB;
