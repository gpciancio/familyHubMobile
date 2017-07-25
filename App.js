import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Weather from './src/components/weather.js';
import Calendar from './src/components/calendar.js';
import TodoContainer from './src/components/todo-list.js';
import HTMLView from 'react-native-htmlview';

export default class App extends React.Component {

  render() {
    return (
      <View
        style={{backgroundColor: '#527FE4',
                top: 100,
                width: 300
        }}
      >
        <TodoContainer
        />
        <Weather />
        <Calendar />
      </View>
    );
  }
}
