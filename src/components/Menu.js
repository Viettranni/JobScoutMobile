import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const Menu = ({ navigation, closeMenu }) => {
  return (
    <SafeAreaView style={styles.menuOverlay}>
      <View style={styles.menuHeader}>
        <Text style={styles.logo}>Job$cout</Text>
        <TouchableOpacity onPress={closeMenu}>
          <Feather name="x" size={24} color="#1D1B3F" />
        </TouchableOpacity>
      </View>

      <View style={styles.menuLinks}>
        <TouchableOpacity onPress={() => { navigation.navigate("Home"); closeMenu(); }}>
          <Text style={styles.menuLink}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("Search"); closeMenu(); }}>
          <Text style={styles.menuLink}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("About"); closeMenu(); }}>
          <Text style={styles.menuLink}>About</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInText}>Sign In / Register</Text>
      </TouchableOpacity>

      {/*Move to footer Component*/}
{/* 
      <View style={styles.menuFooter}>
        <Text style={styles.contactTitle}>Contact us:</Text>
        <Text style={styles.contactInfo}>vttranviet@gmail.com</Text>
        <Text style={styles.contactInfo}>+358449760862</Text>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1D1B3F",
  },
  menuLinks: {
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 24,
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
  // menuFooter: {
  //   marginTop: "auto",
  //   alignItems: "center",
  //   backgroundColor: "#1D1B3F",
  //   color: "white",
  //   padding: 16,
  //   borderRadius: 8,
  // },
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

export default Menu;
