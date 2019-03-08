/* Returns red if the price has dropped since the beginning of the
  selected timeframe, green otherwise */
export default function(pricepoints) {
  if (!pricepoints[0]) {
    return '#21ce99';
  }
  if (pricepoints[0].y > pricepoints[pricepoints.length - 1].y) {
    return '#f45531';
  }
  return '#21ce99';
}