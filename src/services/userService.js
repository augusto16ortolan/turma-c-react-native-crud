import { supabase } from "./supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function signUpUser(userData) {
  const { email, password, name } = userData;

  try {
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return { success: false, message: authError.message };
    }

    const authUserId = authUser.user.id;

    const { data: userData, error: userError } = await supabase
      .from("user")
      .insert([
        {
          name,
          email,
          id: authUserId,
        },
      ])
      .select();

    console.log("userdata", userData);

    if (userError) {
      console.error(
        "Erro ao inserir os dados na tabela 'users':",
        userError.message
      );
      return;
    }

    await AsyncStorage.setItem(
      "@userCredentials",
      JSON.stringify({ email, password })
    );

    return { success: true, user: userData[0] };
  } catch (error) {
    return {
      success: false,
      message: "Erro durante o processo de criação de usuário.",
    };
  }
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Erro ao fazer logout:", error.message);
    return false;
  }

  await AsyncStorage.removeItem("@userCredentials");

  console.log("Logout realizado com sucesso");
  return true;
}

export async function loginUser(email, password) {
  try {
    const { data: authUser, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      console.error("Erro ao fazer login:", authError.message);
      return { success: false, message: authError.message };
    }

    await AsyncStorage.setItem(
      "@userCredentials",
      JSON.stringify({ email, password })
    );

    const userId = authUser.user.id;

    let { data: userData, error: userError } = await supabase
      .from("user")
      .select("*")
      .eq("id", userId)
      .single();

    if (authError) {
      console.error("Erro ao buscar usuario:", userError.message);
      return { success: false, message: userError.message };
    }

    return { success: true, user: userData };
  } catch (error) {
    console.error("Erro durante o login:", error);
    return { success: false, message: "Erro desconhecido durante o login." };
  }
}
