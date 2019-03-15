import React from 'react';
import Register from "./Components/register";
import { StyleSheet, Text, View,
    ScrollView,
    TextInput,
    Button
}  from 'react-native';

export default class App extends React.Component {
  render() {
    return (
        <Register/>
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
