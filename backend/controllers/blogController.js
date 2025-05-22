const Blog = require('../models/blogModel');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create new blog post
exports.createBlog = async (req, res) => {
  try {
    const { title, summary, content, seoTitle, seoDescription } = req.body;
    const slug = title.toLowerCase().replace(/ /g, '-');

    // Upload image to Cloudinary if exists
    let featuredImage;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      featuredImage = result.secure_url;
    }

    const blog = await Blog.create({
      title,
      slug,
      summary,
      content,
      featuredImage,
      seoTitle,
      seoDescription,
      seoKeywords: [
        "CBC Kenya",
        "CBC learning materials",
        "Grade 5-8 CBC notes",
        "Secondary school CBC curriculum",
        "CBC exams and revision papers",
        "CBC lesson plans for teachers",
        "CBC teacher training resources",
        "CBC assessment tools Kenya",
        "PP1, PP2, Grade 1-6 CBC resources",
        "CBC homework help Kenya",
        "Best CBC learning websites Kenya",
        "CBC projects and assignments guide",
        "How to help your child with CBC",
        "CBC digital learning platforms Kenya",
        "Free CBC revision materials PDF"
      ],
      author: req.user._id
    });

    res.status(201).json(blog);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ error: `${field} must be unique` });
    }
    res.status(400).json({ error: error.message });
  }
};

// Get all blogs (for dashboard)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .select('-content -__v');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get blog by ID (for editing)
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get blog by slug (for public view)
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update blog post
exports.updateBlog = async (req, res) => {
  try {
    const { title, summary, content, seoTitle, seoDescription } = req.body;
    const updateData = {
      title,
      summary,
      content,
      seoTitle,
      seoDescription
    };

    // Handle image upload if new image provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.featuredImage = result.secure_url;
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    res.status(400).json({ error: error.message });
  }
};

// Delete blog post
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Delete image from Cloudinary if exists
    if (blog.featuredImage) {
      const publicId = blog.featuredImage.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};