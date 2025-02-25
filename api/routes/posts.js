const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcrypt')
const Comment = require('../models/Comment')

// CREATE POST
router.post('/', async (req, res) => {
	const newPost = await new Post(req.body)
	try {
		const savedPost = await newPost.save()
		res.status(200).json(savedPost)
	} catch (err) {
		res.status(500).json(err)
	}
})

// UPDATE POST
router.put('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (post.userId === req.body.userId || req.body.admin) {
			try {
				const updatedPost = await Post.findByIdAndUpdate(
					req.params.id,
					{
						$set: {
							title: req.body.title,
							desc: req.body.desc,
							categories: req.body.categories,
						},
					},
					{ new: true }
				)
				res.status(200).json(updatedPost)
			} catch (err) {
				res.status(500).json(err)
			}
		} else {
			res.status(401).json('You can update only your post!')
		}
	} catch (err) {
		res.status(500).json(err)
	}
})

// DELETE POST
router.delete('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (post.userId === req.body.userId || req.body.admin) {
			try {
				await Comment.deleteMany({ postId: req.params.id })
				await post.delete()
				res.status(200).json('Post has been deleted')
			} catch (err) {
				res.status(500).json(err)
			}
		} else {
			res.status(401).json('You can delete only your post!')
		}
	} catch (err) {
		res.status(500).json(err)
	}
})

// GET POST
router.get('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		res.status(200).json(post)
	} catch (err) {
		res.status(500).json(err)
	}
})

// GET ALL POST
router.get('/', async (req, res) => {
	const userId = req.query.userId
	const catName = req.query.cat

	try {
		let posts
		if (userId) {
			posts = await Post.find({ userId })
		} else if (catName) {
			posts = await Post.find({
				categories: {
					$in: [catName],
				},
			})
		} else {
			posts = await Post.find()
		}
		res.status(200).json(posts)
	} catch (err) {
		res.status(500).json(err)
	}
})

module.exports = router
