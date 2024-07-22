import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// const userSchema = new mongoose.Schema(
//   {
//     username: { type: String, required: true },
//     email: { type: String, unique: true, required: true },
//     password: { type: String, required: true },
//     gender: { type: String, default: "" },
//     role: { type: String, default: "USER" },
//   },
//   {
//     timestamps: true,
//   }
// );
// const postSchema = new mongoose.Schema(
//   {
//     desc: { type: String, max: 500 },
//     img: { type: String },
//     likes: { type: Array, default: [] },
//     comments: { type: Array, default: [] },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

export const User = mongoose.model("User", userSchema);

// export const Post = mongoose.model("Post", postSchema);
