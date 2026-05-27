'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/app/actions/auth'
import { Mail, Lock, Loader2, AlertCircle, ArrowRight } from 'lucide-react'

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const result = await login(formData)
    
    if (result.success) {
      router.push('/admin')
      router.refresh()
    } else {
      setError(result.error || 'Invalid email or password.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-2xl flex items-start gap-3 animate-in fade-in zoom-in-95 duration-200">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}
      
      {/* Email Input */}
      <div className="space-y-2 group">
        <label htmlFor="email" className="text-sm font-medium text-neutral-300 ml-1">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-emerald-500 transition-colors">
            <Mail className="w-5 h-5" />
          </div>
          <input 
            id="email"
            type="email" 
            name="email"
            required
            autoComplete="email"
            className="w-full bg-neutral-950/50 border border-neutral-800 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner"
            placeholder="admin@example.com"
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-2 group">
        <label htmlFor="password" className="text-sm font-medium text-neutral-300 ml-1">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-emerald-500 transition-colors">
            <Lock className="w-5 h-5" />
          </div>
          <input 
            id="password"
            type="password" 
            name="password"
            required
            autoComplete="current-password"
            className="w-full bg-neutral-950/50 border border-neutral-800 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner tracking-wide"
            placeholder="••••••••"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={loading}
        className="group mt-4 relative w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium py-3.5 rounded-2xl hover:from-emerald-400 hover:to-green-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.6)] overflow-hidden"
      >
        <div className="flex items-center justify-center gap-2 relative z-10">
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Secure Sign In</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </div>
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
      </button>
    </form>
  )
}
