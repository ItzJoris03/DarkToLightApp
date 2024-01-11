import { StatusBar } from 'expo-status-bar';
import AppNavigator from './utils/Navigation';
import React, { useEffect, useState } from 'react';
import { initDatabases } from './utils/Database';
import { LangProvider } from './utils/Language';
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import SplashScreen from './views/SplashScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium
  });

  useEffect(() => {
    initDatabases();
  }, []);

  useEffect(() => {
    // Simulate some loading time, then navigate to the main screen
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  return (
    <LangProvider>
      {showSplash ? <SplashScreen /> : <AppNavigator />}
      <StatusBar style='auto' />
    </LangProvider>
  );
}
