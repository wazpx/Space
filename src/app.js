import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middleware to parse incoming request bodies (e.g. from forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to manage sessions
app.use(session({
  secret: 'super-secret-key', // Change this to something more secure
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if you're using https
}));

// 🔒 Middleware to protect everything except password and check-password routes
app.use((req, res, next) => {
  // If the user is authenticated, or if they're accessing /password or /check-password, let them through
  if (req.session.authenticated || req.path === '/password' || req.path === '/check-password') {
    return next(); // Proceed to the next middleware or route handler
  }
  // If not authenticated, redirect to /password
  res.redirect('/password');
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Show the password page (login form)
app.get('/password', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'json', 'password.html'));
});

// Handle password submission (checking the password)
app.post('/check-password', (req, res) => {
  const { password } = req.body;
  if (password === 'dimitri') {
    req.session.authenticated = true; // Set session variable to indicate the user is logged in
    return res.redirect('/'); // Redirect to the main page
  } else {
    return res.redirect('https://classroom.google.com/?pli=1'); // Redirect if password is incorrect
  }
});

// Optional: Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/password'); // Redirect to login page after logout
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
