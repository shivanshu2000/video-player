import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  error: PropTypes.string,
};

const defaultProps = {
  error: 'Something went wrong',
};
class Error extends React.PureComponent {
  render() {
    const {error} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export default Error;
