import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String, 
        required: true,
        unique: true,
    },  
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    musicPosts: [
      {type: Schema.Types.ObjectId, 
        ref: "MusicPost"} //references the MusicPost model
      ],
  },
);

const userModel = model("User", userSchema);

export default userModel; 