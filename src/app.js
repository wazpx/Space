import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public'))); // This serves files from the /public directory

// Serve the password.html file from /public/json
app.get('/password', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'json', 'password.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
