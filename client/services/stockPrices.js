import axios from 'axios';

export default async (ticker, timeframe) => {
  const response = await axios.get('http://jason-service.fzdbudezre.us-west-2.elasticbeanstalk.com:3001/api/prices', {
    params: { ticker, timeframe }
  });
  return response.data;
};