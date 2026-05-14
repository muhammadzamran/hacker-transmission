
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ohvznvhbplennofykffw.supabase.co"
const supabaseAnonKey = "YOUR_FULL_LONG_KEY_STARTING_WITH_eyJ"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)