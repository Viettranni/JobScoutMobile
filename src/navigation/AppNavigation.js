import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, AuthContext } from '../context/AuthContext'; 

// Importing screens
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import JobDetailsScreen from '../screens/JobDetailsScreen';
import LoginRegisterScreen from '../screens/LoginRegisterScreen';
import LoadingScreen from '../screens/LoadingScreen';
// import ProfileScreen from '../screens/ProfileScreen'; 


const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, checkAuth } = useContext(AuthContext); 
  const [isLoading, setIsLoading] = useState(true);

  // Check for authentication status when app loads
  useEffect(() => {
    const verifyLogin = async () => {
      await checkAuth(); 
      setIsLoading(false);
    };

    verifyLogin();
  }, []);

  // Show a loading screen while checking login status
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false, // Hide header for all screens
          }}
        >
          {/* Public Screens */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="JobDetails" component={JobDetailsScreen} />

          {/* Private Screens (only accessible when authenticated) */}
          {user && (
            <>
              {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
            </>
          )}

          {/* Authentication Screen (Login/Register) */}
          {!user && <Stack.Screen name="LoginRegister" component={LoginRegisterScreen} />}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
