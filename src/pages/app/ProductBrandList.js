import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getBrandsByUserId } from "../../services/brandService";

export default function ProductBrandList({ navigation, route }) {
  const { selectBrand } = route.params;
  const [brandsData, setBrandsData] = useState(null);
  const { user } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Selecionar Marca",
    });
  }, [navigation]);

  const handleSelectBrand = (brand) => {
    selectBrand(brand);
    navigation.goBack();
  };

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await getBrandsByUserId(user.id);
    setBrandsData(response.data);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleSelectBrand(item)}
    >
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  if (!brandsData) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size={"large"} color={"blue"} />
      </View>
    );
  }

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
