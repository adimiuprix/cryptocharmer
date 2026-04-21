import Image from "next/image";
import Link from "next/link";
import BannerNugmi from "../public/banner-nugmi.gif";

const Promo = () => {
    const Icon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 492 492" width="10" height="10"><g width="100%" height="100%" transform="matrix(1,0,0,1,0,0)"><g id="Master_Layer_2"></g><g id="Layer_1"><g><g><g><path clipRule="evenodd" d="m246.26 431.06c-24.881 0-49.02-4.874-71.747-14.487-21.949-9.284-41.661-22.573-58.587-39.5-16.926-16.925-30.216-36.637-39.499-58.586-9.613-22.727-14.487-46.866-14.487-71.747s4.874-49.02 14.486-71.747c9.284-21.949 22.573-41.661 39.5-58.587s36.638-30.216 58.587-39.5c22.727-9.612 46.865-14.486 71.747-14.486 24.881 0 49.02 4.874 71.747 14.486 21.949 9.284 41.66 22.573 58.587 39.5 16.926 16.926 30.216 36.638 39.5 58.587 9.612 22.727 14.486 46.865 14.486 71.747s-4.874 49.02-14.486 71.747c-9.284 21.949-22.573 41.66-39.5 58.587-16.926 16.927-36.638 30.216-58.587 39.5-22.727 9.612-46.866 14.486-71.747 14.486z" fill="#bcff2f" fillRule="evenodd" fillOpacity="1" data-original-color="#000000ff" stroke="none" strokeOpacity="1"></path></g></g></g></g></g></svg>
    );
    return (
        <>
            {/* TOP PROMO */}
            <section className="w-full bg-black">
                <div className="max-w-360 mx-auto px-4 sm:px-8 lg:px-20 py-12 sm:py-16 lg:py-10">
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
                            <Link href="https://nuggmi.com/ref/CryptoCharmer" target="_blank">
                                <Image
                                    src="https://nuggmi.com/images/square.gif"
                                    alt="Stake Promo"
                                    width={144}
                                    height={144}
                                    className="w-36 h-36 rounded-md object-cover"
                                />
                            </Link>
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

                            <p className="text-white/70 text-[15px] text-center leading-[1.7] max-w-190 mx-auto lg:mx-0">
                                Explore the best legit ways to earn free crypto and real money today:
                                claim faucets, watch ads, play games, share traffic and get paid!
                                Withdraw instantly to best crypto wallets!
                            </p>
                        </div>

                        <div className="hidden lg:block bg-no-repeat bg-center bg-cover h-full relative">
                            <Link href="https://nuggmi.com/ref/CryptoCharmer" target="_blank">
                                <Image
                                    src="https://nuggmi.com/images/square.gif"
                                    alt="Stake Promo"
                                    width={144}
                                    height={144}
                                    className="w-36 h-36 rounded-md object-cover"
                                />
                            </Link>
                        </div>

                    </div>

                    {/* WIDE BANNERS STACK */}
                    <div className="mt-16 flex flex-col gap-6">

                        <div className="w-full overflow-hidden rounded-md hover:border-1 hover:border-lime-400 transition-all duration-200">
                            <Link href="https://nuggmi.com/ref/CryptoCharmer" target="_blank">
                                <Image
                                    src={BannerNugmi}
                                    alt="Banner 1"
                                    width={1200}
                                    height={240}
                                    className="w-full h-auto object-cover"
                                />
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Promo