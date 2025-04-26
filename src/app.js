import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Redirect from /& to /password
app.get('/&', (req, res) => {
  res.redirect('/password');
});

// Serve the /password page (where password input happens)
app.get('/password', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'app.html'));  // Serve the password page (app.html)
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
