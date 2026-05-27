import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { logout } from '@/app/actions/auth'
import { LayoutDashboard, Database, LogOut } from 'lucide-react'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('sb-access-token')

  if (!accessToken) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 relative overflow-hidden font-sans selection:bg-emerald-500/30 flex flex-col gap-6">
      {/* Dynamic Background Effects (Matches Login) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-600/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-[60%] -right-[10%] w-[60%] h-[60%] rounded-full bg-green-500/10 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '7s' }} />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col">
        {/* Top Navigation Header */}
        <header className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-8 bg-neutral-900/40 backdrop-blur-2xl p-4 md:px-8 md:py-6 rounded-3xl border border-white/5 shadow-2xl overflow-hidden relative shrink-0">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          
          <div className="flex flex-col md:flex-row md:items-center gap-6 w-full">
            <div className="flex items-center gap-4 border-b border-white/5 pb-4 md:border-b-0 md:pb-0 md:pr-6 md:border-r">
              <div className="w-12 h-12 bg-gradient-to-tr from-emerald-500 to-green-400 rounded-2xl flex items-center justify-center shadow-[0_0_30px_-10px_rgba(16,185,129,0.5)] ring-1 ring-white/20 shrink-0">
                <LayoutDashboard className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-br from-white to-neutral-300 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-emerald-400/80 text-xs font-medium mt-0.5">
                  Secure Session
                </p>
              </div>
            </div>

            <nav className="flex gap-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto flex-1 hide-scrollbar">
              <Link href="/admin" className="px-4 py-2 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" /> Overview
              </Link>
              <Link href="/admin/content" className="px-4 py-2 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium flex items-center gap-2">
                <Database className="w-4 h-4" /> Content Management
              </Link>
            </nav>
            
            <form action={logout} className="ml-auto mt-4 md:mt-0 w-full md:w-auto">
              <button 
                type="submit"
                className="w-full md:w-auto group flex items-center justify-center gap-2 px-6 py-2.5 bg-neutral-950/50 hover:bg-red-500/10 text-neutral-300 hover:text-red-400 transition-all rounded-xl text-sm font-medium border border-neutral-800 hover:border-red-500/30"
              >
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Log Out</span>
              </button>
            </form>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>
      </div>
    </div>
  )
}
