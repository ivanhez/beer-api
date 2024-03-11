import express from 'express'
import cors from 'cors'

import {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
} from './db.js'

const app = express()
const port = 15177

app.use(cors())

const validatePost = (req, res, next) => {
  const {
    beer_name, beer_type, flavors, abv, ibu, brewery,
  } = req.query
  if (!beer_name) {
    return res.status(400).json({ message: 'Beer name is required' })
  }
  next()
}

app.get('/posts', async (req, res) => {
  try {
    const allRows = await getAllPosts()
    res.status(200).json({ data: allRows })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params
    const post = await getPostById(postId)
    if (post.length === 0) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(200).json({ data: post })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/posts', validatePost, async (req, res) => {
  try {
    const newPost = req.query
    const createdPost = await createPost(newPost)
    res.status(201).json({ data: createdPost })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params
    const postUpdates = req.query
    const updatedPost = await updatePostById(postId, postUpdates)
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(200).json({ data: updatedPost })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.delete('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params
    const result = await deletePostById(postId)
    if (!result) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(204).json({ message: 'Post deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.use((req, res) => {
  res.status(501).json({ message: 'Endpoint not implemented' })
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
