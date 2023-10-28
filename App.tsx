import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Main from './src/Main';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
