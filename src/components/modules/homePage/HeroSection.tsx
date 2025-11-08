import { Link } from "react-router";
import heroSection from "./../../../assets/images/Banner/Banner.png"

const HeroSection = () => {
    return (
        <div>
            <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[60vh]">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-slate-900 dark:text-white transition-all">
              Secure, Fast, and Local-Friendly Transfers for Everyone.
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl">
              CashTk brings safe wallet, agent cash-in / out, and admin tools under one roof — built for real businesses and fast scaling.
            </p>

            <div className="flex gap-3">
              <Link to="/register" className="inline-flex">
                <button className="px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-primary-dark transition">
                  Create account
                </button>
              </Link>

              <Link to="/features" className="inline-flex">
                <button className="px-6 py-3 rounded-md border border-slate-200 text-sm hover:bg-slate-50 transition">
                  Explore features
                </button>
              </Link>
            </div>

            <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              <strong>No hidden fees</strong> · Seamless onboarding · 24/7 support
            </div>
          </div>

          {/* hero image / illustration (replace with real image) */}
          {/* Hero image / illustration */}
           <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
                <div className="relative group overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-tr from-primary/30 to-primary/10 transition-all duration-500 hover:shadow-primary/40 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                    src={heroSection}
                    alt="Hero Illustration"
                    className="w-full h-auto object-contain p-6 md:p-8 lg:p-10"
                />
                </div>
            </div>
            </div>

        </div>
      </div> 
    </section>
        </div>
    );
};

export default HeroSection;