import { format } from 'date-fns';

/* Formats milliseconds to be human readable and formatted
 according to the selected timeframe */

export default function convertDateToString(ms, timeframe) {
  const time = new Date(ms);
  if (timeframe === 'day') {
    console.log();
    return `${format(time, 'h:mm A')} ET`;
  }
  if (timeframe === 'week') {
    return `${format(time, 'h:mm A, MMM D')} ET`;
  }
  return format(time, 'MMM D, YYYY');
}