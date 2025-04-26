import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'some-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // use true if you're using HTTPS
}));

// Middleware to check if user is authenticated
app.use((req, res, next) => {
  const publicPaths = ['/password', '/submit-password'];
  if (req.session.authenticated || publicPaths.includes(req.path)) {
    return next();
  }
  return res.redirect('/password');
});

// Serve password.html
app.get('/password', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'password.html'));
});

// Handle password submission
app.post('/submit-password', (req, res) => {
  const { password } = req.body;
  if (password === 'dimitri') {
    req.session.authenticated = true;
    return res.redirect('/'); // redirect to homepage or wherever you want
  } else {
    return res.redirect('https://classroom.google.com/?pli=1');
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

