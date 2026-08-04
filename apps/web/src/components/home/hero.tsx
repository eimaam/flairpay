import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from '../Button';
import heroCoins from '@flairpay/assets/images/hero-coins.png';
import { Link } from '@tanstack/react-router';

interface HeroProps {
  rate: number;
}

export const Hero = ({ rate: _rate }: HeroProps) => {
  return (
    <section className="relative overflow-y-hidden w-full h-[90vh] lg:min-h-screen flex flex-col items-center justify-between text-center overflow-hidden pt-16 md:pt-14 lg:pt-18">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center w-full z-10 flex-1 justify-center">
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl lg:text-[72px] font-sans font-extrabold tracking-tight text-primary leading-[1.1] mb-6"
        >
          Receive Crypto. <br />
          Get More Value. <br />
          Spend Instantly.
        </motion.h1>

        {/* Supporting Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed mb-10"
        >
          The smartest way to off-ramp. Convert at unbeatable rates and get instant Naira to fund virtual USD cards, pay bills or withdraw straight to your bank.
        </motion.p>

        <div className="flex flex-wrap gap-4 items-center justify-center">
            <Link to="/signin">
          <Button variant="default" size="lg" className="px-6 min-h-12 shadow-sm font-semibold">
            Open Your Account
          </Button>
            </Link>
          <Button variant="outline" size="lg" className="px-6 min-h-12 font-semibold">
            Compare Rates
            <svg className="w-4 h-4 ml-1 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0H8.25m11.25 0v1.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 21v-1.5M19.5 9.75h.008v.008h-.008V9.75Zm-3-3h.008v.008h-.008V6.75Z" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Main stacked coins visualization: continuous 360° rotation loop */}
      <div className="w-full max-w-5xl px-4 mt-8 z-0 flex justify-center pointer-events-none">
        <motion.img 
          src={heroCoins} 
          alt="FlairPay Circular Coins Ring" 
          animate={{ rotate: 360 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transformOrigin: 'center center' }}
          className="w-full h-auto max-h-[35vh] sm:max-h-[45vh] md:max-h-[55vh] lg:max-h-[65vh] object-contain mx-auto"
        />
      </div>

    </section>
  );
};

export default Hero;