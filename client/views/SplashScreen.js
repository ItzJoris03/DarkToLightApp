import React from 'react';
import { View, Text } from 'react-native';
import { LogoIcon } from '../components/Icons';

const SplashScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 30, alignItems: 'center' }}>
      <LogoIcon size={150} color='#242424' />
      <Text>Made by @joris</Text>
    </View>
  );
};

export default SplashScreen;