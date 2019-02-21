const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const retrievePriceHistory = require('../db/queries.js');

const translateError = {
  companyNotFound: { code: 404, message: "Sorry! We don't have price records for that company." },
  timeframeNotFound: { code: 404, message: "Sorry! We don't support the timeframe you requested." }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/prices', async function(req, res) {
  let { ticker, timeframe } = req.query;
  retrievePriceHistory(ticker, timeframe)
    .then(prices => res.json(prices))
    .catch(err => {
      let { code, message } = translateError[err.message];
      res.status(code).end(message);
    });
});

app.listen(port, () => {console.log(`Listening on port ${port}!`)});