import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middleware to parse incoming request bodies (e.g., from forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to manage sessions (for authentication)
app.use(session({
  secret: 'super-secret-key', // You should change this to a secure secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set this to true if you're using https
}));

// 🔒 Middleware to protect all routes and force redirect to /password if not authenticated
app.use((req, res, next) => {
  // If the user is authenticated, allow access to the page
  if (req.session.authenticated) {
    return next(); // Allow the request to continue to the requested page
  }

  // If not authenticated, force redirect to /password
  res.redirect('/password');
});

// Serve the password page at /password
app.get('/password', (req, res) => {
  // Serve the password.html file when visiting /password
  res.sendFile(path.join(__dirname, 'public', 'password.html')); // Make sure password.html is in the public folder
});

// Handle the password form submission
app.post('/check-password', (req, res) => {
  const { password } = req.body; // Get the entered password

  // Check if the entered password is correct
  if (password === 'dimitri') {
    req.session.authenticated = true; // Mark the session as authenticated
    return res.redirect('/'); // Redirect to the main page after successful authentication
  } else {
    // Redirect to Google Classroom if the password is incorrect
    return res.redirect('https://classroom.google.com/?pli=1');
  }
});

// Serve static files (public assets, content, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Optional: Create a logout route to destroy the session
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/password'); // Redirect to the password page after logout
  });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
