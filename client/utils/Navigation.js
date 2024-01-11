import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeIcon, UserIcon, HeartIcon } from '../components/Icons';

import HomeScreen from '../views/Home';
import SavedAlarmsScreen from '../views/SavedAlarms';
import SettingsScreen from '../views/Settings';
import AddAlarmScreen from '../views/AddAlarm';
// import SplashScreen from '../views/SplashScreen';
import Header from '../components/Header';
import InfoScreen from '../views/Info';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackNavigator = () => (
    <Stack.Navigator 
        screenOptions={{ 
            header: (props) => <Header {...props} />,
        }} 
        initialRouteName="HomeScreen"
    >
        <Stack.Screen name="HomeScreen" component={TabNavigator}/>
        <Stack.Screen name="AddAlarmScreen" component={AddAlarmScreen} />
        <Stack.Screen name="InfoScreen" component={InfoScreen} />
    </Stack.Navigator>
);

const TabNavigator = () => (
    <Tab.Navigator 
        screenOptions={{ 
            headerShown: false, 
            tabBarActiveTintColor: "#6B4EFF"
        }} 
        initialRouteName='Home'
    >
        <Tab.Screen
            name="SavedAlarms"
            component={SavedAlarmsScreen}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size }) => (
                    <HeartIcon size={size} color={color} />
                ),
            }}
        />
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size }) => (
                    <HomeIcon size={size} color={color} />
                ),
            }}
        />
        <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size }) => (
                    <UserIcon size={size} color={color} />
                ),
            }}
        />
    </Tab.Navigator>
);

const AppNavigator = () => (
    <NavigationContainer>
        <StackNavigator />
    </NavigationContainer>
);

export default AppNavigator;