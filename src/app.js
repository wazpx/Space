import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middleware to parse incoming request bodies (e.g., from forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to manage sessions
app.use(session({
  secret: 'super-secret-key', // Change this to something more secure
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if you're using https
}));

// 🔒 Middleware to protect all routes and ask for the password immediately
app.use((req, res, next) => {
  if (req.session.authenticated) {
    return next(); // If authenticated, allow access to the route
  }

  // If not authenticated, show the password prompt directly
  const passwordPageHTML = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Password Protected</title>
        <style>
          /* Same styling from your previous request */
        </style>
      </head>
      <body>
        <form action="/check-password" method="POST">
          <div class="password-container">
            <h2>Enter Password</h2>
            <input type="password" name="password" class="password-input" placeholder="Password" autofocus required />
            <br>
            <button class="submit-btn" type="submit">Submit</button>
          </div>
        </form>
      </body>
    </html>
  `;
  res.send(passwordPageHTML); // Send the password page directly
});

// Handle password submission
app.post('/check-password', (req, res) => {
  const { password } = req.body;
  const originalUrl = req.session.originalUrl || '/'; // Store the original URL the user wanted

  if (password === 'dimitri') {
    req.session.authenticated = true; // Set the session to authenticated
    return res.redirect(originalUrl); // Redirect to the originally requested page
  } else {
    return res.redirect('https://classroom.google.com/?pli=1'); // Redirect if password is incorrect
  }
});

// Handle all routes and protect them
app.use((req, res, next) => {
  // Save the requested URL so we can redirect the user after login
  req.session.originalUrl = req.originalUrl;

  // If the user is not authenticated, they will be forced to the password page
  if (!req.session.authenticated) {
    return next(); // Force the password page if not authenticated
  }

  // Otherwise, serve static files
  return res.sendFile(path.join(__dirname, 'public', 'json', 'index.html'));
});

// Serve static files (or any other necessary files)
app.use(express.static(path.join(__dirname, 'public')));

// Optional: Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/'); // Redirect to login page after logout
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
