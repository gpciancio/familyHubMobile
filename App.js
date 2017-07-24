import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './src/components/weather.js';
import Calendar from './src/components/calendar.js';
import HTMLView from 'react-native-htmlview';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
      <Calendar />
      <Weather />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
