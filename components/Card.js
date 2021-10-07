import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import PropTypes from 'prop-types';

const placeholder = require('../assets/images/placeholder.png');

const propTypes = {
  item: PropTypes.object,
};

class Card extends React.PureComponent {
  render() {
    const {item, title, navigation} = this.props;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Detail', {
            id: item.id,
            title: title,
            movie: item,
          })
        }
        style={styles.container}>
        <Image
          resizeMode="cover"
          source={
            item.poster_path
              ? {uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}
              : placeholder
          }
          style={styles.image}
        />
        <View style={styles.backdrop} />
        {item.poster_path && (
          <Text numberOfLines={3} style={styles.name}>
            {title === 'Popular TV' ? item.name : item.title}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 5,
    alignItems: 'center',
    height: 200,
    justifyContent: 'center',
    borderRadius: 25,
    // overflow: 'hidden',
  },

  image: {
    height: 200,
    width: 130,
    borderRadius: 20,
  },

  backdrop: {
    position: 'absolute',
    borderRadius: 20,
    height: 200,
    width: 130,
    backgroundColor: '#00000050',
  },

  name: {
    position: 'absolute',
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    top: '50%',
    width: 125,
  },
});

Card.propTypes = propTypes;

export default Card;
