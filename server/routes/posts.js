import express from 'express';
import Post from '../models/Post.js';
const router = express.Router();

//ALL Posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        console.log(posts)
        res.json(posts)
    }catch(err){
        res.json({message:err})
    }
});

//Get specific post
router.get('/:postId', async (req,res) => {
    try{
        const post = await Post.findById(req.params.postId)
        res.json(post);
    }catch (err) {
        res.json({message:err})
    }
})

//Submits a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){
        res.json({message: err })
    }
})

//Delete Post
router.delete('/:postId', async (req,res) => {
    try{
        const removePost = await Post.remove({_id: req.params.postId })
        res.json(removePost)
    }catch(err){
        res.json({message: err })
    }
});

//Update
router.patch('/:postId', async (req,res) => {
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId }, 
            { $set : {title: req.body.title}}
        );
        res.json(updatedPost);
    }
    catch(err){
        res.json({message: err })
    }
})

export default router;