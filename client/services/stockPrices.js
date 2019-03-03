import axios from 'axios';

export default async (ticker, timeframe) => {
  const response = await axios.get('api/prices', {
    params: { ticker, timeframe }
  });
  return response.data;
};