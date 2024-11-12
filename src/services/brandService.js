import { supabase } from "./supabase";

export async function createBrand(createData) {
  const { data, error } = await supabase
    .from("brand")
    .insert([createData])
    .select();

  return { data, error };
}

export async function getBrandsByUserId(userId) {
  const { data, error } = await supabase
    .from("brand")
    .select("*")
    .eq("user_id", userId);

  return { data, error };
}

export async function getBrandById(id) {
  const { data, error } = await supabase
    .from("brand")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
}

export async function updateBrand(id, updateData) {
  const { data, error } = await supabase
    .from("brand")
    .update(updateData)
    .eq("id", id)
    .select();

  return { data, error };
}

export async function deleteBrand(id) {
  const { data, error } = await supabase.from("brand").delete().eq("id", id);

  return { data, error };
}
