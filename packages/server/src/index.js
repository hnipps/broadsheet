const express = require('express');
const app = express();
const port = 8000;
const rp = require('request-promise');
const cheerio = require('cheerio');

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
    .then(rpResponse => {
      // Success!
      const $ = cheerio.load(rpResponse);
      $('br').insertAfter('p', rpResponse);
      const firstPTag = $('p', rpResponse).get(0);
      // const siblingPTags = $(firstPTag, rpResponse).nextUntil(el => el !== 'p');
      const siblingPTags = $(firstPTag, rpResponse).nextUntil('h3');
      console.log('sibling-p', siblingPTags.length);
      console.log('sibling-p', siblingPTags.contents());
      console.log('sibling-p', siblingPTags.contents()[0]);
      res.send(rpResponse);
    })
    .catch(err => {
      res.status(500);
      res.send(err);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
