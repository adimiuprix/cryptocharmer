"use client"
import { useState } from "react"
import Image from "next/image"
import Modal from "@/components/Modal"

export type Currency = {
    code: string
    name: string
    icon: string
    network: string
}

export type Wallet = {
    type: string
    provider: string
    icon: string
    is_supported: boolean
}

export interface CardProps {
    name: string
    logo: string
    headline: string
    category: string
    badges: string[]
    highlight: string
    features: string[]
    link: string
    currencies: Currency[]
    wallet: Wallet
}

const Card = ({ name, logo, headline, category, badges, highlight, features, link, currencies, wallet }: CardProps) => {
    const [open, setOpen] = useState(false)
    const [modalData, setModalData] = useState<CardProps | null>(null);

    return (
        <>
            {/* CARD */}
            <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between relative">
                <div>
                    {/* BADGES */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                        {badges?.map((badge) => (
                            <span key={badge} className="inline-flex items-center gap-1.5 text-xs bg-neutral-100 px-2 py-0.5 rounded font-semibold">
                                <svg
                                    className="w-3 h-3"
                                    fill="currentColor"
                                    viewBox="0 0 512 512"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zM320 128c106 0 192-28.7 192-64S426 0 320 0 128 28.7 128 64s86 64 192 64zM0 300.4V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4zm416 11c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5v63.6zM192 160C86 160 0 195.8 0 240s86 80 192 80 192-35.8 192-80-86-80-192-80zm219.3 56.3c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2z" />
                                </svg>
                                <span>{badge}</span>
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-neutral-200">
                            <Image
                                className='w-12 h-12 rounded-xl'
                                src={logo?.startsWith('http') ? logo : logo?.startsWith('/') ? logo : `/${logo}`}
                                alt="logo"
                                width={48}
                                height={48}
                                unoptimized={!logo?.startsWith('http') && !logo?.startsWith('/')}
                            />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-bold text-lg leading-tight">{name}</h3>
                            <p className="text-xs text-neutral-500">{category}</p>
                        </div>
                    </div>

                    <p className="text-xs font-semibold mb-2">{headline}</p>
                    <div
                        className={`inline-flex items-center gap-1.5 text-black text-xs font-semibold px-3 py-1.5 rounded-lg mb-3 ${highlight === "Scam"
                            ? "bg-red-400/90"
                            : "bg-lime-400/90"
                            }`}
                    >
                        <svg
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3"
                        >
                            <path d="M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7.1-34z" />
                        </svg>
                        <span>{highlight}</span>
                    </div>
                    <ul className="text-sm space-y-1">
                        {features?.slice(0, 2).map((feature, i) => (
                            <li key={i} className='flex items-center gap-2'>
                                <svg aria-hidden="true" className="w-3 h-3" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                                </svg>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center gap-3 mt-6">
                    <button
                        onClick={() => {
                            setModalData({ name, logo, headline, category, badges, highlight, features, link, currencies, wallet });
                            setOpen(true);
                        }}
                        className="bg-neutral-100 px-5 py-2 rounded-lg text-sm font-medium flex items-center justify-center cursor-pointer"
                    >
                        Details
                    </button>
                    <button onClick={() => window.open(link, "_blank")} className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-1 cursor-pointer">
                        Earn Now
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="Layer_1"
                            width={13}
                            height={13}
                            viewBox="0 0 512 512"
                        >
                            <g transform="matrix(1,0,0,1,0,0)">
                                <linearGradient
                                    id="GradientFill_1"
                                    gradientUnits="userSpaceOnUse"
                                    x1="-28.65"
                                    y1="443.929"
                                    x2="347.209"
                                    y2="68.07"
                                >
                                    <stop offset="0.68" stopColor="#bcff2f" stopOpacity="1" />
                                    <stop offset="1" stopColor="#bcff2f" stopOpacity="1" />
                                </linearGradient>

                                <path
                                    d="m180.554 256-167.906 167.905a43.362 43.362 0 1 0 61.323 61.322l186.821-186.827c27.46-28.485 23.834-60.977.082-84.73l-186.9-186.9a43.362 43.362 0 0 0 -61.326 61.33zm64.034-167.905a43.361 43.361 0 0 1 61.322-61.322l186.9 186.9c23.753 23.753 27.378 56.245-.081 84.73l-186.819 186.824a43.361 43.361 0 1 1 -61.322-61.322l167.905-167.905z"
                                    fill="url(#GradientFill_1)"
                                    fillRule="evenodd"
                                    stroke="none"
                                    strokeOpacity="1"
                                />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>

            {open && (
                <Modal
                    open={open}
                    data={modalData}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    )
}

export default Card