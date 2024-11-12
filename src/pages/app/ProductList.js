import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

const productsData = [
  {
    id: "1",
    description: "Produto 1",
    brand: {
      description: "Marca A",
      id: "550e8400-e29b-41d4-a716-446655440000",
    },
    price: "R$ 10,00",
  },
  {
    id: "2",
    description: "Produto 2",
    brand: {
      description: "Marca B",
      id: "550e8400-e29b-41d4-a716-446655440001",
    },
    price: "R$ 20,00",
  },
  {
    id: "3",
    description: "Produto 3",
    brand: {
      description: "Marca C",
      id: "550e8400-e29b-41d4-a716-446655440002",
    },
    price: "R$ 30,00",
  },
  {
    id: "4",
    description: "Produto 4",
    brand: {
      description: "Marca D",
      id: "550e8400-e29b-41d4-a716-446655440003",
    },
    price: "R$ 40,00",
  },
  {
    id: "5",
    description: "Produto 5",
    brand: {
      description: "Marca E",
      id: "550e8400-e29b-41d4-a716-446655440004",
    },
    price: "R$ 50,00",
  },
  {
    id: "6",
    description: "Produto 6",
    brand: {
      description: "Marca F",
      id: "550e8400-e29b-41d4-a716-446655440005",
    },
    price: "R$ 60,00",
  },
  {
    id: "7",
    description: "Produto 7",
    brand: {
      description: "Marca G",
      id: "550e8400-e29b-41d4-a716-446655440006",
    },
    price: "R$ 70,00",
  },
  {
    id: "8",
    description: "Produto 8",
    brand: {
      description: "Marca H",
      id: "550e8400-e29b-41d4-a716-446655440007",
    },
    price: "R$ 80,00",
  },
  {
    id: "9",
    description: "Produto 9",
    brand: {
      description: "Marca I",
      id: "550e8400-e29b-41d4-a716-446655440008",
    },
    price: "R$ 90,00",
  },
  {
    id: "10",
    description: "Produto 10",
    brand: {
      description: "Marca J",
      id: "550e8400-e29b-41d4-a716-446655440009",
    },
    price: "R$ 100,00",
  },
  {
    id: "11",
    description: "Produto 11",
    brand: {
      description: "Marca K",
      id: "550e8400-e29b-41d4-a716-44665544000A",
    },
    price: "R$ 110,00",
  },
  {
    id: "12",
    description: "Produto 12",
    brand: {
      description: "Marca L",
      id: "550e8400-e29b-41d4-a716-44665544000B",
    },
    price: "R$ 120,00",
  },
  {
    id: "13",
    description: "Produto 13",
    brand: {
      description: "Marca M",
      id: "550e8400-e29b-41d4-a716-44665544000C",
    },
    price: "R$ 130,00",
  },
  {
    id: "14",
    description: "Produto 14",
    brand: {
      description: "Marca N",
      id: "550e8400-e29b-41d4-a716-44665544000D",
    },
    price: "R$ 140,00",
  },
  {
    id: "15",
    description: "Produto 15",
    brand: {
      description: "Marca O",
      id: "550e8400-e29b-41d4-a716-44665544000E",
    },
    price: "R$ 150,00",
  },
];

export default function ProductList({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addProduct}>
          <Ionicons name="add-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const addProduct = () => {
    navigation.navigate("ProductForm");
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.brand}>{item.brand.description}</Text>
        <Text style={styles.price}>{item.price}</Text>
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

  const handleDelete = (product) => {
    console.log("Excluir produto com ID:", product);
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
