import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Force redirect to /password if visiting any of these routes
app.get(['/', '/g', '/a'], (req, res) => {
  res.redirect('/password'); // Always redirect to the /password page
});

// ✅ Serve the password page (this will show the password form)
app.get('/password', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'password.html'));
});

// ✅ Handle password submission directly on the same route
app.post('/password', (req, res) => {
  const { password } = req.body;

  if (password === 'dimitri') {
    // If the password is correct, redirect to the main site
    res.redirect('https://wazpx.vercel.app/&');
  } else {
    // If the password is incorrect, redirect to Google Classroom
    res.redirect('https://classroom.google.com/?pli=1');
  }
});

// ✅ Catch-all: Force redirect everything else to /password (i.e., initial visit will always go to password page)
app.get('*', (req, res) => {
  res.redirect('/password'); // Any other routes should be redirected to /password
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
