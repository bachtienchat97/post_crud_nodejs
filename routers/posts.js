const express = require('express');
const router = express.Router();

//load model
const Post = require('../model/Post');

//display all posts
router.get('/', async (req,res) => {
  const posts = await Post.find().lean().sort({date: -1})
  res.render('posts/displayPost', {posts})
})
//display form to create new post
router.get('/add', (req,res) => {
  res.render('posts/add')
});

//create new post
router.post('/', async (req,res) => {
  const { title, text } = req.body
  
  let errors = [];

  if(!title) errors.push({msg: 'Title required'})
  if(!text) errors.push({msg: 'Text required'})
  if(errors.length > 0) res.render('posts/add', {title, text})
  else {
    const newPostData = { title, text }
    const newPost = new Post(newPostData)
    await newPost.save()
    res.redirect('/posts')
  }
})

//display form to user edit post
router.get('/edit/:id', async (req,res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id }).lean()
    res.render('posts/edit', { post })
    
  } catch (error) {
    console.log(error, 'mes')
  }
})

// update modifier post into database
router.put('/:id', async (req,res) => {
  try {
    const { title, text } = req.body;
    await Post.findOneAndUpdate({_id: req.params.id}, { title, text })
    res.redirect('/posts')
  } catch (error) {
    console.log(error, 'error')
  }
})

//delete post 
router.delete('/:id', async (req,res) => {
  try {
    await Post.findOneAndRemove({_id: req.params.id})
    res.redirect('/posts')
  } catch (error) {
    console.log(error, 'error')
  }
})
module.exports = router;