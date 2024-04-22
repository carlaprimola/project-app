import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true, //quita espacios
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, //email unico
    },
    password: {
        type: String,
        required: true,
    },
    tipoRol: {
        type: String,        
        default: "user",
        enum: ["user", "admin"],
    },
 }, {
        timestamps: true,
    }
)

export default mongoose.model("User", userSchema);