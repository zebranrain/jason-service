import axios from 'axios';

export default async (ticker, timeframe) => {
  const response = await axios.get('http://18.237.9.220:3001/api/prices', {
    params: { ticker, timeframe }
  });
  return response.data;
};