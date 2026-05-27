import LoginForm from '@/components/LoginForm'
import { ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Admin Portal - CryptoCharmer',
  description: 'Secure access to the CryptoCharmer administrative tools.',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0a0a] relative overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-600/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-[60%] -right-[10%] w-[60%] h-[60%] rounded-full bg-green-500/10 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '7s' }} />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-20" />
      </div>
      
      {/* Main Container */}
      <div className="w-full max-w-[420px] relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-green-400 rounded-2xl flex items-center justify-center shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] mb-6 ring-1 ring-white/20">
            <ShieldCheck className="w-8 h-8 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Admin Portal
          </h1>
          <p className="text-neutral-400 text-sm text-center">
            Enter your credentials to access the secure dashboard.
          </p>
        </div>
        
        {/* Glassmorphic Form Card */}
        <div className="bg-neutral-900/40 backdrop-blur-2xl p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Top highlight line */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          
          <LoginForm />
        </div>
        
        {/* Footer links */}
        <div className="mt-8 text-center flex flex-col items-center gap-2">
          <Link href="/" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">
            &larr; Back to website
          </Link>
          <div className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} CryptoCharmer. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}
