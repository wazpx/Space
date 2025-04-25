import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Serve the password page (force go to /password on initial visit)
app.get(['/','/g','/a'], (req, res) => {
  res.redirect('/password'); // Redirect these paths to the password page
});

// ✅ Serve the password page
app.get('/password', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'password.html'));
});

// ✅ Handle password submission directly (no /check-password)
app.post('/', (req, res) => {
  const { password } = req.body;

  if (password === 'dimitri') {
    // Redirect to the correct URL if password is correct
    res.redirect('https://wazpx.vercel.app/&');
  } else {
    // Redirect to Google Classroom if password is incorrect
    res.redirect('https://classroom.google.com/?pli=1');
  }
});

// ✅ Catch-all: Force redirect everything else to /password (i.e., initial visit will always go to password page)
app.get('*', (req, res) => {
  res.redirect('/password');
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
