import { supabase } from "./supabase";

export async function createProduct(createData) {
  const { data, error } = await supabase
    .from("product")
    .insert([createData])
    .select();

  return { data, error };
}

export async function getProductsByUserId(userId) {
  const { data, error } = await supabase
    .from("product")
    .select("*, brand(id, description)")
    .eq("user_id", userId);

  return { data, error };
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from("product")
    .select("*, brand(*)")
    .eq("id", id)
    .single();

  return { data, error };
}

export async function updateProduct(id, updateData) {
  const { data, error } = await supabase
    .from("product")
    .update(updateData)
    .eq("id", id)
    .select();

  return { data, error };
}

export async function deleteProduct(id) {
  const { data, error } = await supabase.from("product").delete().eq("id", id);

  return { data, error };
}
