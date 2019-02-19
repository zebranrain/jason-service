const { Company, DailyPrice, FiveMinPrice, sequelize } = require('./models.js');
const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const companyDir = path.join(__dirname, '../data/company');
const dailyDir = path.join(__dirname, '../data/daily');
let fiveMinDir = path.join(__dirname, '../data/five-min');
const dailyLimit = new Date("2014-01-01");
const fiveMinLimit = new Date("2019-02-03");

function forEachFileInDir(dir, callback) {
  fs.readdir(dir, function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
      fs.readFile(`${dir}/${file}`, 'utf8', function(err, data) {
        if (err) callback(err);
        data = JSON.parse(data);
        return callback(null, data);
      })
    })
  })
}

function seedCompanies() {
  fs.readdir(companyDir, function(err, files) {
    if (err) throw err;
    files.forEach((file) => {
      fs.readFile(`${dir}/${file}`, 'utf8', function(err, data) {
        let company = JSON.parse(data).bestMatches[0];
        let ticker = company['1. symbol'];
        let name = company['2. name'];
        Company.create({ name, ticker })
      });
    });
  });
}

function mapToRecentPrices(prices, companyId, limit) {
  let allPrices = _.map(prices, (data, date, dailyPrices) => {
    let price = parseFloat(dailyPrices[date]['4. close'])
    return { date, price, companyId }
  });
  return _.filter(allPrices, (price) => {
    let date = new Date(price.date)
    return date >= limit;
  })
}

function seedDailyPrices() {
  fs.readdir(dailyDir, function(err, files) {
    files.forEach((file) => {
      fs.readFile(`${dir}/${file}`, 'utf8', function(err, data) {
        data = JSON.parse(data);
        let ticker = data['Meta Data']['2. Symbol'];
        let allPrices = data["Time Series (Daily)"];
        // get the company associated with that ticker
        Company.findOne({where: { ticker }})
        .then((company) => {
          let companyId = company.id;
          let recentPrices = mapToRecentPrices(allPrices, companyId, dailyLimit);
          DailyPrice.bulkCreate(recentPrices);
        });
      });
    });
  });
}

function seedFiveMinPrices() {
  fs.readdir(fiveMinDir, function(err, files) {
    files.forEach((file) => {
      fs.readFile()
    })
  })
}

DailyPrice.findAll({where: {companyId: 2}})
.then((result) => {
  console.log(result);
})

// sequelize.sync()
// .then(() => {
//   seedDailyPrices();
// })