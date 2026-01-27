const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

/* ----------------------------------
   Enable CORS
----------------------------------- */
app.use(cors({
  origin: '*',              // allow all origins (for practice)
  methods: ['GET']
}));

/* ----------------------------------
   Serve static images
----------------------------------- */
app.use('/img', express.static(path.join(__dirname, 'img')));

/* ----------------------------------
   Generic Folder Reader API
   /api/images?folder=particular
----------------------------------- */
app.get('/api/images', async (req, res) => {
  try {
    const folder = req.query.folder;

    // Validate input
    if (!folder || folder.includes('..') || folder.includes('/')) {
      return res.status(400).json({ error: 'Invalid folder name' });
    }

    const baseDir = path.join(__dirname, 'img');
    const dirPath = path.join(baseDir, folder);

    // Read folder
    const files = await fs.readdir(dirPath);

    // Filter image files
    const images = files.filter(file =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    res.json(images);
  } catch (err) {
    res.status(404).json({ error: 'Folder not found' });
  }
});

/* ----------------------------------
   Start server
----------------------------------- */
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
