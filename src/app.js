import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Password check on POST /
app.post('/', (req, res) => {
  const { password } = req.body;

  if (password === 'dimitri') {
    return res.redirect('https://wazpx.vercel.app/&');
  } else {
    return res.redirect('https://classroom.google.com/?pli=1');
  }
});

// ✅ Serve the password page
app.get('/password', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'password.html'));
});

// ✅ Force all other GET routes to redirect to /password
app.get('*', (req, res) => {
  res.redirect('/password');
});

// ✅ Serve static files (after everything else)
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
