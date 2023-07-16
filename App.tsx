import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import OnBoardingScreens from './src/screens/OnBoardingScreens/component/OnboardingScreen';

export default function App() {
  return (
    <View style={styles.container}>
        <OnBoardingScreens navigation={undefined}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
