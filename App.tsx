import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Bootstrap from './src/Bootstrap';
import BottomBar from './src/components/BottomBar';

function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Bootstrap>
          <BottomBar />
        </Bootstrap>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
