import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Modal,
  Button,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import VideoPlayer from 'react-native-video-controls';

import PlayButton from '../components/PlayButton';
import {getMovie} from '../services';
const placeholder = require('../assets/images/placeholder.png');

const dimensions = Dimensions.get('screen');
const Detail = ({route, navigation}) => {
  const [movieDetail, setMovieDetail] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const videoPlayer = useRef(null);
  const {id, title, movie} = route.params;

  useEffect(() => {
    setLoading(true);
    setError(null);
    getMovie(id)
      .then(res => {
        setMovieDetail(res);

        setLoading(false);
        // console.log('Response is ', res);
      })
      .catch(err => {
        if (err.response.data.status_message) {
          setError(err.response.data.status_message);
        } else {
          setError('Something went wrong/Check your internet connection');
        }
        setLoading(false);
      });
  }, [id]);

  console.log(movieDetail);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {loading && (
            <ActivityIndicator
              style={styles.spinner}
              color="red"
              size="large"
            />
          )}
          {!loading && movieDetail && (
            <View>
              <Image
                resizeMode="cover"
                source={
                  movieDetail.poster_path
                    ? {
                        uri:
                          'https://image.tmdb.org/t/p/w500' +
                          movieDetail.poster_path,
                      }
                    : placeholder
                }
                style={styles.image}
              />
              <View style={styles.play}>
                <Text style={{...styles.text, ...styles.title}}>
                  {movieDetail.title}
                </Text>
                <PlayButton setVisible={setVisible} />
              </View>
              <View style={styles.divider} />
              <Text style={{...styles.text, ...styles.date}}>
                Release date: {movieDetail.release_date}
              </Text>
              <View style={styles.ratings}>
                <StarRating
                  starStyle={styles.star}
                  halfStarColor="#F1C40E"
                  starSize={25}
                  fullStarColor="#F1C40E"
                  maxStars={movieDetail.vote_average / 2}
                  rating={movieDetail.vote_average / 2}
                />
              </View>

              {movieDetail.genres && (
                <View style={styles.genres}>
                  {movieDetail.genres.map(genre => (
                    <Text key={genre.id} style={styles.genre}>
                      {genre.name}
                    </Text>
                  ))}
                </View>
              )}

              <View style={styles.divider} />

              <Text style={{...styles.text, ...styles.header}}>
                General Trivia
              </Text>
              <Text style={{...styles.text, ...styles.overview}}>
                {movieDetail.overview}
              </Text>
            </View>
          )}

          {!!error && <Text style={styles.text}>{error}</Text>}
        </View>
      </ScrollView>
      {visible && (
        <Modal
          animationType="slide"
          visible={visible}
          supportedOrientations={['portrait', 'landscape']}>
          <View style={styles.modal}>
            <VideoPlayer
              ref={videoPlayer}
              controls={true}
              source={{
                uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
              }}
              fullscreenOrientation="all"
              onBack={() => setVisible(false)}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
    backgroundColor: '#4D4983',
  },
  spinner: {
    marginTop: 20,
  },
  image: {
    height: dimensions.width / 2,
    alignSelf: 'center',
    borderRadius: 400,
    // marginBottom: 7,
    width: dimensions.width / 2,
  },

  play: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    paddingVertical: 10,
    flexWrap: 'wrap',
  },

  text: {
    textAlign: 'center',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 27,
    color: 'white',
    marginRight: 5,
  },

  genre: {
    fontWeight: 'bold',
    marginVertical: 3,
    // marginHorizontal: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    color: 'black',
    paddingHorizontal: 7,
    paddingVertical: 3,
  },

  ratings: {
    // flex: 0.5,
    alignSelf: 'center',
    marginVertical: 9,
    maxWidth: dimensions.width / 1.5,
  },

  star: {
    marginHorizontal: 5,
  },

  date: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 9,
    fontSize: 15,
  },

  genres: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: dimensions.width / 1.5,
    alignSelf: 'center',
    marginBottom: 9,
    // justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 21,
    color: 'white',
    marginVertical: 7,
  },

  divider: {
    width: dimensions.width,
    height: 1,
    marginVertical: 3,
    backgroundColor: 'white',
  },

  overview: {
    paddingHorizontal: 11,
    fontSize: 16,
    color: 'white',
  },

  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width: dimensions.width,
    // height: dimensions.height,
  },
  mediaPlayer: {
    // width: dimensions.width,
    // height: dimensions.height,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});

export default Detail;
