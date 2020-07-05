const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const Users = require('../../models/Users')

// @route    POST api/post
// @desc     Create a post
// @access   Private
router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
]],  async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await Users.findById(req.user.id).select('-password')
        const newPost = new Post({
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id
        })

        await newPost.save()
       res.json(newPost)

    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

// @route    GET api/posts/:id
// @desc     Get by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).send('Post not found')
        }
        res.json(post)
    } catch (error) {
        if(error.name == 'CastError') {
            return res.status(404).send('Post not found')
        } 
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

// @route    DELETE api/posts
// @desc     delete a post 
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).send('Post not found')
        }

        if(post.user.toString() != req.user.id){
            return res.status(401).json({ msg: 'User not authorized'})
        }

        await post.remove()

        res.json({msg: 'Post Removed'})

    } catch (error) {
        if(error.name == 'CastError') {
            return res.status(404).send('Post not found')
        } 
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

// @route    PUT api/posts/like/:id
// @desc     like a post 
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post){ // check if post exist's
            return res.status(404).send('Post not found')
        }
        
        // check if post has already been liked
        if(post.likes.filter((like) => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({ msg: 'Post already liked'} )
        }

        post.likes.unshift({ user: req.user.id })

        await post.save()

        res.json(post.likes)

    } catch (error) {
        if(error.name == 'CastError') {
            return res.status(404).send('Post not found')
        } 
        console.error(error.message)
        res.status(400).send('Server Error')
    }
})

// @route    PUT api/posts/unlike/:id
// @desc     unlike a post 
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post){ // check if post exist's
            return res.status(404).send('Post not found')
        }
        
        // check if post has already been liked
        if(post.likes.filter((like) => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({ msg: 'Post already liked'} )
        }

        post.likes = post.likes.filter((like) => like.user.toString() != req.user.id )

        await post.save()

        res.json(post.likes)

    } catch (error) {
        if(error.name == 'CastError') {
            return res.status(404).send('Post not found')
        } 
        console.error(error.message)
        res.status(400).send('Server Error')
    }
})

module.exports = router

