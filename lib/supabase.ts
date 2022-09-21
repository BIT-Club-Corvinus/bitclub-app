import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = "https://xgvbuglsesxjdsytwygh.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhndmJ1Z2xzZXN4amRzeXR3eWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzMjU0MzQsImV4cCI6MTk3ODkwMTQzNH0.y6axpsGFrAjfuF5D7iKDYQ_9UYfleNuvESTLSyEv95c"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})