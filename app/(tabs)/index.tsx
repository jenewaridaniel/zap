import { StyleSheet, TextInput, View, TouchableOpacity, Image, ScrollView, StatusBar } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const index = () => {
  return (
    <>
    
    <StatusBar 
     barStyle='dark-content'
    />
    <ScrollView style={styles.scrollContainer}>
      {/* Header */}
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="qr-code-outline" size={24} color="#000" />
        </TouchableOpacity>

        <TextInput
          placeholder="Search...."
          style={styles.searchInput}
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="cart-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image
          source={require('../../assets/images/apple.jpeg')}
          style={styles.bannerImage}
        />
      </View>

    </ScrollView>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    height: 40,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000",
  },
  bannerContainer: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  bannerImage: {
    width: "100%",
    height: 150,
    borderRadius: 15,
    resizeMode: "cover",
  },
});
