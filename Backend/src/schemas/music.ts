import { Schema, model } from "mongoose";

//Mongoose w infer types from the schema so we don't need to define types in an interface
//The schema is a blueprint for the data model
const musicSchema = new Schema(
  {
    trackName: {
      type: String,
      required: true,
    },
    trackLink: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      required: false,
    },
    recordedDate: {
      type: String,
      required: false,
    },
    coverArt: {
      type: String,
      required: false,
    },
    sourcedFrom: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: false,
    },
    availableForSale: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Number,
      required: false,
    },
    comment: {
      type: String,
      required: false,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // References the User model
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt timestamps
  }
);

// Create a model from the schema and exports it
// The model is used to perform CRUD operations on the database
// The model is a class with which we construct documents
const Music = model("Music", musicSchema);

export default Music;
