import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import {
  getProductsByUserId,
  deleteProduct,
} from "../../services/productService";

export default function ProductList({ navigation }) {
  const [productsData, setProductsData] = useState(null);
  const { user } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addProduct}>
          <Ionicons name="add-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", getData);
    return unsubscribe;
  }, [navigation]);

  async function getData() {
    const response = await getProductsByUserId(user.id);
    setProductsData(response.data);
  }

  const addProduct = () => {
    navigation.navigate("ProductForm");
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.brand}>{item.brand.description}</Text>
        <Text style={styles.price}>{item.value}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Ionicons name="pencil-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item)}>
          <Ionicons name="trash-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleEdit = (product) => {
    navigation.navigate("ProductForm", { product });
  };

  const handleDelete = async (product) => {
    await deleteProduct(product.id);
    getData();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={productsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  description: {
    fontWeight: "bold",
    fontSize: 16,
  },
  brand: {
    color: "#555",
  },
  price: {
    color: "#007bff",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
