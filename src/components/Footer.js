import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.contactTitle}>Get in Touch</Text>
      <View style={styles.contactDetails}>
        <Text style={styles.contactInfo}>vttranviett@gmail.com</Text>
        <Text style={styles.contactInfo}>+358 44 976 0862</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 24,
    alignItems: "center",
    backgroundColor: "#1D1B3F",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  contactDetails: {
    alignItems: "center",
  },
  contactInfo: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 16,
    marginVertical: 2,
  },
});

export default Footer;
