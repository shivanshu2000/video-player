import React, {PureComponent} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Navbar extends PureComponent {
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={40} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: '#4D4983',
    elevation: 5,
  },
});
