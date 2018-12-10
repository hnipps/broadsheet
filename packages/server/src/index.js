const express = require('express');
const app = express();
const port = 8000;
const rp = require('request-promise');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) => {
  rp(
    'https://blog.prototypr.io/simplify-styling-with-functional-css-7b3e4edc2243'
  )
    .then(html => {
      // Success!
      res.send(html);
    })
    .catch(err => {
      res.send(err);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
