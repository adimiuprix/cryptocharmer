import { Activity, Database, Users, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/app/lib/prisma'
import Image from 'next/image'

export default async function AdminDashboard() {
  const recentContents = await prisma.content.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      category: true,
      wallet: true,
    }
  })

  return (
    <div className="flex flex-col gap-8 h-full animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Quick Stats / Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Content Management */}
        <div className="group bg-neutral-900/40 backdrop-blur-xl p-6 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-colors shadow-lg hover:shadow-emerald-500/10 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
            <Database className="w-24 h-24 text-emerald-500 rotate-12 translate-x-4 -translate-y-4" />
          </div>
          
          <div className="w-12 h-12 bg-neutral-950/50 rounded-2xl flex items-center justify-center border border-neutral-800 mb-6 relative z-10 group-hover:scale-110 group-hover:border-emerald-500/50 transition-all">
            <Database className="w-6 h-6 text-emerald-400" />
          </div>
          
          <div className="relative z-10 flex-1">
            <h2 className="text-xl font-semibold mb-2 text-white group-hover:text-emerald-400 transition-colors">Manage Platforms</h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Add, edit, or delete platform entries that appear on the main website.
            </p>
          </div>

          <Link href="/admin/content" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-500 hover:text-emerald-400 mt-auto relative z-10">
            Go to Database <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* Card 2: System Logs */}
        <div className="group bg-neutral-900/40 backdrop-blur-xl p-6 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-colors shadow-lg hover:shadow-blue-500/10 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
            <Activity className="w-24 h-24 text-blue-500 rotate-12 translate-x-4 -translate-y-4" />
          </div>
          
          <div className="w-12 h-12 bg-neutral-950/50 rounded-2xl flex items-center justify-center border border-neutral-800 mb-6 relative z-10 group-hover:scale-110 group-hover:border-blue-500/50 transition-all">
            <Activity className="w-6 h-6 text-blue-400" />
          </div>
          
          <div className="relative z-10 flex-1">
            <h2 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">System Activity</h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Monitor API requests, traffic patterns, and background task executions.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 cursor-not-allowed mt-auto relative z-10 text-left">
            Coming Soon
          </button>
        </div>
        
        {/* Card 3: User Access */}
        <div className="group bg-neutral-900/40 backdrop-blur-xl p-6 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-colors shadow-lg hover:shadow-purple-500/10 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
            <Users className="w-24 h-24 text-purple-500 rotate-12 translate-x-4 -translate-y-4" />
          </div>
          
          <div className="w-12 h-12 bg-neutral-950/50 rounded-2xl flex items-center justify-center border border-neutral-800 mb-6 relative z-10 group-hover:scale-110 group-hover:border-purple-500/50 transition-all">
            <Users className="w-6 h-6 text-purple-400" />
          </div>
          
          <div className="relative z-10 flex-1">
            <h2 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-400 transition-colors">Access Control</h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Manage administrative accounts and configure API keys.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 cursor-not-allowed mt-auto relative z-10 text-left">
            Coming Soon
          </button>
        </div>
      </div>

      {/* Recent Platforms Table */}
      <div className="bg-neutral-900/40 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden mt-4">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        
        <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/5">
          <div>
            <h2 className="text-xl font-semibold text-white">Recently Added Platforms</h2>
            <p className="text-neutral-400 text-sm mt-1">A quick view of the latest 5 entries.</p>
          </div>
          <Link href="/admin/content" className="px-4 py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 rounded-xl text-sm font-medium transition-colors border border-emerald-500/20 flex items-center gap-2">
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-300">
            <thead className="text-xs text-neutral-500 uppercase bg-black/20 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium tracking-wider">Platform</th>
                <th className="px-6 py-4 font-medium tracking-wider">Category</th>
                <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                <th className="px-6 py-4 font-medium tracking-wider">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentContents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">
                    No platforms found. Add your first platform!
                  </td>
                </tr>
              ) : (
                recentContents.map((content) => (
                  <tr key={content.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center overflow-hidden shrink-0">
                          {content.logo ? (
                            <Image 
                              src={content.logo.startsWith('http') ? content.logo : `https://daenabjkvmvbwcumjllq.supabase.co/storage/v1/object/public/charmer/content-images/${content.logo}`}
                              alt={content.name}
                              width={40} height={40}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="font-bold text-neutral-500">{content.name.charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-white">{content.name}</div>
                          <div className="text-xs text-neutral-500 mt-0.5">{content.headline?.substring(0, 30)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-neutral-800 text-neutral-300 rounded-lg text-xs font-medium border border-neutral-700">
                        {content.category?.name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${content.highlight === 'Paying' ? 'bg-emerald-500' : 'bg-neutral-500'}`} />
                        <span className={content.highlight === 'Paying' ? 'text-emerald-400' : 'text-neutral-400'}>
                          {content.highlight || 'Normal'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {content.link && (
                        <a href={content.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-lg inline-flex transition-colors border border-neutral-700">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  )
}
