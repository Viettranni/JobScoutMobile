// src/screens/JobDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchJobDetails } from '../services/jobService';
import { SafeAreaView } from 'react-native';

const JobDetailsScreen = ({ route }) => {
  const { jobId } = route.params;
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const loadJobDetails = async () => {
      try {
        const details = await fetchJobDetails(jobId);
        setJobDetails(details);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    loadJobDetails();
  }, [jobId]);

  if (!jobDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.jobTitle}>{jobDetails.title}</Text>
      <Text style={styles.jobCompany}>{jobDetails.company}</Text>
      <Text style={styles.jobDescription}>{jobDetails.description}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  jobTitle: { fontSize: 24, fontWeight: 'bold' },
  jobCompany: { fontSize: 18, color: '#555' },
  jobDescription: { fontSize: 16, marginTop: 10 },
});

export default JobDetailsScreen;
