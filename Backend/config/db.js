import mongoose from "mongoose";
// simply connecting to the database
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected sucessfully to MongoDB");
  } catch (error) {
    console.log("an error occured loading the database: ", error.message);
  }
};
