import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Menu from "../components/Menu";
import { fetchJobs } from "../services/jobService";
import { FlatList } from "react-native-gesture-handler";
import JobCard from "../components/JobCard";

const SearchScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const fetchedJobs = await fetchJobs();
        setJobs(fetchedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getJobs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Job$cout</Text>
        <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
          <Feather name="menu" size={24} color="#1D1B3F" />
        </TouchableOpacity>
      </View>

        {isLoading ? (
          <Text>Loading jobs...</Text>
        ) : (
          <FlatList
            data={jobs}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <JobCard
                title={item.title}
                company={item.company}
                onPress={() =>
                  navigation.navigate("JobDetails", { jobId: item._id })
                }
              />
            )}
          />
        )}

      {isMenuOpen && (
        <Menu navigation={navigation} closeMenu={() => setIsMenuOpen(false)} />
      )}
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D1B3F",
    marginBottom: 8,
  },
  jobList: {
    flex: 1,
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
});

export default SearchScreen;
