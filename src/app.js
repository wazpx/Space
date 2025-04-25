import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middleware to parse form data from POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Redirect all specified routes to /password (to enforce password entry)
app.get(['/', '/g', '/a'], (req, res) => {
  res.redirect('/password'); // Always redirect to the /password page
});

// ✅ Serve the password page when visiting /password
app.get('/password', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'password.html'));
});

// ✅ Handle password form submission (POST /password)
app.post('/password', (req, res) => {
  const { password } = req.body;

  if (password === 'dimitri') {
    // ✅ Correct password: Redirect to the main page
    res.redirect('https://wazpx.vercel.app/&');
  } else {
    // ✅ Incorrect password: Redirect to Google Classroom
    res.redirect('https://classroom.google.com/?pli=1');
  }
});

// ✅ Catch-all route to force redirect all other paths to /password
app.get('*', (req, res) => {
  res.redirect('/password'); // Any other routes should be redirected to /password
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
