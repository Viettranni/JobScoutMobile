import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const JobCard = ({ title, company, onPress }) => {
  const [isHovered, setIsHovered] = useState(false);

  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, isHovered && styles.cardHovered]}
      onPressIn={() => setIsHovered(true)}  // When press starts
      onPressOut={() => setIsHovered(false)} // When press ends
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.company}>{company}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#3E3A69',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 3, // For Android shadow
  },
  cardHovered: {
    shadowOpacity: 0.2,
    borderColor: '#1D1B3F',  
    elevation: 6, 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  company: {
    fontSize: 14,
    color: '#f0f0f0',
  },
});

export default JobCard;
