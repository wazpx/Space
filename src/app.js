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
  secret: 'super-secret-key', // Change this!
  resave: false,
  saveUninitialized: true
}));

// 🔒 Middleware to protect everything except password and check-password routes
app.use((req, res, next) => {
  if (
    req.session.authenticated || 
    req.path === '/password' || 
    req.path === '/check-password'
  ) {
    return next();
  }
  res.redirect('/password');
});

// Serve static files (once authenticated)
app.use(express.static(path.join(__dirname, 'public')));

// Show the password page
app.get('/password', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'json', 'password.html'));
});

// Handle password submission
app.post('/check-password', (req, res) => {
  const { password } = req.body;
  if (password === 'dimitri') {
    req.session.authenticated = true;
    return res.redirect('/');
  } else {
    return res.redirect('https://classroom.google.com/?pli=1');
  }
});

// Optional: Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/password');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
