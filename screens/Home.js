import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Text,
  ScrollView,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

import {
  getPopularMovies,
  getPopularTvSeries,
  getUpcomingMovies,
  getFamilyMovies,
  getDocumentaries,
} from '../services';
import {apiKey, apiUrl} from '../constants';
import List from '../components/List';
import Error from '../components/Error';

const dimensions = Dimensions.get('screen');
const Home = ({navigation}) => {
  //   const [movie, setMovie] = useState([]);
  const [movieImages, setMovieImages] = useState(null);
  const [popularMovies, setPopularMovies] = useState(null);
  const [familyMovies, setFamilyMovies] = useState(null);
  const [popularTv, setPopularTv] = useState(null);
  const [documentaries, setDocumentaries] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTvSeries(),
      getFamilyMovies(),
      getDocumentaries(),
    ]);
  };
  useEffect(() => {
    setError(false);
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
          documentariesData,
        ]) => {
          const images = [];
          upcomingMoviesData.forEach(movie => {
            images.push('https://image.tmdb.org/t/p/w500' + movie.poster_path);
          });
          setMovieImages(images);
          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFamilyMovies(familyMoviesData);
          setDocumentaries(documentariesData);
        },
      )
      .catch(err => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <>
      {loaded && !error && (
        <ScrollView>
          {movieImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                autoplay={true}
                circleLoop={true}
                dotStyle={styles.dotsStyle}
                sliderBoxHeight={dimensions.height / 3}
                images={movieImages}
              />
            </View>
          )}

          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                content={popularMovies}
                title="Popular Movies"
              />
            </View>
          )}

          {popularTv && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                content={popularTv}
                title="Popular TV"
              />
            </View>
          )}
          {familyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                content={familyMovies}
                title="Family Movies"
              />
            </View>
          )}
          {documentaries && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                content={documentaries}
                title="Documentaries"
              />
            </View>
          )}
        </ScrollView>
      )}

      {!loaded && <ActivityIndicator size="large" color="#fff" />}
      {error && <Error />}
    </>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dotsStyle: {
    height: 0,
  },

  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
    // backgroundColor: '#00000080',
    backgroundColor: '#4D4983',
  },
});

export default Home;
