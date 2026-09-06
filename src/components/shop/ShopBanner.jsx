import { Bike, Car, Laptop, ShoppingBag, Smartphone, Sparkles } from 'lucide-react'

function ShopBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#3B176F] via-primary to-[#A78BFA] px-5 py-8 text-white sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute -bottom-8 -right-10 h-44 w-44 text-white/35 sm:bottom-0 sm:right-8 sm:h-64 sm:w-64 sm:text-white/55 lg:right-[max(3rem,calc((100vw-64rem)/2))]">
        <ShoppingBag className="absolute bottom-2 left-8 drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]" size={80} strokeWidth={1.5} />
        <Smartphone className="absolute bottom-12 left-0 -rotate-12 drop-shadow-[0_0_12px_rgba(255,255,255,0.35)] sm:bottom-16" size={48} strokeWidth={1.5} />
        <Laptop className="absolute bottom-20 right-0 rotate-12 drop-shadow-[0_0_12px_rgba(255,255,255,0.35)] sm:bottom-28" size={58} strokeWidth={1.5} />
        <Car className="absolute top-7 right-8 -rotate-6 drop-shadow-[0_0_12px_rgba(255,255,255,0.35)] sm:top-8" size={46} strokeWidth={1.5} />
        <Bike className="absolute top-0 left-9 rotate-6 drop-shadow-[0_0_12px_rgba(255,255,255,0.35)] sm:left-12" size={48} strokeWidth={1.5} />
      </div>
      <div className="mx-auto w-full md:max-w-2xl">
        <div className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
          <Sparkles size={14} aria-hidden="true" />
          <span>NO-COST EMIS</span>
        </div>

        <h1 className="relative z-10 mt-5 max-w-[18rem] text-3xl leading-tight tracking-tight sm:max-w-xl sm:text-4xl">
          <span className="block font-bold">Shop today,</span>
          <span className="block font-semibold italic">Pay later using</span>
          <span className="block text-4xl font-bold sm:text-5xl">Mutual funds.</span>
        </h1>

        <p className="relative z-10 mt-4 max-w-[17rem] text-sm leading-6 text-white/70 sm:max-w-lg">
          No credit score required. No interest. Backed by your investments.
        </p>
      </div>
    </section>
  )
}

export default ShopBanner
