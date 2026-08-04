import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';
import { Logo, cn } from '@flairpay/shared';
import { Link } from '@tanstack/react-router';
import {
  HiChevronDown,
  HiArrowRight,
  HiBars3,
  HiXMark,
  HiCheck
} from 'react-icons/hi2';

// Icon Components mapped to react-icons/hi2
const ArrowDown = ({ className }: { className?: string }) => (
  <HiChevronDown className={cn("w-4 h-4 transition-transform duration-200", className)} />
);

const ArrowRight = ({ className }: { className?: string }) => (
  <HiArrowRight className={cn("w-4 h-4 inline-block transition-transform group-hover:translate-x-1", className)} />
);

const MenuIcon = () => (
  <HiBars3 className="w-6 h-6" />
);

const CloseIcon = () => (
  <HiXMark className="w-6 h-6" />
);

const CheckIcon = () => (
  <HiCheck className="w-4 h-4 text-emerald-600 shrink-0" />
);

const BulletIcon = () => (
  <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block shrink-0"></span>
);

interface NavProps {
  rate?: number;
  secondsAgo?: number;
  rateFlash?: boolean;
}

export const Nav = ({ rate: propRate, secondsAgo: _propSecondsAgo, rateFlash: _propRateFlash }: NavProps = {}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  
  // Rate announcement state values
  const [internalRate, setInternalRate] = useState(1648);
  const [_internalSecondsAgo, setInternalSecondsAgo] = useState(18);
  const [_internalRateFlash, setInternalRateFlash] = useState(false);

  const rate = propRate !== undefined ? propRate : internalRate;
  
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dynamic Ticker Simulation
  useEffect(() => {
    if (propRate !== undefined) return;

    const timer = setInterval(() => {
      setInternalSecondsAgo((prev) => {
        if (prev >= 45) {
          // Simulate rate updating after some time
          setInternalRate((oldRate) => {
            const delta = Math.random() > 0.5 ? 1 : -1;
            // Bound rate between 1640 and 1655
            const nextRate = Math.min(Math.max(oldRate + delta, 1640), 1655);
            if (nextRate !== oldRate) {
              setInternalRateFlash(true);
              setTimeout(() => setInternalRateFlash(false), 800);
            }
            return nextRate;
          });
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [propRate]);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const toggleMobileAccordion = (menu: string) => {
    setMobileAccordion(mobileAccordion === menu ? null : menu);
  };

  return (
    <>
      {/* Sticky Premium Navbar Container */}
      <header className="sticky top-0 z-50 w-full border-b border-outline-variant/15 bg-surface/75 backdrop-blur-md transition-all duration-300 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Logo & Floating Rate Announcement */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link to="/">
              <Logo textClassName='font-bold text-lg' />
            </Link>
          </div>

          {/* Middle: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Products Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('products')}
              onMouseLeave={handleMouseLeave}
            >
              <button className={cn(
                "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer",
                activeMenu === 'products' ? "bg-surface-container text-primary" : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
              )}>
                Products
                <ArrowDown className={cn(activeMenu === 'products' && "rotate-180 text-primary")} />
              </button>
            </div>

            {/* Business Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('business')}
              onMouseLeave={handleMouseLeave}
            >
              <button className={cn(
                "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer",
                activeMenu === 'business' ? "bg-surface-container text-primary" : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
              )}>
                Business
                <ArrowDown className={cn(activeMenu === 'business' && "rotate-180 text-primary")} />
              </button>
            </div>

            {/* Developers Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('developers')}
              onMouseLeave={handleMouseLeave}
            >
              <button className={cn(
                "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer",
                activeMenu === 'developers' ? "bg-surface-container text-primary" : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
              )}>
                Developers
                <ArrowDown className={cn(activeMenu === 'developers' && "rotate-180 text-primary")} />
              </button>
            </div>

            {/* Pricing Link */}
            <Link 
              to="/pricing" 
              className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors"
            >
              Pricing
            </Link>

            {/* Company Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('company')}
              onMouseLeave={handleMouseLeave}
            >
              <button className={cn(
                "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer",
                activeMenu === 'company' ? "bg-surface-container text-primary" : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
              )}>
                Company
                <ArrowDown className={cn(activeMenu === 'company' && "rotate-180 text-primary")} />
              </button>
            </div>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <Link to="/signin" className="hidden sm:inline-block px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
              Sign In
            </Link>
            <Link to="/register">
              <Button variant="default" size="sm" radius="lg" className="shadow-sm">
                Get Started
              </Button>
            </Link>
            
            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 text-on-surface-variant hover:text-primary rounded-lg hover:bg-surface-container"
              aria-label="Toggle Navigation Menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* Dropdowns Container (Desktop Mega Menu) */}
        <div 
          className="absolute left-0 right-0 w-full bg-transparent overflow-hidden pointer-events-none"
          style={{ top: '100%' }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 pointer-events-auto">
            <AnimatePresence>
              {activeMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  onMouseEnter={() => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  }}
                  onMouseLeave={handleMouseLeave}
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-xl mt-2 p-6 overflow-hidden max-h-[85vh] overflow-y-auto"
                >
                  
                  {/* PRODUCTS MEGA MENU */}
                  {activeMenu === 'products' && (
                    <div className="space-y-6">
                      {/* Top row: 3 Primary outcome-based cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        {/* 1. Receive Crypto */}
                        <Link to="/products/receive-crypto" className="group p-5 rounded-xl border border-outline-variant/20 hover:border-primary/20 hover:bg-surface-container-low transition-all">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl p-2 size-12 text-center rounded-lg bg-surface-container-high group-hover:bg-primary-container/20 group-hover:scale-110 transition-all">🌍</span>
                            <div>
                              <h3 className="font-semibold text-primary text-sm group-hover:text-secondary transition-colors">Receive Crypto</h3>
                              <p className="text-[11px] text-secondary font-mono font-medium">CONVERT AUTOMATICALLY</p>
                            </div>
                          </div>
                          <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                            Automatically convert crypto into Naira using competitive, real-time exchange rates.
                          </p>
                          <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:underline">
                            Learn More <ArrowRight className="w-3 h-3 text-secondary" />
                          </span>
                        </Link>
 
                        {/* 2. Virtual Cards */}
                        <Link to="/products/cards" className="group p-5 rounded-xl border border-outline-variant/20 hover:border-primary/20 hover:bg-surface-container-low transition-all">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl p-2 size-12 text-center rounded-lg bg-surface-container-high group-hover:bg-primary-container/20 group-hover:scale-110 transition-all">💳</span>
                            <div>
                              <h3 className="font-semibold text-primary text-sm group-hover:text-secondary transition-colors">Cards</h3>
                              <p className="text-[11px] text-secondary font-mono font-medium">VIRTUAL USD CARDS</p>
                            </div>
                          </div>
                          <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                            Pay globally with highly secure, custom-bounded virtual USD cards.
                          </p>
                          <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:underline">
                            Learn More <ArrowRight className="w-3 h-3 text-secondary" />
                          </span>
                        </Link>
 
                        {/* 3. Wallet */}
                        <Link to="/products/wallet" className="group p-5 rounded-xl border border-outline-variant/20 hover:border-primary/20 hover:bg-surface-container-low transition-all">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl p-2 size-12 text-center rounded-lg bg-surface-container-high group-hover:bg-primary-container/20 group-hover:scale-110 transition-all">💸</span>
                            <div>
                              <h3 className="font-semibold text-primary text-sm group-hover:text-secondary transition-colors">Wallet</h3>
                              <p className="text-[11px] text-secondary font-mono font-medium">BALANCE MANAGEMENT</p>
                            </div>
                          </div>
                          <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                            Manage balances, instant bank transfers, complete logs, and smart money configurations.
                          </p>
                          <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:underline">
                            Learn More <ArrowRight className="w-3 h-3 text-secondary" />
                          </span>
                        </Link>
                      </div>
 
                      {/* Middle row: Everyday Payments */}
                      <Link to="/products/everyday-payments" className="group block p-5 rounded-xl border border-outline-variant/20 hover:border-primary/20 hover:bg-surface-container-low transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl p-2 size-12 text-center rounded-lg bg-surface-container-high group-hover:bg-primary-container/20 transition-all shrink-0">⚡</span>
                            <div>
                              <h3 className="font-semibold text-primary text-sm group-hover:text-secondary transition-colors">Everyday Payments</h3>
                              <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                                Settle utilities instantly: Airtime • Data • Electricity • Cable • Education • Instant Transfers.
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-primary flex items-center gap-1 shrink-0 self-end md:self-center group-hover:underline">
                            Learn More <ArrowRight className="w-3 h-3 text-secondary" />
                          </span>
                        </div>
                      </Link>
 
                      {/* Divider */}
                      <div className="border-t border-outline-variant/20 pt-4" />
 
                      {/* Footer Row: Checklists & Comparisons */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-on-surface-variant">
                        <div>
                          <h4 className="font-mono uppercase tracking-wider text-secondary font-bold text-[10px] mb-3">Why FlairPay?</h4>
                          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                            <div className="flex items-center gap-2">
                              <CheckIcon />
                              <span>Competitive Rates</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckIcon />
                              <span>Instant Settlement</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckIcon />
                              <span>Provider Redundancy</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckIcon />
                              <span>Enterprise-grade Security</span>
                            </div>
                          </div>
                        </div>
 
                        <div className="border-t md:border-t-0 md:border-l border-outline-variant/20 pt-4 md:pt-0 md:pl-8">
                          <h4 className="font-mono uppercase tracking-wider text-secondary font-bold text-[10px] mb-3">Compare Options</h4>
                          <div className="flex flex-wrap gap-x-6 gap-y-2">
                            <Link to="/pricing" className="hover:text-primary hover:underline flex items-center gap-1">
                              FlairPay vs Exchanges <ArrowRight className="w-3 h-3 text-secondary" />
                            </Link>
                            <Link to="/pricing" className="hover:text-primary hover:underline flex items-center gap-1">
                              FlairPay vs Traditional Banking <ArrowRight className="w-3 h-3 text-secondary" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
 
                  {/* BUSINESS MENU */}
                  {activeMenu === 'business' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 1. White-label */}
                        <Link to="/business/white-label" className="group p-4 rounded-xl hover:bg-surface-container-low border border-transparent hover:border-outline-variant/20 transition-all">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xl">🚀</span>
                            <h3 className="font-semibold text-primary text-sm">White-label Platform</h3>
                          </div>
                          <p className="text-xs text-on-surface-variant pl-8 leading-relaxed">
                            Launch your own fully branded fintech business in days with prebuilt workflows.
                          </p>
                        </Link>
 
                        {/* 2. Enterprise */}
                        <Link to="/business/white-label" className="group p-4 rounded-xl hover:bg-surface-container-low border border-transparent hover:border-outline-variant/20 transition-all">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xl">🏢</span>
                            <h3 className="font-semibold text-primary text-sm">Enterprise</h3>
                          </div>
                          <p className="text-xs text-on-surface-variant pl-8 leading-relaxed">
                            Custom integrations, dedicated private infrastructure, and 24/7 priority support SLA.
                          </p>
                        </Link>
 
                        {/* 3. Partner Program */}
                        <Link to="/company" className="group p-4 rounded-xl hover:bg-surface-container-low border border-transparent hover:border-outline-variant/20 transition-all">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xl">🔗</span>
                            <h3 className="font-semibold text-primary text-sm">Partner Program</h3>
                          </div>
                          <p className="text-xs text-on-surface-variant pl-8 leading-relaxed">
                            Become a strategic ecosystem partner and earn competitive volume commissions.
                          </p>
                        </Link>
 
                        {/* 4. Case Studies */}
                        <Link to="/business/case-studies" className="group p-4 rounded-xl hover:bg-surface-container-low border border-transparent hover:border-outline-variant/20 transition-all">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xl">💼</span>
                            <h3 className="font-semibold text-primary text-sm flex items-center gap-2">
                              Case Studies
                              <span className="text-[9px] font-mono font-medium bg-secondary-container/30 text-secondary-hover px-1.5 py-0.5 rounded-full">
                                COMING SOON
                              </span>
                            </h3>
                          </div>
                          <p className="text-xs text-on-surface-variant pl-8 leading-relaxed">
                            Read detailed profiles of businesses scale-powered by FlairPay infrastructure.
                          </p>
                        </Link>
                      </div>
 
                      {/* Divider */}
                      <div className="border-t border-outline-variant/20 pt-4" />
 
                      {/* Bottom Custom Sales CTA */}
                      <div className="flex items-center justify-between text-xs text-on-surface-variant">
                        <span>Need customized infrastructure bounds or tailored banking routes?</span>
                        <Link to="/business/white-label" className="font-semibold text-primary flex items-center gap-1 hover:underline group">
                          Talk to Sales <ArrowRight className="w-3.5 h-3.5 text-secondary" />
                        </Link>
                      </div>
                    </div>
                  )}
 
                  {/* DEVELOPERS MENU */}
                  {activeMenu === 'developers' && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {/* Column 1: Documentation */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                          <span>📘</span>
                          <h4>Documentation</h4>
                        </div>
                        <ul className="text-xs space-y-2 pl-6 text-on-surface-variant">
                          <li><Link to="/developers/docs" className="hover:text-primary hover:underline">API Reference</Link></li>
                          <li><Link to="/developers/sdks" className="hover:text-primary hover:underline">SDK Packages</Link></li>
                          <li><Link to="/developers/docs" className="hover:text-primary hover:underline">Integration Guides</Link></li>
                        </ul>
                      </div>
 
                      {/* Column 2: API Specifications */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                          <span>🔐</span>
                          <h4>API Core</h4>
                        </div>
                        <ul className="text-xs space-y-2 pl-6 text-on-surface-variant">
                          <li><Link to="/developers/auth" className="hover:text-primary hover:underline">Authentication</Link></li>
                          <li><Link to="/developers/auth" className="hover:text-primary hover:underline">Webhooks</Link></li>
                          <li><Link to="/developers/auth" className="hover:text-primary hover:underline">Rate Limits</Link></li>
                        </ul>
                      </div>
 
                      {/* Column 3: Sandbox */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                          <span>🧪</span>
                          <h4>Sandbox</h4>
                        </div>
                        <div className="pl-6 text-xs text-on-surface-variant">
                          <p className="mb-2">Full testing environment with dummy liquidity reserves.</p>
                          <span className="inline-block text-[10px] font-mono font-bold bg-secondary-container/40 text-secondary-active px-2 py-0.5 rounded-md">
                            COMING SOON
                          </span>
                        </div>
                      </div>
 
                      {/* Column 4: System Status */}
                      <div className="space-y-3 bg-surface-container-low p-4 rounded-xl border border-outline-variant/15">
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <h4>System Status</h4>
                        </div>
                        <ul className="text-[11px] space-y-1.5 text-on-surface-variant font-medium">
                          <li className="flex items-center justify-between">
                            <span>System API</span>
                            <span className="text-emerald-600 font-semibold font-mono text-[10px]">99.98%</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>Provider Node</span>
                            <span className="text-emerald-600 font-semibold font-mono text-[10px]">OPERATIONAL</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>Incidents</span>
                            <span className="text-on-surface-variant/60 font-mono text-[10px]">NONE LOGGED</span>
                          </li>
                        </ul>
                        <Link to="/developers/docs" className="block text-[10px] font-semibold text-primary hover:underline mt-2">
                          View History →
                        </Link>
                      </div>
                    </div>
                  )}
 
                  {/* COMPANY MENU */}
                  {activeMenu === 'company' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <Link to="/company" className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-low transition-all">
                        <BulletIcon />
                        <div>
                          <h4 className="font-semibold text-sm text-primary">About</h4>
                          <p className="text-[11px] text-on-surface-variant">Who we are and our mission</p>
                        </div>
                      </Link>
                      <Link to="/company" className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-low transition-all">
                        <BulletIcon />
                        <div>
                          <h4 className="font-semibold text-sm text-primary">Blog</h4>
                          <p className="text-[11px] text-on-surface-variant">Fintech insights & updates</p>
                        </div>
                      </Link>
                      <Link to="/company" className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-low transition-all">
                        <BulletIcon />
                        <div>
                          <h4 className="font-semibold text-sm text-primary flex items-center gap-2">
                            Careers
                            <span className="text-[9px] font-mono bg-primary-container text-on-primary-container px-1 rounded">WE'RE HIRING</span>
                          </h4>
                          <p className="text-[11px] text-on-surface-variant">Join our distributed team</p>
                        </div>
                      </Link>
                      <Link to="/company" className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-low transition-all">
                        <BulletIcon />
                        <div>
                          <h4 className="font-semibold text-sm text-primary">Security</h4>
                          <p className="text-[11px] text-on-surface-variant">Compliance and protection</p>
                        </div>
                      </Link>
                      <Link to="/company" className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-low transition-all">
                        <BulletIcon />
                        <div>
                          <h4 className="font-semibold text-sm text-primary">Privacy Policy</h4>
                          <p className="text-[11px] text-on-surface-variant">How we safeguard data</p>
                        </div>
                      </Link>
                      <Link to="/company" className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-low transition-all">
                        <BulletIcon />
                        <div>
                          <h4 className="font-semibold text-sm text-primary">Terms of Service</h4>
                          <p className="text-[11px] text-on-surface-variant">Legal agreements and use rules</p>
                        </div>
                      </Link>
                      <Link to="/business/white-label" className="col-span-2 md:col-span-3 flex items-center justify-between bg-surface-container-low p-3 rounded-xl border border-outline-variant/15 hover:border-primary/20 transition-all mt-2">
                        <div className="flex items-center gap-3">
                          <span>✉️</span>
                          <span className="text-xs font-semibold text-primary">Have any queries? Contact our help desk directly.</span>
                        </div>
                        <span className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                          Contact Support <ArrowRight className="w-3.5 h-3.5 text-secondary" />
                        </span>
                      </Link>
                    </div>
                  )}
 
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
 
      {/* MOBILE DRAWER NAVIGATION MENU */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-50 bg-inverse-surface/45 backdrop-blur-xs md:hidden"
            />
 
            {/* Slide-over panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-surface-container-lowest border-l border-outline-variant/30 shadow-2xl p-6 flex flex-col md:hidden overflow-y-auto"
            >
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-outline-variant/20">
                <Link to="/" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
                    <span className="text-secondary font-black text-sm">F</span>
                  </div>
                  <span className="text-primary font-sans font-bold text-lg">FlairPay</span>
                </Link>
                <button 
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 text-on-surface-variant hover:text-primary rounded-lg hover:bg-surface-container"
                >
                  <CloseIcon />
                </button>
              </div>
 
              {/* Core Mobile Accordion List */}
              <div className="flex-1 py-6 space-y-4">
                
                {/* 1. Products Accordion */}
                <div className="border-b border-outline-variant/10 pb-2">
                  <button 
                    onClick={() => toggleMobileAccordion('products')}
                    className="w-full flex items-center justify-between text-base font-semibold text-primary py-2"
                  >
                    <span>Products</span>
                    <ArrowDown className={cn(mobileAccordion === 'products' && "rotate-180")} />
                  </button>
                  {mobileAccordion === 'products' && (
                    <div className="pl-4 pt-2 pb-4 space-y-4 text-sm">
                      <Link to="/products/receive-crypto" onClick={() => setIsMobileOpen(false)} className="block">
                        <div className="font-semibold text-primary">Receive Crypto 🌍</div>
                        <div className="text-xs text-on-surface-variant mt-0.5">Automatically convert crypto into Naira cashout bounds.</div>
                      </Link>
                      <Link to="/products/cards" onClick={() => setIsMobileOpen(false)} className="block">
                        <div className="font-semibold text-primary">Virtual Cards 💳</div>
                        <div className="text-xs text-on-surface-variant mt-0.5">Generate highly secure Virtual USD Cards.</div>
                      </Link>
                      <Link to="/products/wallet" onClick={() => setIsMobileOpen(false)} className="block">
                        <div className="font-semibold text-primary">Wallet 💸</div>
                        <div className="text-xs text-on-surface-variant mt-0.5">Manage transaction history and multicurrency balances.</div>
                      </Link>
                      <Link to="/products/everyday-payments" onClick={() => setIsMobileOpen(false)} className="block">
                        <div className="font-semibold text-primary">Everyday Payments ⚡</div>
                        <div className="text-xs text-on-surface-variant mt-0.5">Electricity, Data, Airtime, Cable, and fast bank transfers.</div>
                      </Link>
                    </div>
                  )}
                </div>
 
                {/* 2. Business Accordion */}
                <div className="border-b border-outline-variant/10 pb-2">
                  <button 
                    onClick={() => toggleMobileAccordion('business')}
                    className="w-full flex items-center justify-between text-base font-semibold text-primary py-2"
                  >
                    <span>Business</span>
                    <ArrowDown className={cn(mobileAccordion === 'business' && "rotate-180")} />
                  </button>
                  {mobileAccordion === 'business' && (
                    <div className="pl-4 pt-2 pb-4 space-y-3 text-sm">
                      <Link to="/business/white-label" onClick={() => setIsMobileOpen(false)} className="block font-medium text-primary">
                        White-label Platform 🚀
                      </Link>
                      <Link to="/business/white-label" onClick={() => setIsMobileOpen(false)} className="block font-medium text-primary">
                        Enterprise Solutions 🏢
                      </Link>
                      <Link to="/company" onClick={() => setIsMobileOpen(false)} className="block font-medium text-primary">
                        Partner Commissions Program 🔗
                      </Link>
                      <Link to="/business/case-studies" onClick={() => setIsMobileOpen(false)} className="block font-medium text-primary">
                        Business Case Studies 💼
                      </Link>
                      <Link to="/business/white-label" onClick={() => setIsMobileOpen(false)} className="block font-semibold text-secondary pt-2">
                        Talk to Sales →
                      </Link>
                    </div>
                  )}
                </div>
 
                {/* 3. Developers Accordion */}
                <div className="border-b border-outline-variant/10 pb-2">
                  <button 
                    onClick={() => toggleMobileAccordion('developers')}
                    className="w-full flex items-center justify-between text-base font-semibold text-primary py-2"
                  >
                    <span>Developers</span>
                    <ArrowDown className={cn(mobileAccordion === 'developers' && "rotate-180")} />
                  </button>
                  {mobileAccordion === 'developers' && (
                    <div className="pl-4 pt-2 pb-4 space-y-3 text-sm">
                      <div>
                        <h4 className="font-semibold text-primary">Documentation</h4>
                        <div className="pl-2 pt-1 flex flex-col gap-1.5 text-on-surface-variant font-medium">
                          <Link to="/developers/docs" onClick={() => setIsMobileOpen(false)}>API Reference</Link>
                          <Link to="/developers/sdks" onClick={() => setIsMobileOpen(false)}>SDKs & Kits</Link>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">API Core</h4>
                        <div className="pl-2 pt-1 flex flex-col gap-1.5 text-on-surface-variant font-medium">
                          <Link to="/developers/auth" onClick={() => setIsMobileOpen(false)}>Authentication</Link>
                          <Link to="/developers/auth" onClick={() => setIsMobileOpen(false)}>Webhooks</Link>
                        </div>
                      </div>
                      <Link to="/developers/docs" onClick={() => setIsMobileOpen(false)} className="block font-medium text-primary">
                        Network API Status 🟢
                      </Link>
                    </div>
                  )}
                </div>
 
                {/* 4. Pricing Link */}
                <div className="border-b border-outline-variant/10 pb-2">
                  <Link 
                    to="/pricing"
                    onClick={() => setIsMobileOpen(false)}
                    className="block text-base font-semibold text-primary py-2"
                  >
                    Pricing
                  </Link>
                </div>
 
                {/* 5. Company Accordion */}
                <div className="border-b border-outline-variant/10 pb-2">
                  <button 
                    onClick={() => toggleMobileAccordion('company')}
                    className="w-full flex items-center justify-between text-base font-semibold text-primary py-2"
                  >
                    <span>Company</span>
                    <ArrowDown className={cn(mobileAccordion === 'company' && "rotate-180")} />
                  </button>
                  {mobileAccordion === 'company' && (
                    <div className="pl-4 pt-2 pb-4 flex flex-col gap-2.5 text-sm text-on-surface-variant font-medium">
                      <Link to="/company" onClick={() => setIsMobileOpen(false)}>About Us</Link>
                      <Link to="/company" onClick={() => setIsMobileOpen(false)}>Fintech Blog</Link>
                      <Link to="/company" onClick={() => setIsMobileOpen(false)}>Careers (Hiring)</Link>
                      <Link to="/company" onClick={() => setIsMobileOpen(false)}>Security Controls</Link>
                      <Link to="/company" onClick={() => setIsMobileOpen(false)}>Privacy Terms</Link>
                    </div>
                  )}
                </div>
 
              </div>
 
              {/* Mobile Footer Area inside drawer */}
              <div className="pt-6 border-t border-outline-variant/20 space-y-4">
                {/* Mobile Floating Announcement */}
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/25 text-[11px]">
                  <span className="flex items-center gap-1.5 text-on-surface-variant font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    Live Rate
                  </span>
                  <span className="font-mono text-primary">1 USDT ≈ <span className="font-bold text-secondary">₦{rate}</span></span>
                </div>
 
                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    to="/signin" 
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-center border border-outline-variant/30 rounded-xl text-sm font-semibold text-primary py-2.5 hover:bg-surface-container"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-center bg-primary rounded-xl text-sm font-semibold text-on-primary py-2.5 hover:bg-primary-hover"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
 
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
 
export default Nav;