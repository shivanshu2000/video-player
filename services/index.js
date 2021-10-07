import axios from 'axios';

import {apiKey, apiUrl} from '../constants';

export const getUpcomingMovies = async () => {
  const res = await axios.get(`${apiUrl}/movie/upcoming?api_key=${apiKey}`);
  return res.data.results;
};
export const getPopularMovies = async () => {
  const res = await axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}`);
  return res.data.results;
};

export const getPopularTvSeries = async () => {
  const res = await axios.get(`${apiUrl}/tv/popular?api_key=${apiKey}`);
  return res.data.results;
};

export const getFamilyMovies = async () => {
  const res = await axios.get(
    `${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=10751`,
  );

  return res.data.results;
};
export const getDocumentaries = async () => {
  const res = await axios.get(
    `${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=99`,
  );

  return res.data.results;
};
export const getMovie = async id => {
  const res = await axios.get(`${apiUrl}/movie/${id}?api_key=${apiKey}`);
  // console.log('Response is ', res);

  return res.data;
};
