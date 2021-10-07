import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class PlayButton extends React.PureComponent {
  render() {
    const {setVisible} = this.props;
    return (
      <Pressable onPress={() => setVisible(true)} style={styles.button}>
        <Icon color="#4D4983" name={'caret-forward-outline'} size={30} />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    // alignContent: 'center',
    borderRadius: 500,
    width: 50,
    height: 50,
    padding: 10,
    backgroundColor: 'white',
    marginLeft: 7,
  },
});

export default PlayButton;
