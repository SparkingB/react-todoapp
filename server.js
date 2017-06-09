/* eslint no-console: 0 */
const path = require('path');
const express = require('express');
const app = express();

app.use('/', express.static(__dirname));

app.get('/todos.json', (req, res) => {
  res.sendFile(path.join(__dirname, './todos.json'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:3000`);
});
