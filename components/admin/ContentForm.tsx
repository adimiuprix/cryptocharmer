'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createContent, updateContent } from '@/app/actions/admin'
import { uploadLogo } from '@/app/actions'
import { Loader2, Plus, X, UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react'
import Image from 'next/image'

type Category = { id: number; name: string }
type Wallet = { id: number; provider: string }
type Currency = { id: number; code: string; name: string; icon: string | null; network: string | null }

type ContentFormProps = {
  initialData?: any
  categories: Category[]
  wallets: Wallet[]
  currencies: Currency[]
}

export default function ContentForm({ initialData, categories, wallets, currencies }: ContentFormProps) {
  const router = useRouter()
  const isEditing = !!initialData
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [logoUrl, setLogoUrl] = useState<string>(initialData?.logo || '')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [badges, setBadges] = useState<string[]>(initialData?.badges || [])
  const [badgeInput, setBadgeInput] = useState('')
  
  const [features, setFeatures] = useState<string[]>(initialData?.features || [])
  const [featureInput, setFeatureInput] = useState('')

  const [selectedCurrencyIds, setSelectedCurrencyIds] = useState<number[]>(
    initialData?.currencies?.map((cc: { currencyId: number }) => cc.currencyId) ?? []
  )

  const toggleCurrency = (currencyId: number) => {
    setSelectedCurrencyIds((prev) =>
      prev.includes(currencyId)
        ? prev.filter((id) => id !== currencyId)
        : [...prev, currencyId]
    )
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)
    
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const res = await uploadLogo(formData)
      if (res.success && res.url) {
        setLogoUrl(res.url)
      } else {
        setError(res.error || 'Failed to upload image')
      }
    } catch (err: any) {
      setError(err.message || 'Error uploading file')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const addBadge = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault()
    if (badgeInput.trim() && !badges.includes(badgeInput.trim())) {
      setBadges([...badges, badgeInput.trim()])
      setBadgeInput('')
    }
  }

  const addFeature = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault()
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures([...features, featureInput.trim()])
      setFeatureInput('')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    formData.append('logoUrl', logoUrl)
    formData.append('badges', JSON.stringify(badges))
    formData.append('features', JSON.stringify(features))
    formData.append('currencyIds', JSON.stringify(selectedCurrencyIds))
    
    try {
      const res = isEditing 
        ? await updateContent(initialData.id, formData)
        : await createContent(formData)
        
      if (res.success) {
        router.push('/admin/content')
        router.refresh()
      } else {
        setError(res.error || 'Failed to save content')
        setLoading(false)
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 bg-neutral-900/40 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-2xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Basic Info */}
        <div className="flex flex-col gap-5">
          <h3 className="text-lg font-semibold text-white border-b border-white/5 pb-2">Basic Information</h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300 ml-1">Platform Name *</label>
            <input 
              name="name"
              defaultValue={initialData?.name}
              required
              className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl py-3 px-4 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              placeholder="e.g. FreeBitco.in"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300 ml-1">Headline (Short Description)</label>
            <input 
              name="headline"
              defaultValue={initialData?.headline}
              className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl py-3 px-4 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              placeholder="e.g. Win free BTC every hour"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300 ml-1">Category *</label>
              <select 
                name="categoryId"
                defaultValue={initialData?.categoryId || ''}
                required
                className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all appearance-none"
              >
                <option value="" disabled>Select category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300 ml-1">Wallet Option</label>
              <select 
                name="walletId"
                defaultValue={initialData?.walletId || ''}
                className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all appearance-none"
              >
                <option value="">No specific wallet</option>
                {wallets.map(w => <option key={w.id} value={w.id}>{w.provider}</option>)}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300 ml-1">Status / Highlight</label>
              <select 
                name="highlight"
                defaultValue={initialData?.highlight || 'Paying'}
                className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all appearance-none"
              >
                <option value="Paying">Paying</option>
                <option value="Scam">Scam</option>
                <option value="Testing">Testing</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300 ml-1">Referral Link</label>
              <input 
                name="link"
                defaultValue={initialData?.link}
                type="url"
                className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl py-3 px-4 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
        
        {/* Right Column: Media & Meta */}
        <div className="flex flex-col gap-5">
          <h3 className="text-lg font-semibold text-white border-b border-white/5 pb-2">Media & Details</h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300 ml-1">Platform Logo</label>
            <div className="flex items-start gap-4 p-4 bg-neutral-950/30 border border-neutral-800 border-dashed rounded-2xl">
              <div className="w-20 h-20 bg-neutral-900 rounded-xl border border-neutral-800 flex items-center justify-center overflow-hidden shrink-0 relative">
                {isUploading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
                ) : logoUrl ? (
                  <Image 
                    src={logoUrl.startsWith('http') ? logoUrl : `https://daenabjkvmvbwcumjllq.supabase.co/storage/v1/object/public/charmer/content-images/${logoUrl}`} 
                    alt="Preview" 
                    fill 
                    className="object-cover" 
                  />
                ) : (
                  <span className="text-xs text-neutral-500">No Image</span>
                )}
              </div>
              <div className="flex-1">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept="image/png, image/jpeg, image/webp" 
                />
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-sm font-medium text-white rounded-xl transition-colors disabled:opacity-50"
                >
                  <UploadCloud className="w-4 h-4" /> Upload New Image
                </button>
                <p className="text-xs text-neutral-500 mt-2">Recommended: Square PNG/WEBP, max 2MB. Image will be saved to Supabase Storage.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300 ml-1">Supported Currencies</label>
            <div className="flex flex-wrap gap-2">
              {currencies.map((currency) => {
                const selected = selectedCurrencyIds.includes(currency.id)
                return (
                  <button
                    key={currency.id}
                    type="button"
                    onClick={() => toggleCurrency(currency.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                      selected
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-neutral-950/50 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <span>{currency.code}</span>
                    {currency.network && (
                      <span className="text-neutral-500 font-normal">({currency.network})</span>
                    )}
                  </button>
                )
              })}
              {currencies.length === 0 && (
                <span className="text-xs text-neutral-600 italic">No currencies in database. Run seed first.</span>
              )}
            </div>
            {selectedCurrencyIds.length > 0 && (
              <p className="text-xs text-neutral-500 mt-1">
                {selectedCurrencyIds.length} selected
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300 ml-1">Badges</label>
            <div className="flex gap-2 mb-2">
              <input 
                value={badgeInput}
                onChange={e => setBadgeInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addBadge(e)}
                className="flex-1 bg-neutral-950/50 border border-neutral-800 rounded-xl py-2 px-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50 transition-all"
                placeholder="e.g. Fast Withdraw"
              />
              <button 
                type="button" 
                onClick={addBadge}
                className="px-3 bg-neutral-800 hover:bg-emerald-500/20 text-neutral-300 hover:text-emerald-400 rounded-xl transition-colors border border-transparent hover:border-emerald-500/30"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {badges.map((b, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-medium">
                  {b}
                  <button type="button" onClick={() => setBadges(badges.filter((_, index) => index !== i))} className="hover:text-red-400 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {badges.length === 0 && <span className="text-xs text-neutral-600 italic">No badges added yet.</span>}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300 ml-1">Features (Checklist)</label>
            <div className="flex gap-2 mb-2">
              <input 
                value={featureInput}
                onChange={e => setFeatureInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addFeature(e)}
                className="flex-1 bg-neutral-950/50 border border-neutral-800 rounded-xl py-2 px-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50 transition-all"
                placeholder="e.g. Free registration"
              />
              <button 
                type="button" 
                onClick={addFeature}
                className="px-3 bg-neutral-800 hover:bg-emerald-500/20 text-neutral-300 hover:text-emerald-400 rounded-xl transition-colors border border-transparent hover:border-emerald-500/30"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              {features.map((f, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2 bg-neutral-950/50 border border-neutral-800 rounded-lg text-sm text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{f}</span>
                  </div>
                  <button type="button" onClick={() => setFeatures(features.filter((_, index) => index !== i))} className="text-neutral-500 hover:text-red-400 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {features.length === 0 && <span className="text-xs text-neutral-600 italic">No features added yet.</span>}
            </div>
          </div>

        </div>
      </div>

      <div className="flex justify-end gap-4 mt-4 border-t border-white/5 pt-6">
        <button 
          type="button" 
          onClick={() => router.push('/admin/content')}
          className="px-6 py-3 rounded-xl font-medium text-neutral-400 hover:text-white bg-transparent hover:bg-white/5 transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={loading || isUploading}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white rounded-xl font-semibold transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
          <span>{isEditing ? 'Save Changes' : 'Create Platform'}</span>
        </button>
      </div>
    </form>
  )
}
