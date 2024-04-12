import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://carla:123@cluster0.yxcgqr7.mongodb.net/todo")
    console.log("🎉 Conectado a MongoDB");
  } catch (error) {
    console.log("❌ Error al conectar a MongoDB", error);
  }
};

export default connectDB;



