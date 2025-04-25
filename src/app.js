import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like password.html)
app.use(express.static(path.join(__dirname, 'public')));

// 🔁 Catch-all: Redirect ANY GET request to /password
app.get('*', (req, res) => {
  res.redirect('/password');
});

// ✅ Password check on POST /
app.post('/', (req, res) => {
  const { password } = req.body;

  if (password === 'dimitri') {
    // ✔ Correct password: send to Wazpx
    return res.redirect('https://wazpx.vercel.app/&');
  } else {
    // ❌ Wrong password: send to Google Classroom
    return res.redirect('https://classroom.google.com/?pli=1');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
