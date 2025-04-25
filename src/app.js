import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like password.html)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Redirect GET / to /password
app.get('/', (req, res) => {
  res.redirect('/password');
});

// ✅ Serve the password page
app.get('/password', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'password.html'));
});

// ✅ Handle password submission
app.post('/', (req, res) => {
  const { password } = req.body;

  if (password === 'dimitri') {
    // Redirect to Wazpx if correct
    return res.redirect('https://wazpx.vercel.app/&');
  } else {
    // Redirect to Google Classroom if wrong
    return res.redirect('https://classroom.google.com/?pli=1');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
