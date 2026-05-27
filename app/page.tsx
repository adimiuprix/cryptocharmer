'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Promo from '@/components/Promo'
import Card from '@/components/Card'
import CTASection from '@/components/CTASection'

type Currency = {
    code: string
    name: string
    icon: string
    network: string
}

type Wallet = {
    type: string
    provider: string
    icon: string
    is_supported: boolean
}

type CardItem = {
    id: number
    name: string
    logo: string
    headline: string
    category: string
    badges: string[]
    highlight: string
    features: string[]
    currencies: Currency[]
    wallet: Wallet
    link: string
}

export default function Home() {
    const [cards, setCards] = useState<CardItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const res = await fetch('/api/contents')
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()


                const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

                const transformed = data.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    logo: item.logo?.startsWith('http')
                        ? item.logo
                        : item.logo
                            ? `${SUPABASE_URL}/storage/v1/object/public/charmer/content-images/${item.logo}`
                            : '',
                    headline: item.headline,
                    category: item.category?.name || '',
                    badges: item.badges || [],
                    highlight: item.highlight || 'Paying',
                    features: item.features || [],
                    link: item.link || '',
                    currencies: item.currencies?.map((cc: any) => ({
                        code: cc.currency?.code || '',
                        name: cc.currency?.name || '',
                        icon: cc.currency?.icon || '',
                        network: cc.currency?.network || '',
                    })) || [],
                    wallet: {
                        type: 'Wallet',
                        provider: item.wallet?.provider || 'Unknown',
                        icon: '',
                        is_supported: item.wallet?.isSupported ?? true,
                    }
                }))

                setCards(transformed)
            } catch (err) {
                console.error("Failed to load cards:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchCards()
    }, [])

    if (loading) {
        return (
            <>
                <Promo />
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm animate-pulse h-64 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-neutral-200" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-neutral-200 rounded w-2/3" />
                                            <div className="h-3 bg-neutral-200 rounded w-1/3" />
                                        </div>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        <div className="h-3 bg-neutral-200 rounded w-full" />
                                        <div className="h-3 bg-neutral-200 rounded w-5/6" />
                                    </div>
                                    <div className="h-6 bg-neutral-200 rounded-lg w-16 mb-4" />
                                    <div className="space-y-1.5">
                                        <div className="h-3 bg-neutral-200 rounded w-4/5" />
                                        <div className="h-3 bg-neutral-200 rounded w-3/4" />
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <div className="h-9 bg-neutral-200 rounded-lg flex-1" />
                                    <div className="h-9 bg-neutral-200 rounded-lg flex-1" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Promo />
            {/* GRID */}
            <div className="max-w-7xl mx-auto px-6 py-5">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards
                        .filter(card => ['Mining', 'Hyip'].includes(card.category))
                        .slice(0, 100)
                        .map(card => (
                            <Card key={card.id} {...card} />
                        ))}
                </div>

                {/* CENTER BUTTON */}
                <div className="w-full flex items-center justify-center py-3">
                    <Link
                        href="#"
                        className="
                            bg-white
                            border border-neutral-200
                            rounded-xl
                            px-6 py-3
                            text-sm font-semibold
                            flex items-center gap-2
                            shadow-sm

                            text-neutral-700
                            hover:text-white
                            hover:bg-black
                            hover:border-black

                            transition-colors
                            duration-300
                            ease-in-out"
                    >
                        <svg
                            className="hover:text-white transition-colors duration-300"
                            fill="currentColor"
                            width="15"
                            height="15"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zM320 128c106 0 192-28.7 192-64S426 0 320 0 128 28.7 128 64s86 64 192 64zM0 300.4V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4zm416 11c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5v63.6zM192 160C86 160 0 195.8 0 240s86 80 192 80 192-35.8 192-80-86-80-192-80zm219.3 56.3c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2z" />
                        </svg>
                        MORE PASSIVE INCOME WEBSITES
                    </Link>
                </div>
            </div>
            <CTASection
                badgeText='Claim & Multiply'
                title='Claim free faucet and multiply your reward.'
                description='Earn free crypto by using free faucet. Get 10 sign up bonus faucet rolls and play games to get more bonus rolls. Level up and increase your hourly faucet reward up to $5. Instant withdraw to your crypto wallet.'
            />
            {/* GRID */}
            <div className="max-w-7xl mx-auto px-6 py-5">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards
                        .filter(card => ['Faucet & PTC', 'Offers & Surveys', 'PTC & Tasks', 'Watch & Earn'].includes(card.category))
                        .slice(0, 8)
                        .map(card => (
                            <Card key={card.id} {...card} />
                        ))}
                </div>

                {/* CENTER BUTTON */}
                <div className="w-full flex items-center justify-center py-3">
                    <Link
                        href={'/earn-crypto'}
                        className="
                            bg-white
                            border border-neutral-200
                            rounded-xl
                            px-6 py-3
                            text-sm font-semibold
                            flex items-center gap-2
                            shadow-sm

                            text-neutral-700
                            hover:text-white
                            hover:bg-black
                            hover:border-black

                            transition-colors
                            duration-300
                            ease-in-out"
                    >
                        <svg
                            className="hover:text-white transition-colors duration-300"
                            fill="currentColor"
                            width="15"
                            height="15"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zM320 128c106 0 192-28.7 192-64S426 0 320 0 128 28.7 128 64s86 64 192 64zM0 300.4V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4zm416 11c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5v63.6zM192 160C86 160 0 195.8 0 240s86 80 192 80 192-35.8 192-80-86-80-192-80zm219.3 56.3c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2z" />
                        </svg>
                        MORE PASSIVE INCOME WEBSITES
                    </Link>
                </div>
            </div>
        </>
    );
}
