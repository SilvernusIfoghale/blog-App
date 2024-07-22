import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    desc: {
      type: String,
      require: true,
    },
    photo: {
      type: String,
      require: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    categories: {
      type: mongoose.Schema.Types.ObjectId,
      type: Array,
      require: false,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", PostSchema);
