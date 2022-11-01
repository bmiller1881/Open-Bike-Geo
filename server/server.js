const express = require('express');
const app = express();
const path = require('path');

app.get('/api', (req, res) => {
  return res.status(200).json({ message: 'server is running' });
});

// if (process.env.NODE_ENV === 'production') {
console.log(path.join(__dirname, '../dist'));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});
// }

app.listen(3000, () => console.log('listening on port 3000'));
