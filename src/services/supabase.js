import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vxoqwzkyrgksywjzwwcl.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4b3F3emt5cmdrc3l3anp3d2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzNTYyMTAsImV4cCI6MjA0NjkzMjIxMH0.O7GHyG0q694pTqrd8c7GLt5_Rok71HFeAZD6bTxWqK8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
