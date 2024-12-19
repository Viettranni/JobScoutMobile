import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image,StyleSheet, } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Menu from "../components/Menu";


const HomeScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation();

  const jobCategories = [
    {
      title: "Design",
      description:
        "Browse creative design roles and find your next opportunity.",
      icon: "monitor",
    },
    {
      title: "Technology",
      description: "Explore cutting-edge tech jobs tailored to your skills.",
      icon: "code",
    },
    {
      title: "Marketing",
      description:
        "Discover exciting opportunities in marketing and communications.",
      icon: "message-square",
    },
  ];


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Job$cout</Text>
        <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
          <Feather name="menu" size={24} color="#1D1B3F" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.searchContainer}>
          <Text style={styles.heroText}>The all-in-one place to find the job of your dreams</Text>
          <View style={styles.searchContainerChild}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for any job..."
              placeholderTextColor="#666"
            />
            <TouchableOpacity style={styles.searchButton}>
              <Feather name="search" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Image
            source={require("../../assets/jobScoutLandingImg.png")}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.sectionTitle}>
          Or start searching by clicking on one of the cards!
        </Text>
        {jobCategories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryCard}>
            <Feather name={category.icon} size={24} color="white" />
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <Text style={styles.categoryDescription}>
              {category.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {isMenuOpen && <Menu navigation={navigation} closeMenu={() => setIsMenuOpen(false)} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1D1B3F",
  },
  content: {
    flex: 1,
  },
  heroText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    padding: 16,
    textAlign: "center",
    backgroundColor: "#1D1B3F",
  },
  searchContainer: {
    flexDirection: "column",
    margin: 16,
    backgroundColor: "#1D1B3F",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  searchContainerChild: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 15,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
  },
  searchButton: {
    padding: 12,
    backgroundColor: "#1D1B3F",
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    borderRadius: 8,
  },
  illustration: {
    width: "100%",
    height: 80,
    marginVertical: 1,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#1D1B3F",
    padding: 16,
    fontWeight: "600",
  },
  categoryCard: {
    backgroundColor: "#1D1B3F",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
  },
  categoryTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },
  categoryDescription: {
    color: "white",
    marginTop: 4,
    opacity: 0.8,
  },
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    padding: 16,
    margin: 16,
  },
  
  menuLinks: {
    marginBottom: 32,
  },
  menuLink: {
    fontSize: 20,
    color: "#1D1B3F",
    marginBottom: 16,
  },
  signInButton: {
    backgroundColor: "#1D1B3F",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 32,
  },
  signInText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  menuFooter: {
    marginTop: "auto",
    alignItems: "center",
    backgroundColor: "#1D1B3F",
    color: "white",
    padding: 16,
    borderRadius: 8,
  },
  contactTitle: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
  },
  contactInfo: {
    color: "white",
    marginBottom: 4,
  },
});

export default HomeScreen;
