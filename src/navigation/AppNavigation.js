import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importing screens
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
// import AboutScreen from '../screens/AboutScreen';
import JobDetailsScreen from '../screens/JobDetailsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <SafeAreaProvider>
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Home"
                screenOptions={{
                headerShown: false, // This will hide the header for all screens
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Search" component={SearchScreen} />
                {/* <Stack.Screen name="About" component={AboutScreen} /> */}
                <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;