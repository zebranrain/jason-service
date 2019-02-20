const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const retrievePriceHistory = require('./db/queries.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/test', function(req, res) {
  retrievePriceHistory('AAPL', 'year')
  .then((prices) => {
    res.end(JSON.stringify(prices));
  })
});

app.listen(port, () => {console.log(`Listening on port ${port}!`)});