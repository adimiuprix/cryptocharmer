'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Loader2 } from 'lucide-react'
import { deleteContent } from '@/app/actions/admin'

export default function DeleteButton({ id, name }: { id: number; name: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      setIsDeleting(true)
      const res = await deleteContent(id)
      if (!res.success) {
        alert(res.error || 'Failed to delete content')
        setIsDeleting(false)
        return
      }
      router.refresh()
      setIsDeleting(false)
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 bg-neutral-800 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 rounded-lg transition-colors border border-transparent hover:border-red-500/30 disabled:opacity-50"
      title="Delete"
    >
      {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  )
}
