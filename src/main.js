import express from "express";
import "./db.js";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
} from "./db.js";

const app = express();
const port = 5000;

app.get("/posts", async (req, res) => {
  try {
    const allRows = await getAllPosts();
    res.status(200).json({ data: allRows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/posts/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await getPostById(postId);
    if (post.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const newPost = req.body;
    const createdPost = await createPost(newPost);
    res.status(201).json({ data: createdPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/posts/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const postUpdates = req.body;
    const updatedPost = await updatePostById(postId, postUpdates);
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    } else {
      res.status(200).json({ data: updatedPost });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/posts/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const result = await deletePostById(postId);
    if (!result) {
      return res.status(404).json({ message: "Post not found" });
    } else {
      res.status(204).json({ message: "Post deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});
