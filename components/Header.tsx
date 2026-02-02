"use client"
import { useState } from "react"
import Link from 'next/link'
import { usePathname } from "next/navigation"

export default function Header() {
    const [open, setOpen] = useState(false)

    const pathname = usePathname()
    const isActive = (href: string) => pathname === href || (href !== "/#" && pathname.startsWith(href))

    return (
        <>
            {/* HEADER */}
            <header className="bg-black text-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* LOGO */}
                    <div className="text-xl font-extrabold tracking-wide">
                        <Link href={'/'}>SCALEVANCE<span className="text-white">.COM</span></Link>
                    </div>

                    {/* DESKTOP MENU */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
                        <Link 
                            href={'/#'}
                            data-active={isActive("/#")}
                            className="hidden
                                hover:opacity-100
                                data-[active=true]:text-lime-400
                                data-[active=true]:opacity-100
                        ">
                            TOP
                        </Link>
                        <Link
                            href={'/earn-crypto'}
                            data-active={isActive("/earn-crypto")}
                            className="
                                opacity-80 hover:opacity-100 cursor-pointer
                                data-[active=true]:text-lime-400
                                data-[active=true]:opacity-100
                            "
                        >
                            Earn Crypto
                        </Link>
                        <Link
                            href={'/claim-multiply'}
                            data-active={isActive("/claim-multiply")}
                            className="
                                opacity-80 hover:opacity-100 cursor-pointer
                                data-[active=true]:text-lime-400
                                data-[active=true]:opacity-100
                            "
                        >
                            Claim & Multiply
                        </Link>
                        <Link
                            href={'/passive-income'}
                            data-active={isActive("/passive-income")}
                            className="
                                opacity-80 hover:opacity-100 cursor-pointer
                                data-[active=true]:text-lime-400
                                data-[active=true]:opacity-100
                            "
                        >
                            Passive Income
                        </Link>
                        <Link
                            href={'/play-earn'}
                            data-active={isActive("/play-earn")}
                            className="
                                opacity-80 hover:opacity-100 cursor-pointer
                                data-[active=true]:text-lime-400
                                data-[active=true]:opacity-100
                            "
                        >
                            Play & Earn
                        </Link>
                        <Link
                            href={'/money-making-apps'}
                            data-active={isActive("/money-making-apps")}
                            className="
                                opacity-80 hover:opacity-100 cursor-pointer
                                data-[active=true]:text-lime-400
                                data-[active=true]:opacity-100
                            "
                        >
                            Earning Apps
                        </Link>
                        <Link
                            href={'/casinos'}
                            data-active={isActive("/casinos")}
                            className="
                                opacity-80 hover:opacity-100 cursor-pointer
                                data-[active=true]:text-lime-400
                                data-[active=true]:opacity-100
                            "
                        >
                            Free Spin
                        </Link>
                    </nav>

                    {/* TOGGLE BUTTON (HAMBURGER / CLOSE) */}
                    <button
                        onClick={() => setOpen(prev => !prev)}
                        aria-label="Toggle menu"
                        className="md:hidden w-[1.25em] h-[1.25em] flex items-center justify-center z-[60]"
                    >
                        {!open ? (
                        /* HAMBURGER ICON */
                        <svg viewBox="0 0 1000 1000" className="w-full h-full fill-white">
                            <path d="M104 333H896C929 333 958 304 958 271S929 208 896 208H104C71 208 42 237 42 271S71 333 104 333Z" />
                            <path d="M104 583H896C929 583 958 554 958 521S929 458 896 458H104C71 458 42 487 42 521S71 583 104 583Z" />
                            <path d="M104 833H896C929 833 958 804 958 771S929 708 896 708H104C71 708 42 737 42 771S71 833 104 833Z" />
                        </svg>
                        ) : (
                        /* CLOSE ICON (ELEMENTOR SVG) */
                        <svg
                            aria-hidden="true"
                            role="presentation"
                            viewBox="0 0 1000 1000"
                            className="w-full h-full fill-white"
                        >
                            <path d="M742 167L500 408 258 167C246 154 233 150 217 150 196 150 179 158 167 167 154 179 150 196 150 212 150 229 154 242 171 254L408 500 167 742C138 771 138 800 167 829 196 858 225 858 254 829L496 587 738 829C750 842 767 846 783 846 800 846 817 842 829 829 842 817 846 804 846 783 846 767 842 750 829 737L588 500 833 258C863 229 863 200 833 171 804 137 775 137 742 167Z" />
                        </svg>
                        )}
                    </button>
                </div>
            </header>

            {/* MOBILE MENU FULLSCREEN */}
            <div
                className={`fixed w-full bg-black z-40 transition-opacity duration-300 ${
                open ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            >
                <nav className="px-6 pb-6 space-y-6 text-sm font-semibold text-white">
                    <Link
                        href="/#"
                        aria-current={isActive("/#") ? "page" : undefined}
                        className="
                            block
                            opacity-80 hover:opacity-100 cursor-pointer
                            aria-[current=page]:text-lime-400
                            aria-[current=page]:opacity-100
                        "
                    >
                        TOP
                    </Link>
                    <Link
                        href="/earn-crypto"
                        aria-current={isActive("/earn-crypto") ? "page" : undefined}
                        className="
                            block
                            opacity-80 hover:opacity-100 cursor-pointer
                            aria-[current=page]:text-lime-400
                            aria-[current=page]:opacity-100
                        "
                    >
                        Earn Crypto
                    </Link>
                    <Link
                        href="/claim-multiply"
                        aria-current={isActive("/claim-multiply") ? "page" : undefined}
                        className="
                            block
                            opacity-80 hover:opacity-100 cursor-pointer
                            aria-[current=page]:text-lime-400
                            aria-[current=page]:opacity-100
                        "
                    >
                        Claim & Multiply
                    </Link>
                    <Link
                        href="/passive-income"
                        aria-current={isActive("/passive-income") ? "page" : undefined}
                        className="
                            block
                            opacity-80 hover:opacity-100 cursor-pointer
                            aria-[current=page]:text-lime-400
                            aria-[current=page]:opacity-100
                        "
                    >
                        Passive Income
                    </Link>
                    <Link
                        href="/play-earn"
                        aria-current={isActive("/play-earn") ? "page" : undefined}
                        className="
                            block
                            opacity-80 hover:opacity-100 cursor-pointer
                            aria-[current=page]:text-lime-400
                            aria-[current=page]:opacity-100
                        "
                    >
                        Play & Earn
                    </Link>
                    <Link
                        href="/money-making-apps"
                        aria-current={isActive("/money-making-apps") ? "page" : undefined}
                        className="
                            block
                            opacity-80 hover:opacity-100 cursor-pointer
                            aria-[current=page]:text-lime-400
                            aria-[current=page]:opacity-100
                        "
                    >
                        Earning Apps
                    </Link>
                    <Link
                        href="/casinos"
                        aria-current={isActive("/casinos") ? "page" : undefined}
                        className="
                            block
                            opacity-80 hover:opacity-100 cursor-pointer
                            aria-[current=page]:text-lime-400
                            aria-[current=page]:opacity-100
                        "
                    >
                        Free Spins
                    </Link>
                </nav>
            </div>
        </>
    );
}
