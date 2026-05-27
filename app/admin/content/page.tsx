import { prisma } from '@/app/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit2, Trash2, ExternalLink, Database } from 'lucide-react'
import DeleteButton from '@/components/admin/DeleteButton'

export const metadata = {
  title: 'Content Management - Admin Panel',
}

export default async function ContentManagementPage() {
  const contents = await prisma.content.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      wallet: true,
    }
  })

  return (
    <div className="flex flex-col gap-6 h-full animate-in fade-in slide-in-from-bottom-8 duration-700">

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-900/40 backdrop-blur-xl p-6 rounded-3xl border border-white/5 shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Management</h1>
          <p className="text-neutral-400 text-sm mt-1">Manage all platforms available on the website.</p>
        </div>

        <Link
          href="/admin/content/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-xl font-semibold transition-colors shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)]"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Platform</span>
        </Link>
      </div>

      {/* Main Table */}
      <div className="bg-neutral-900/40 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden flex-1">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm text-neutral-300">
            <thead className="text-xs text-neutral-500 uppercase bg-black/20 border-b border-white/5">
              <tr>
                <th className="px-6 py-5 font-medium tracking-wider">Platform</th>
                <th className="px-6 py-5 font-medium tracking-wider">Category</th>
                <th className="px-6 py-5 font-medium tracking-wider">Wallet</th>
                <th className="px-6 py-5 font-medium tracking-wider">Status</th>
                <th className="px-6 py-5 font-medium tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {contents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-neutral-500">
                      <Database className="w-12 h-12 mb-4 opacity-20" />
                      <p>No platforms found in the database.</p>
                      <Link href="/admin/content/new" className="text-emerald-500 hover:underline mt-2">Create the first one</Link>
                    </div>
                  </td>
                </tr>
              ) : (
                contents.map((content) => (
                  <tr key={content.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center overflow-hidden shrink-0 border border-neutral-700/50 group-hover:border-emerald-500/30 transition-colors">
                          {content.logo ? (
                            <Image
                              src={content.logo.startsWith('http') ? content.logo : `https://daenabjkvmvbwcumjllq.supabase.co/storage/v1/object/public/charmer/content-images/${content.logo}`}
                              alt={content.name}
                              width={48} height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="font-bold text-neutral-500 text-lg">{content.name.charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-base flex items-center gap-2">
                            {content.name}
                            {content.link && (
                              <a href={content.link} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-emerald-400 transition-colors" title="Visit Link">
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                          <div className="text-xs text-neutral-500 mt-1 max-w-[200px] truncate" title={content.headline || ''}>
                            {content.headline || 'No headline'}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1.5 bg-neutral-950 text-neutral-300 rounded-lg text-xs font-medium border border-neutral-800">
                        {content.category?.name || 'None'}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-neutral-400">
                        {content.wallet?.provider ? (
                          <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md text-xs border border-blue-500/20">
                            {content.wallet.provider}
                          </span>
                        ) : (
                          <span className="text-xs italic opacity-50">-</span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${content.highlight === 'Paying' ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-500'}`} />
                        <span className={`text-xs font-medium ${content.highlight === 'Paying' ? 'text-emerald-400' : 'text-neutral-400'}`}>
                          {content.highlight || 'Normal'}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/content/${content.id}/edit`}
                          className="p-2 bg-neutral-800 hover:bg-emerald-500/20 text-neutral-400 hover:text-emerald-400 rounded-lg transition-colors border border-transparent hover:border-emerald-500/30"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>

                        <DeleteButton id={content.id} name={content.name} />
                      </div>
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
