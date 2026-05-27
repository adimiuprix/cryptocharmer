import { StorageClient } from '@supabase/storage-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://daenabjkvmvbwcumjllq.supabase.co'
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export const storageClient = new StorageClient(`${SUPABASE_URL}/storage/v1`, {
  apikey: SUPABASE_SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
})

export const BUCKET_NAME = 'charmer'
export const UPLOAD_FOLDER = 'content-images'