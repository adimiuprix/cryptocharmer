import { AuthClient } from '@supabase/auth-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://daenabjkvmvbwcumjllq.supabase.co'
// For auth, we only need anon key for browser, but we can also use service role key for admin tasks
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export const authClient = new AuthClient({
  url: `${SUPABASE_URL}/auth/v1`,
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  },
  detectSessionInUrl: false, // Turn off for server-side
  persistSession: false, // Turn off since we'll manage it via cookies manually
})
