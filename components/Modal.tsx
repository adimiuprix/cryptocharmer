import Image from "next/image"

type ModalProps = {
    open: boolean
    onClose: () => void
}

const Modal = ({ open, onClose }: ModalProps) => {
    if (!open) return null

    return(
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
                                    src="/noname.webp"
                                    alt="Logo"
                                    width={48}
                                    height={48}
                                />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-bold text-lg leading-tight">Cointiply</h3>
                                <p className="text-xs text-neutral-500">PTC & OFFERS</p>
                            </div>
                        </div>
            
                        <p className="text-xs font-semibold mb-2">FREE CRYPTO - INSTANT WITHDRAW!</p>
                        <div className="inline-flex items-center gap-1.5 bg-lime-400/90 text-black text-xs font-semibold px-3 py-1.5 rounded-lg mb-3">
                            <svg
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3"
                            >
                                <path d="M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7.1-34z" />
                            </svg>
                            <span>Claim up to $2 every 5 minutes</span>
                        </div>
                        <ul className="text-sm space-y-1">
                            <li className='flex items-center gap-2'>
                                <svg aria-hidden="true" className="w-3 h-3" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                                </svg>
                                Level up & increase your reward
                            </li>
                            <li className='flex items-center gap-2'>
                                <svg aria-hidden="true" className="w-3 h-3" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                                </svg>
                                Level up & increase your reward
                            </li>
                        </ul>
                    </div>

                    {/* CURRENCIES */}
                    <div className="mb-4 pt-5">
                        <p className="text-xs font-bold mb-2">CURRENCIES & WALLET</p>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-orange-500">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" width="100%" height="100%" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 4091.27 4091.73"> <g id="Layer_x0020_1">  <metadata id="CorelCorpID_0Corel-Layer"></metadata>  <g id="_1421344023328">   <path fill="#F7931A" fillRule="nonzero" d="M4030.06 2540.77c-273.24,1096.01 -1383.32,1763.02 -2479.46,1489.71 -1095.68,-273.24 -1762.69,-1383.39 -1489.33,-2479.31 273.12,-1096.13 1383.2,-1763.19 2479,-1489.95 1096.06,273.24 1763.03,1383.51 1489.76,2479.57l0.02 -0.02z"></path>   <path fill="white" fillRule="nonzero" d="M2947.77 1754.38c40.72,-272.26 -166.56,-418.61 -450,-516.24l91.95 -368.8 -224.5 -55.94 -89.51 359.09c-59.02,-14.72 -119.63,-28.59 -179.87,-42.34l90.16 -361.46 -224.36 -55.94 -92 368.68c-48.84,-11.12 -96.81,-22.11 -143.35,-33.69l0.26 -1.16 -309.59 -77.31 -59.72 239.78c0,0 166.56,38.18 163.05,40.53 90.91,22.69 107.35,82.87 104.62,130.57l-104.74 420.15c6.26,1.59 14.38,3.89 23.34,7.49 -7.49,-1.86 -15.46,-3.89 -23.73,-5.87l-146.81 588.57c-11.11,27.62 -39.31,69.07 -102.87,53.33 2.25,3.26 -163.17,-40.72 -163.17,-40.72l-111.46 256.98 292.15 72.83c54.35,13.63 107.61,27.89 160.06,41.3l-92.9 373.03 224.24 55.94 92 -369.07c61.26,16.63 120.71,31.97 178.91,46.43l-91.69 367.33 224.51 55.94 92.89 -372.33c382.82,72.45 670.67,43.24 791.83,-303.02 97.63,-278.78 -4.86,-439.58 -206.26,-544.44 146.69,-33.83 257.18,-130.31 286.64,-329.61l-0.07 -0.05zm-512.93 719.26c-69.38,278.78 -538.76,128.08 -690.94,90.29l123.28 -494.2c152.17,37.99 640.17,113.17 567.67,403.91zm69.43 -723.3c-63.29,253.58 -453.96,124.75 -580.69,93.16l111.77 -448.21c126.73,31.59 534.85,90.55 468.94,355.05l-0.02 0z"></path>  </g> </g></svg>
                            </div>
                            <div className="w-6 h-6 rounded bg-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 82.6 82.6"><circle cx="41.3" cy="41.3" r="36.83" style={{ fill: "#fff" }}></circle><path d="M41.3,0A41.3,41.3,0,1,0,82.6,41.3h0A41.18,41.18,0,0,0,41.54,0ZM42,42.7,37.7,57.2h23a1.16,1.16,0,0,1,1.2,1.12v.38l-2,6.9a1.49,1.49,0,0,1-1.5,1.1H23.2l5.9-20.1-6.6,2L24,44l6.6-2,8.3-28.2a1.51,1.51,0,0,1,1.5-1.1h8.9a1.16,1.16,0,0,1,1.2,1.12v.38L43.5,38l6.6-2-1.4,4.8Z" style={{ fill:'#345d9d' }}></path></svg>
                            </div>
                            <div className="w-6 h-6 rounded bg-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.00 24.00" fill="none" stroke="#ffffff" strokeWidth="0.24000000000000005"><g id="SVGRepo_bgCarrier" strokeWidth="0"><rect x="0" y="0" width="24.00" height="24.00" rx="6" fill="#ea0028"></rect></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fillRule="evenodd" clipRule="evenodd" d="M4.6109 4.68601C4.72546 4.54406 4.90822 4.47575 5.0878 4.50778L16.575 6.55656C16.6715 6.57377 16.7608 6.61896 16.8318 6.68651L19.3446 9.07676C19.5379 9.26064 19.5528 9.5639 19.3784 9.76583L11.122 19.3268C11.0084 19.4583 10.8347 19.5214 10.6632 19.4935C10.4917 19.4656 10.347 19.3506 10.281 19.1898L4.53742 5.18979C4.46819 5.02103 4.49635 4.82796 4.6109 4.68601ZM6.19646 6.59904L10.4853 17.053L11.2894 10.6786L6.19646 6.59904ZM12.2688 10.9045L11.4468 17.4207L17.7491 10.1226L12.2688 10.9045ZM17.9075 9.08986L13.7298 9.68594L16.4453 7.69901L17.9075 9.08986ZM15.2483 7.33573L6.84451 5.83688L11.8343 9.83381L15.2483 7.33573Z" fill="#ffffff"></path></g></svg>
                            </div>
                            <div className="w-6 h-6 rounded bg-yellow-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="-3.2 -3.2 38.40 38.40"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><title>binance</title><path d="M15.986 1.019l9.189 9.159-3.396 3.393-5.793-5.793-5.793 5.823-3.396-3.393 9.189-9.189zM4.399 12.605l3.365 3.395-3.363 3.365-3.396-3.365zM15.986 12.607l3.394 3.363-3.395 3.395-3.395-3.365 3.395-3.393zM27.572 12.605l3.423 3.395-3.393 3.395-3.395-3.395zM21.778 18.399l3.396 3.393-9.189 9.189-9.189-9.187 3.396-3.395 5.793 5.823 5.793-5.823z"></path></g></svg>
                            </div>
                            <div className="w-6 h-6 rounded bg-amber-400">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="white" id="Layer_1" viewBox="-68.03 -68.03 362.84 362.84" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="DOGE_alt_1_" d="M99.24-0.054c-15.421,0-65.182,0-65.182,0v100.975H7.287v24.732h26.772v100.975h75.95 c0,0,106.792,8.947,106.792-111.45C216.801-3.256,114.663-0.054,99.24-0.054z M108.262,184.725c-8.074,0-31.428,0-31.428,0v-59.071 h47.141v-24.732H76.834V41.849c0,0,18.768,0,29.972,0c11.204,0,67.582,4.509,67.668,74.148 C174.562,185.635,116.335,184.725,108.262,184.725z"></path> </g></svg>
                            </div>
                            <span className="ml-auto inline-flex items-center gap-1.5 text-xs bg-neutral-100 px-2 py-1 rounded">
                                <svg className="w-3 h-3 fill-current" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path></svg>
                                Binance
                            </span>
                        </div>
                    </div>
                    {/* ACTIONS */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 bg-neutral-200 text-black py-2 rounded-xl font-semibold flex items-center justify-center gap-2"
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
                        <button className="flex-1 bg-black text-white py-2 rounded-xl font-semibold inline-flex items-center justify-center gap-2">
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