
import Link from 'next/link'
import Card from '@/components/Card';

export default function Home() {
    const Icon = (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 492 492" width="10" height="10"><g width="100%" height="100%" transform="matrix(1,0,0,1,0,0)"><g id="Master_Layer_2"></g><g id="Layer_1"><g><g><g><path clipRule="evenodd" d="m246.26 431.06c-24.881 0-49.02-4.874-71.747-14.487-21.949-9.284-41.661-22.573-58.587-39.5-16.926-16.925-30.216-36.637-39.499-58.586-9.613-22.727-14.487-46.866-14.487-71.747s4.874-49.02 14.486-71.747c9.284-21.949 22.573-41.661 39.5-58.587s36.638-30.216 58.587-39.5c22.727-9.612 46.865-14.486 71.747-14.486 24.881 0 49.02 4.874 71.747 14.486 21.949 9.284 41.66 22.573 58.587 39.5 16.926 16.926 30.216 36.638 39.5 58.587 9.612 22.727 14.486 46.865 14.486 71.747s-4.874 49.02-14.486 71.747c-9.284 21.949-22.573 41.66-39.5 58.587-16.926 16.927-36.638 30.216-58.587 39.5-22.727 9.612-46.866 14.486-71.747 14.486z" fill="#bcff2f" fillRule="evenodd" fillOpacity="1" data-original-color="#000000ff" stroke="none" strokeOpacity="1"></path></g></g></g></g></g></svg>
    );

    const cards = [
    {
        id: 1,
        name: "Earnbitmoon",
        logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/32196.png",
        headline: "💸 Free crypto - Instant withdraw!",
        category: "Faucet & PTC",
        badges: ["TOP"],
        highlight: "Claim up to $2 every 5 minutes",
        features: [
            "Level up & increase your reward",
            "View PTC ads & earn free crypto",
            "Surveys and Offerwalls",
            "Earn more with account upgrade",
            "Min. withdraw: $0.20 (Instant)",
            "FaucetPay and Payeer supported, You must complete at least 30",
            "faucet claims, before being able to withdraw your funds!"
        ],
        cta: "Earn Now",
        link: "https://earnbitmoon.club/?ref=423418"
    },
    {
        id: 2,
        name: "Gemsloot",
        logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/32112.png",
        headline: "🎉 Get paid for Playing Games!",
        category: "Offers & Surveys",
        badges: ["TOP", "GIFT"],
        highlight: "Sign up bonus! Win up to $250",
        features: [
        "10,000+ offers & surveys",
        "Exclusive VIP benefits & rewards"
        ],
        cta: "Earn Now",
        link: "https://freetoncoin.in/?ref=sukq8GZa3Z"
    },
    {
        id: 3,
        name: "CoinPayU",
        logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1507.png",
        headline: "🏆 $1000 Weekly Offer contest",
        category: "PTC & Tasks",
        badges: ["TOP"],
        highlight: "Earn up to $0.05 per PTC ad view",
        features: [
        "Browse ads to earn",
        "Best earnings offers & surveys"
        ],
        cta: "Earn Now",
        link: "https://www.coinpayu.com/?r=Biscore"
    },
    {
        id: 4,
        name: "LuckyWatch",
        logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/3865.png",
        headline: "📢 Earn more with 3 referral Tiers!",
        category: "Watch & Earn",
        badges: ["TOP"],
        highlight: "Earn money by watching videos",
        features: [
        "Boost income up to 50%",
        "Minimum withdraw $0.10"
        ],
        cta: "Earn Now",
        link: "https://usdpick.io/?ref=6HMOw9jA9-"
    }
    ]

    return (
        <>
            {/* TOP PROMO */}
            <section className="w-full bg-black">
                <div className="max-w-360 mx-auto px-4 sm:px-8 lg:px-20 py-12 sm:py-16 lg:py-22">
                    <div className="
                        grid
                        grid-cols-1
                        lg:grid-cols-[260px_1fr_260px]
                        items-center
                        gap-8
                        lg:gap-16
                        text-center
                        lg:text-left
                    ">

                        <div className="hidden lg:block bg-no-repeat bg-center bg-cover h-full relative">
                            <img
                                src="https://scalevance.com/wp-content/uploads/2025/12/Stake_300x250.gif"
                                alt=""
                                className="w-57.5 h-57.5 rounded-md"
                            />
                        </div>

                        <div className="flex flex-col items-center lg:items-stretch">
                            <div className="flex items-center justify-center gap-2.5 mb-3.5 text-center">
                                <Icon />
                                <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-white">
                                    TOP EARNING
                                </span>
                            </div>

                            <h1 className="text-white text-center font-['Unbounded',sans-serif] text-[28px] font-bold leading-[1.4] tracking-[1px]">
                            Best ways to earn
                            <span className="text-lime-400"> Free Crypto!</span>
                            </h1>

                            <p className="text-white/70 text-[15px] leading-[1.7] max-w-190 mx-auto lg:mx-0">
                            Explore the best legit ways to earn free crypto and real money today:
                            claim faucets, watch ads, play games, share traffic and get paid!
                            Withdraw instantly to best crypto wallets!
                            </p>
                        </div>

                        <div className="hidden lg:block bg-no-repeat bg-center bg-cover h-full relative">
                            <img
                                src="https://scalevance.com/wp-content/uploads/2024/03/Aff.-Banner_Chilli-Bang-Bang_300x250.gif"
                                alt=""
                                className="w-57.5 h-57.5 rounded-md"
                            />
                        </div>

                    </div>
                </div>
            </section>

            {/* GRID */}
            <div className="max-w-7xl mx-auto px-6 py-5">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map(({ id, ...card }) => (
                    <Card key={id} {...card} />
                    ))}
                </div>

                {/* CENTER BUTTON */}
                <div className="w-full flex items-center justify-center py-5 bg-[#f2f2f2]">
                    <Link
                        href={''}
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

            <div className="max-w-7xl mx-auto px-6 py-5">
                <div className="bg-black rounded-2xl px-6 py-12 text-center text-white">
                    <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wide mb-4">
                        <span className="w-2 h-2 rounded-full bg-lime-400"></span>
                        <span className="uppercase">Claim & Multiply</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                        Claim free faucet and multiply your reward.
                    </h2>
                    <p className="text-neutral-300 max-w-3xl mx-auto text-sm leading-relaxed mb-8">
                        Earn free crypto by using free faucet. Get 10 sign up bonus faucet rolls and play games to get more bonus rolls. Level up and increase your hourly faucet reward up to $5. Instant withdraw to your crypto wallet.
                    </p>
                    <button className="bg-lime-400 text-black font-bold px-6 py-3 rounded-xl inline-flex items-center gap-2 hover:brightness-105">
                        CLAIM FREE FAUCET & MULTIPLY <span>→</span>
                    </button>
                </div>
            </div>

            
        </>
    );
}
