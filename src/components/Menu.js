import React, { useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

const Menu = ({ navigation, closeMenu }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.menuOverlay}>
      <View style={styles.menuHeader}>
        <Text
          onPress={() => {
            navigation.navigate("Home");
          }}
          style={styles.logo}
        >
          Job$cout
        </Text>
        <TouchableOpacity onPress={closeMenu}>
          <Feather name="x" size={24} color="#1D1B3F" />
        </TouchableOpacity>
      </View>

      <View style={styles.menuLinks}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
            closeMenu();
          }}
        >
          <Text style={styles.menuLink}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Search", { searchTerm: "" });
            closeMenu();
          }}
        >
          <Text style={styles.menuLink}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("About");
            closeMenu();
          }}
        >
          <Text style={styles.menuLink}>About</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {isAuthenticated ? (
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
          style={styles.signInButton}
        >
          <Text style={styles.signInText}>Logout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LoginRegister");
            closeMenu();
          }}
          style={styles.signInButton}
        >
          <Text style={styles.signInText}>Sign In / Register</Text>
        </TouchableOpacity>
      )}
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
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#light",
    marginBottom: 12,
  },
});

export default Menu;
