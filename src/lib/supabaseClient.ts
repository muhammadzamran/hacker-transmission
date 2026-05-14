import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ohvznvhbplennofykffw.supabase.co"

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9odnpudmhicGxlbm5vZnlrZmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NjkwNTYsImV4cCI6MjA5NDM0NTA1Nn0.aBVMELsgEAZR6afOafwyuKshlIvCSxVF_G1nrQOA4J8"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const hasValidSupabaseKeys = () => true;