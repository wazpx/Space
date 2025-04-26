import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Redirect all routes to /password
app.get('*', (req, res) => {
  res.redirect('/password');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
