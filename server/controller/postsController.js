import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const limit = 8;
    const startIndex = (Number(page) - 1) * limit;
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getPost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const post = await PostMessage.findById(_id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({ ...post, creator: req.userId });
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  await PostMessage.deleteOne({ _id });

  res.json({ message: "delete successful" });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  console.log("in like post controller");

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  const post = await PostMessage.findById(_id);

  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const data = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
  res.json(data);
};
