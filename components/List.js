import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import PropTypes from 'prop-types';

import Card from './Card';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};

class List extends React.PureComponent {
  render() {
    const {navigation, title, content} = this.props;

    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            horizontal={true}
            renderItem={({item}) => (
              <Card navigation={navigation} title={title} item={item} />
            )}
            data={content}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    marginTop: 20,
    paddingLeft: 15,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

List.propTypes = propTypes;

export default List;
