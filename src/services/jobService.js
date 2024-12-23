// src/services/jobService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api'; 

export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/mobile/mobileGetAll`);
    console.log("Fetched jobs successfully!");
    return response.data.jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const fetchJobDetails = async (jobId) => {
  try {
    const response = await axios.get(`${BASE_URL}/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job details:', error);
    throw error;
  }
};
