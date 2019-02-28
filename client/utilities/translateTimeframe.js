/* Simply an object that translates innerText on
clickable HTML elements to the timeframes allowed
by the stock chart API */

export default translateTimeframe = {
  '1D': 'day',
  '1W': 'week',
  '1M': 'month',
  '3M': 'quarter',
  '1Y': 'year',
  '5Y': 'fiveYear'
}