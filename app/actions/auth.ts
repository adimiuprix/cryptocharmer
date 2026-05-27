'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { authClient } from '../lib/auth'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { success: false, error: 'Email and password are required' }
  }

  try {
    const { data, error } = await authClient.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Login error:', error.message)
      return { success: false, error: error.message }
    }

    if (data?.session) {
      const cookieStore = await cookies()
      
      // Store the session securely in cookies
      cookieStore.set('sb-access-token', data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: data.session.expires_in,
        path: '/',
      })
      
      cookieStore.set('sb-refresh-token', data.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })

      return { success: true }
    }

    return { success: false, error: 'No session established' }
  } catch (err: any) {
    return { success: false, error: err.message || 'An unexpected error occurred' }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('sb-access-token')
  cookieStore.delete('sb-refresh-token')

  redirect('/login')
}
