const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Borhan Auto Parts Centre Server is running ✅');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const path = require('path');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
