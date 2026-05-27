import { prisma } from '@/app/lib/prisma'
import ContentForm from '@/components/admin/ContentForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Edit Platform - Admin Panel',
}

export default async function EditContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const contentId = Number(id)
  
  if (isNaN(contentId)) {
    notFound()
  }

  const content = await prisma.content.findUnique({
    where: { id: contentId },
    include: {
      currencies: true,
    },
  })

  if (!content) {
    notFound()
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  })
  
  const wallets = await prisma.wallet.findMany({
    orderBy: { provider: 'asc' }
  })

  const currencies = await prisma.currency.findMany({
    orderBy: { code: 'asc' }
  })

  return (
    <div className="flex flex-col gap-6 h-full animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Link 
          href="/admin/content" 
          className="p-2 bg-neutral-900 border border-white/5 hover:bg-white/5 text-neutral-400 hover:text-white rounded-xl transition-colors shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Platform</h1>
          <p className="text-neutral-400 text-sm mt-1">Editing details for {content.name}</p>
        </div>
      </div>

      <ContentForm initialData={content} categories={categories} wallets={wallets} currencies={currencies} />
      
    </div>
  )
}
