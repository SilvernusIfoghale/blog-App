import express from "express";
import { Post } from "../model/postModel.js";
import { User } from "../model/userModel.js";
const postRoute = express.Router();

//CREATE POST
postRoute.post("/", async (req, res) => {
  console.log(req.body);
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CATEGORIES
postRoute.get("/cats", async (req, res) => {
  try {
    const distinctCategories = await Post.distinct("categories");
    res.status(200).json(distinctCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete post by Id
postRoute.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted successfully");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//UPDATE POST
postRoute.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //user._id && post.author
    console.log(req.params.id); //'669ea261edac468aedb6c99e'
    console.log(post._id); //'669ea261edac468aedb6c99e'
    console.log(post.author);
    console.log(req.body.username); //669ea1c2edac468aedb6c8fa
    if (post.author == req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (error) {
    res.status(500).json(err);
  }
});
//GET ONE POST
postRoute.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET ALL POSTS
postRoute.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      //find the user by username
      const user = await User.findOne({ username });
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      posts = await Post.find({ author: user._id }).populate(
        "author",
        "username profilePic"
      );
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      }).populate("author", "username profilePic");
    } else {
      posts = await Post.find().populate("author", "username profilePic");
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { postRoute };
