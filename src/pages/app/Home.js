import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { signOutUser } from "../../services/userService";

export default function Home({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={30} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    await signOutUser();
    setUser(null);
  };

  const navigateToProducts = () => {
    navigation.navigate("ProductList");
  };

  const navigateToBrands = () => {
    navigation.navigate("BrandList");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={navigateToProducts}>
        <Text style={styles.buttonText}>Produtos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={navigateToBrands}>
        <Text style={styles.buttonText}>Marcas</Text>
      </TouchableOpacity>

      <Text>{user.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
