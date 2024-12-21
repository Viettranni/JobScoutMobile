import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { fetchJobDetails } from '../services/jobService';
import { Linking } from 'react-native';

const JobDetailsScreen = ({ route, navigation }) => {
  const { jobId } = route.params;
  const [jobDetails, setJobDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadJobDetails = async () => {
      try {
        const details = await fetchJobDetails(jobId);
        setJobDetails(details);
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadJobDetails();
  }, [jobId]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1D1B3F" />
      </View>
    );
  }

  if (!jobDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load job details. Please try again.</Text>
      </View>
    );
  }

  const handleApplyButton = () => {
      Linking.openURL(jobDetails.url);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#1D1B3F" />
        </TouchableOpacity>
        
        <View style={styles.header}>
          <Text style={styles.jobTitle}>{jobDetails.title}</Text>
          <Text style={styles.jobCompany}>{jobDetails.company}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <InfoItem icon="map-pin" text={jobDetails.location || 'Remote'} />
          <InfoItem icon="clock" text={jobDetails.jobType || 'Full-time'} />
          <InfoItem icon="dollar-sign" text={jobDetails.salary || 'Competitive'} />
        </View>
        
        <View style={styles.section}>
          <SectionTitle title="Job Description" />
          <Text style={styles.description}>{jobDetails.description}</Text>
        </View>
        
        <View style={styles.section}>
          <SectionTitle title="Requirements" />
          <BulletList items={jobDetails.requirements && jobDetails.requirements.length > 0
            ? jobDetails.requirements
            : ['Bachelor\'s degree', '3+ years of experience', 'Strong communication skills']} />
        </View>
        
        <View style={styles.section}>
          <SectionTitle title="Benefits" />
          <BulletList items={jobDetails.benefits || ['Health insurance', '401(k) matching', 'Flexible work hours']} />
        </View>
        
        <TouchableOpacity onPress={handleApplyButton} style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoItem = ({ icon, text }) => (
  <View style={styles.infoItem}>
    <Feather name={icon} size={16} color="#1D1B3F" />
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

const SectionTitle = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const BulletList = ({ items }) => (
  <View>
    {Array.isArray(items) && items.map((item, index) => (
      <View key={index} style={styles.bulletItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>{item}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  backButton: {
    marginBottom: 20,
  },
  header: {
    marginBottom: 20,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D1B3F',
    marginBottom: 8,
  },
  jobCompany: {
    fontSize: 18,
    color: '#555',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1B3F',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    color: '#1D1B3F',
  },
  bulletText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  applyButton: {
    backgroundColor: '#1D1B3F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default JobDetailsScreen;