import Image from "next/image"
import { CardProps } from "@/components/Card"

type ModalProps = {
    open: boolean
    data: CardProps | null;
    onClose: () => void
}

const Modal = ({ open, data, onClose }: ModalProps) => {
    if (!open || !data) return null;

    return (
        <>
            {/* MODAL BACKDROP */}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
                {/* MODAL CARD */}
                <div className="w-full max-w-[315px] bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between relative">
                    <div>
                        <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 text-xs bg-neutral-100 px-2 py-0.5 rounded font-semibold">
                            <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zM320 128c106 0 192-28.7 192-64S426 0 320 0 128 28.7 128 64s86 64 192 64zM0 300.4V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4zm416 11c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5v63.6zM192 160C86 160 0 195.8 0 240s86 80 192 80 192-35.8 192-80-86-80-192-80zm219.3 56.3c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2z" />
                            </svg>
                            <span>TOP</span>
                        </span>

                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-neutral-200">
                                <Image
                                    className='w-12 h-12 rounded-xl'
                                    src={data.logo?.startsWith('http') ? data.logo : data.logo?.startsWith('/') ? data.logo : `/${data.logo}`}
                                    alt="Logo"
                                    width={48}
                                    height={48}
                                    unoptimized={!data.logo?.startsWith('http') && !data.logo?.startsWith('/')}
                                />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-bold text-lg leading-tight">{data.name}</h3>
                                <p className="text-xs text-neutral-500">{data.category}</p>
                            </div>
                        </div>

                        <p className="text-xs font-semibold mb-2">{data.headline}</p>
                        <div className="inline-flex items-center gap-1.5 bg-lime-400/90 text-black text-xs font-semibold px-3 py-1.5 rounded-lg mb-3">
                            <svg
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3"
                            >
                                <path d="M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7.1-34z" />
                            </svg>
                            <span>{data.highlight}</span>
                        </div>
                        <ul className="text-sm space-y-1">
                            {data.features.map((feature, i) => (
                                <li key={i} className='flex items-center gap-2'>
                                    <svg className="w-3 h-3 flex-none" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CURRENCIES */}
                    <div className="mb-4 pt-5">
                        <p className="text-xs font-bold mb-2">CURRENCIES & WALLET</p>
                        <div className="flex items-center gap-2">

                            {data.currencies?.map((c, idx) => {
                                let currency;
                                try {
                                    currency = typeof c === 'string' ? JSON.parse(c) : c;
                                } catch {
                                    return null;
                                }
                                if (!currency || !currency.code) return null;

                                return (
                                    <div key={`${currency.code}-${idx}`} className="w-6 h-6 rounded bg-gray-200 flex items-center justify-center">
                                        <Image
                                            src={currency.icon?.startsWith('http') ? currency.icon : currency.icon?.startsWith('/') ? currency.icon : `/${currency.icon}`}
                                            alt={currency.name}
                                            width={24}
                                            height={24}
                                            unoptimized={!currency.icon?.startsWith('http') && !currency.icon?.startsWith('/')}
                                        />
                                    </div>
                                );
                            }) || <span className="text-xs text-neutral-400">No currencies</span>}

                            <span className="ml-auto inline-flex items-center gap-1.5 text-xs bg-neutral-100 px-2 py-1 rounded">
                                <svg className="w-3 h-3 fill-current" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path></svg>
                                {data.wallet.provider}
                            </span>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="cursor-pointer flex-1 bg-neutral-200 text-black py-2 rounded-xl font-semibold flex items-center justify-center gap-2"
                        >
                            <svg
                                className="w-3 h-3 fill-black"
                                viewBox="0 0 352 512"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
                            </svg>
                            <span>Close</span>
                        </button>
                        <button onClick={() => window.open(data.link, "_blank")} className="cursor-pointer flex-1 bg-black text-white py-2 rounded-xl font-semibold inline-flex items-center justify-center gap-2">
                            <span>Sign Up</span>
                            <svg
                                className="w-4 h-4 fill-white"
                                viewBox="0 0 448 512"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
                            </svg>
                        </button>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Modal