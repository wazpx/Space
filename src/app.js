import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Serve the password page
app.get('/password', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'password.html'));
});

// ✅ Handle password submission
app.post('/check-password', (req, res) => {
  const { password } = req.body;

  if (password === 'dimitri') {
    res.redirect('https://wazpx.vercel.app/&');
  } else {
    res.redirect('https://classroom.google.com/?pli=1');
  }
});

// ✅ Catch-all GET requests: force redirect to /password
app.get('*', (req, res) => {
  if (req.path !== '/password') {
    res.redirect('/password');
  } else {
    res.sendFile(path.join(__dirname, 'public', 'password.html'));
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
