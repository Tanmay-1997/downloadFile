import {View, StyleSheet} from 'react-native';
import React from 'react';
import DownoadScreen from './src/screens/downoad';

export default function App() {
  return (
    <View style={styles.container}>
      <DownoadScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
