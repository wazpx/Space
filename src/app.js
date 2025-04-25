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
app.post('/', (req, res) => {
  const { password } = req.body;

  if (password === 'dimitri') {
    res.redirect('https://wazpx.vercel.app/&');
  } else {
    res.redirect('https://classroom.google.com/?pli=1');
  }
});

// ✅ Redirect EVERYTHING ELSE to /password
app.use((req, res) => {
  res.redirect('/password');
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
