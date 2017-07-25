import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './src/components/weather.js';
import Calendar from './src/components/calendar.js';
import TodoContainer from './src/components/todo-list.js';
import HTMLView from 'react-native-htmlview';

export default class App extends React.Component {

  render() {
    return (
      <View >
        <TodoContainer/>
        <Weather />
        <Calendar />
      </View>
    );
  }
}
