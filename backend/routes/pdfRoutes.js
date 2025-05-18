const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PDF = require('../models/pdfModel'); // Assuming you have a PDF MongoDB model

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// File type validation (Only PDFs)
const fileFilter = (req, file, cb) => {
  const fileTypes = /pdf/; // Accept only PDF files
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'));
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
});

// GET all PDFs
router.get('/api/admin/pdfs', async (req, res) => {
  try {
    const pdfs = await PDF.find();
    res.status(200).json(pdfs);
  } catch (error) {
    console.error('Error fetching PDFs:', error.message);
    res.status(500).json({ message: 'Error fetching PDFs', error: error.message });
  }
});

// POST a new PDF
router.post('/api/admin/pdfs', upload.single('pdf'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded!' });
  }

  const newPDF = new PDF({
    name: req.file.originalname,
    path: req.file.path,
  });

  try {
    const savedPDF = await newPDF.save();
    res.status(201).json({
      message: 'PDF uploaded successfully!',
      pdf: savedPDF,
    });
  } catch (error) {
    console.error('Error saving PDF:', error.message);
    res.status(500).json({ message: 'Error saving PDF', error: error.message });
  }
});

// DELETE a PDF
router.delete('/api/admin/pdfs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pdf = await PDF.findById(id);
    if (!pdf) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    // Delete the file from the server
    fs.unlink(path.join(__dirname, '..', pdf.path), async (err) => {
      if (err) {
        console.error('Error deleting file from server:', err.message);
        return res.status(500).json({ message: 'Error deleting file', error: err.message });
      }

      // Delete the record from the database
      await pdf.remove();
      res.status(200).json({ message: 'PDF deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting PDF:', error.message);
    res.status(500).json({ message: 'Error deleting PDF', error: error.message });
  }
});

// PUT (Replace) an existing PDF
router.put('/api/admin/pdfs/:id', upload.single('pdf'), async (req, res) => {
  const { id } = req.params;

  try {
    const pdf = await PDF.findById(id);
    if (!pdf) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    // Delete the old file from the server
    fs.unlink(path.join(__dirname, '..', pdf.path), async (err) => {
      if (err) {
        console.error('Error deleting old file from server:', err.message);
        return res.status(500).json({ message: 'Error deleting old file', error: err.message });
      }

      // Update the PDF with new file details
      pdf.name = req.file.originalname;
      pdf.path = req.file.path;

      try {
        const updatedPDF = await pdf.save();
        res.status(200).json({
          message: 'PDF replaced successfully!',
          pdf: updatedPDF,
        });
      } catch (error) {
        console.error('Error updating PDF:', error.message);
        res.status(500).json({ message: 'Error updating PDF', error: error.message });
      }
    });
  } catch (error) {
    console.error('Error finding PDF:', error.message);
    res.status(500).json({ message: 'Error finding PDF', error: error.message });
  }
});

module.exports = router;