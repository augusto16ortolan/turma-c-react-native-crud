import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";

const brandsData = [
  { id: "1", description: "Marca A" },
  { id: "2", description: "Marca B" },
  { id: "3", description: "Marca C" },
  { id: "4", description: "Marca D" },
  { id: "5", description: "Marca E" },
  { id: "6", description: "Marca F" },
  { id: "7", description: "Marca G" },
  { id: "8", description: "Marca H" },
  { id: "9", description: "Marca I" },
  { id: "10", description: "Marca J" },
  { id: "11", description: "Marca K" },
  { id: "12", description: "Marca L" },
  { id: "13", description: "Marca M" },
  { id: "14", description: "Marca N" },
  { id: "15", description: "Marca O" },
];

export default function ProductBrandList({ navigation, route }) {
  const { selectBrand } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Selecionar Marca",
    });
  }, [navigation]);

  const handleSelectBrand = (brand) => {
    selectBrand(brand);
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleSelectBrand(item)}
    >
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={brandsData}
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
  description: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
