const express = require('express');
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// @desc    Create a new blog post
// @route   POST /api/blogs
// @access  Private
router.post('/', protect, upload.single('featuredImage'), createBlog);

// @desc    Get all blog posts (for dashboard)
// @route   GET /api/blogs
// @access  Private
router.get('/', protect, getAllBlogs);

// @desc    Get single blog post by ID (for editing)
// @route   GET /api/blogs/:id
// @access  Private
router.get('/:id', protect, getBlogById);

// @desc    Get single blog post by slug (for public view)
// @route   GET /api/blogs/slug/:slug
// @access  Public
router.get('/slug/:slug', getBlogBySlug);

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private
router.put('/:id', protect, upload.single('featuredImage'), updateBlog);

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private
router.delete('/:id', protect, deleteBlog);

module.exports = router;