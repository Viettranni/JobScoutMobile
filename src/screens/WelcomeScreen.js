import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation, route }) => {
  const { userName } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleGetStarted = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Feather name="check-circle" size={80} color="#1D1B3F" />
        <Text style={styles.welcomeText}>Welcome to Job$cout</Text>
        <Text style={styles.userName}>{userName}!</Text>
        <Text style={styles.description}>
          Your journey to finding the perfect job starts here. Let's get you set up and ready to explore amazing opportunities!
        </Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.cardContainer,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        <View style={styles.card}>
          <Feather name="search" size={40} color="#1D1B3F" />
          <Text style={styles.cardTitle}>Discover Jobs</Text>
          <Text style={styles.cardDescription}>
            Browse through thousands of job listings tailored to your skills and interests.
          </Text>
        </View>
        <View style={styles.card}>
          <Feather name="file-text" size={40} color="#1D1B3F" />
          <Text style={styles.cardTitle}>Fast-Track Your Application</Text>
          <Text style={styles.cardDescription}>
          Registered users can use our AI tool to craft cover letters. Pick a job, generate, and apply!
          </Text>
        </View>
      </Animated.View>

      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    marginTop: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D1B3F',
    marginTop: 20,
    textAlign: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1D1B3F',
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 24,
  },
  cardContainer: {
    marginTop: 40,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1B3F',
    marginTop: 10,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1D1B3F',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WelcomeScreen;