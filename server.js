const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const retrievePriceHistory = require('./db/queries.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/prices', async function(req, res) {
  let { ticker, timeframe } = req.query;
  res.json(await retrievePriceHistory(ticker, timeframe));
});

app.listen(port, () => {console.log(`Listening on port ${port}!`)});