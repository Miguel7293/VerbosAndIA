import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const analyzeSentence = async (oracion) => {
  const response = await axios.post('http://localhost:4000/analizar-oracion', { oracion });
  return response.data;
};
