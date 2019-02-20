const { Company, DailyPrice, FiveMinPrice } = require('./models.js');

// inputs: ticker, timeframe
// outputs: array of objects that are date/price relationships

function retrievePriceHistory(ticker, timeframe) {
  // find the company id associated with the ticker
  return Company.findOne({where: { ticker }})
  .then((company) => {
    let { id } = company;
    // if the timeframe is daily, invoke
    if (timeframe === 'year') {
      return retrieveYearlyPrices(id)
    }
  });
  // based on the timeframe, invoke the appropriate function with that ticker
  // return the array of objects
}

function retrieveDailyPrices(companyId) {
  // perform a query on the fiveminprices database using the provided id
  // assume it's 5:00 PM, so return the last full day (9:30 AM - 4:00 PM)
}

function retrieveWeeklyPrices(id) {
  // perform a query on the fiveminprices database using provided id
  // assume it's 5:00 PM on Friday, Feb 1 so show back through 9:30 AM on Jan 26
}

function retrieveMonthlyPrices(id) {
  // perform a query on the daily database using provided id
  // assume it's 5:00 PM on Friday, Feb 1 so show back through Jan 2 2019
}

function retrieveQuarterlyPrices(id) {
  // perform a query on the daily database using provided id
  // assume it's 5:00 PM on Friday, Feb 1 so show back through Nov 2 2018
}

function retrieveYearlyPrices(companyId) {
  // perform a query on the daily database using provided id
  // assume it's 5:00 PM on Friday, Feb 1 so show back through Feb 2 2018
  const startDate = new Date('02/02/2018');
  const endDate = new Date('02/01/2019');
  return DailyPrice.findAll({where: { companyId, date: {$between: [startDate, endDate]}}})
}

function retrieveFiveYearPrices(id) {
  // perform a query on the daily database using provided id
  // assume it's 5:00 PM on Friday, Feb 1 so show back through Feb 2 2014
}

retrievePriceHistory('AAPL', 'year');

module.exports = retrievePriceHistory;