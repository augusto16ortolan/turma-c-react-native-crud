import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { createBrand, updateBrand } from "../../services/brandService";
import { useAuth } from "../../context/AuthContext";

export default function BrandForm({ route, navigation }) {
  const [id, setId] = useState(null);
  const [description, setDescription] = useState("");

  const { user } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params?.brand ? "Editar Marca" : "Cadastrar Marca",
    });
  }, [navigation]);

  useEffect(() => {
    if (route.params?.brand) {
      const { brand } = route.params;
      setId(brand.id);
      setDescription(brand.description);
    }
  }, [route.params]);

  const handleSave = async () => {
    if (!description) {
      Alert.alert("Erro", "Por favor, preencha o campo de descrição.");
      return;
    }

    if (id) {
      const response = await updateBrand(id, { description });
      console.log(response);
    } else {
      const response = await createBrand({ description, user_id: user.id });
      console.log(response);
    }

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>
            {route.params?.brand ? "Salvar Alterações" : "Cadastrar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
