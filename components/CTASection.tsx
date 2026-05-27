type CTASectionProps = {
    title: string
    badgeText?: string
    description: string
}

const CTASection = ({title, badgeText, description}: CTASectionProps) => {
    return(
        <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="bg-black rounded-2xl px-6 py-6 text-center text-white">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wide mb-4">
                    <span className="w-2 h-2 rounded-full bg-lime-400"></span>
                    <span className="uppercase">{badgeText}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{title}</h2>
                <p className="text-neutral-300 max-w-3xl mx-auto text-sm leading-relaxed mb-8">{description}</p>
            </div>
        </div>
    )
}

export default CTASection