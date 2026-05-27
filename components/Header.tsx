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
                        <Link href={'/'}>CRYPTOCHARMER<span className="text-white">.XYZ</span></Link>
                    </div>

                    {/* DESKTOP MENU */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
                        <Link 
                            href={'/#'}
                            data-active={isActive("/#")}
                            className="
                                hover:opacity-100
                                data-[active=true]:text-lime-400
                                data-[active=true]:opacity-100
                        ">
                            TOP
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
                </nav>
            </div>
        </>
    );
}
