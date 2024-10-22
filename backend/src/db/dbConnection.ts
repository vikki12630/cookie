import mongoose from "mongoose";

// type ConnectionObject = {
//   isConnected?: number;
// };

// const connection: ConnectionObject = {}

const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI as string);
    console.log("MONGO DB CONNECTED");
  } catch (error) {
    console.log("MONGO DB CONNECTION FAILED", error);

    process.exit(1);
  }
};

export default dbConnect;
