const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Serve static files like index.html, CSS, JS from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Send index.html on root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
