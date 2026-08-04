import React, { useState, useContext } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Card } from '../components/Card';
import { Link } from '@tanstack/react-router';
import { RateContext } from '../router';
import { motion } from 'motion/react';
import { 
  HiOutlineCreditCard, 
  HiOutlineCheck
} from 'react-icons/hi2';

// -------------------------------------------------------------
// Layout Helper for Subpages
// -------------------------------------------------------------
const PageWrapper = ({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle?: string }) => (
  <div className="min-h-[80vh] py-16 px-4 md:px-8 bg-surface text-on-surface flex flex-col items-center">
    <div className="max-w-4xl w-full text-center mb-10">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-primary mb-3"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-on-surface-variant/80 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="max-w-4xl w-full"
    >
      {children}
    </motion.div>
  </div>
);

// -------------------------------------------------------------
// 1. Receive Crypto
// -------------------------------------------------------------
export const ReceiveCryptoPage = () => {
  const { rate } = useContext(RateContext);
  const [copied, setCopied] = useState(false);
  const address = "0x8922...41a3";

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText("0x8922353a25381a179512395127591241a3");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageWrapper 
      title="Receive Crypto" 
      subtitle="Accept global crypto payments, auto-convert, and settle instantly in Naira at competitive market rates."
    >
      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        <Card className="p-8 flex flex-col justify-between" variant="default">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="p-2 rounded-lg bg-primary-container/20 text-secondary">🌍</span>
              Auto-Conversion Address
            </h3>
            <p className="text-sm text-on-surface-variant mb-6">
              Send USDT or USDC to this address. Funds will automatically convert to Naira and credit your wallet.
            </p>
            <div className="bg-surface-container rounded-xl p-4 mb-6 border border-outline-variant/30 text-center font-mono text-sm break-all flex items-center justify-between gap-4">
              <span className="font-semibold text-primary">{address}</span>
              <Button size="sm" onClick={handleCopy} className="shrink-0">
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex justify-between items-center text-xs">
            <span className="text-on-surface-variant font-medium">Live Settlement Rate:</span>
            <span className="font-mono font-bold text-secondary text-sm">1 USDT ≈ ₦{rate.toLocaleString()}</span>
          </div>
        </Card>

        <Card className="p-8 flex flex-col items-center justify-center text-center" variant="outline">
          <div className="w-48 h-48 bg-white border border-outline-variant p-4 rounded-2xl flex items-center justify-center shadow-inner mb-4">
            {/* Mock QR Code */}
            <div className="grid grid-cols-5 gap-1.5 w-full h-full opacity-80">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={`rounded-sm ${(i % 3 === 0 || i % 7 === 0) ? 'bg-primary' : 'bg-transparent'}`} />
              ))}
            </div>
          </div>
          <p className="text-xs text-on-surface-variant font-mono">Scan QR to pay via Ethereum (ERC-20)</p>
        </Card>
      </div>
    </PageWrapper>
  );
};

// -------------------------------------------------------------
// 2. Cards
// -------------------------------------------------------------
export const CardsPage = () => {
  const [cardName, setCardName] = useState("FLAIRPAY USER");
  const [cardColor, setCardColor] = useState("bg-primary");

  return (
    <PageWrapper 
      title="Virtual USD Cards" 
      subtitle="Create premium USD virtual cards, fund them instantly with crypto or Naira, and spend anywhere globally."
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Interactive 3D Card Preview */}
        <div className="flex justify-center py-6">
          <motion.div 
            whileHover={{ rotateY: 15, rotateX: -5 }}
            className={`w-80 h-48 rounded-2xl p-6 ${cardColor} text-white shadow-2xl relative overflow-hidden flex flex-col justify-between transition-colors duration-500`}
          >
            {/* Decorative Grid Mesh */}
            <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent opacity-40 pointer-events-none" />
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] uppercase font-mono tracking-widest text-white/70">Virtual Card</p>
                <h4 className="text-lg font-bold tracking-tight">FlairPay</h4>
              </div>
              <HiOutlineCreditCard className="w-8 h-8 opacity-90" />
            </div>
            
            <div className="font-mono text-lg tracking-widest my-4">
              ••••  ••••  ••••  4189
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-[9px] uppercase font-mono text-white/60">Card Holder</p>
                <p className="text-xs font-mono font-bold tracking-wide uppercase truncate max-w-[180px]">{cardName || 'YOUR NAME'}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] uppercase font-mono text-white/60">Expires</p>
                <p className="text-xs font-mono font-bold">12/29</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Card Customizer Form */}
        <Card className="p-8" variant="default">
          <h3 className="text-lg font-bold text-primary mb-6">Customize Your Virtual Card</h3>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-2">CARDHOLDER NAME</label>
              <Input 
                value={cardName} 
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                placeholder="Enter card name" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-2">CARD EMBOSS COLOR</label>
              <div className="flex gap-3">
                {[
                  { class: 'bg-primary', name: 'Emerald' },
                  { class: 'bg-secondary', name: 'Gold' },
                  { class: 'bg-gray-800', name: 'Carbon' },
                  { class: 'bg-indigo-950', name: 'Royal' },
                ].map((color) => (
                  <button 
                    key={color.class}
                    onClick={() => setCardColor(color.class)}
                    className={`size-8 rounded-full ${color.class} border-2 ${cardColor === color.class ? 'border-primary/50 ring-2 ring-primary/20' : 'border-transparent'}`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
            <Button className="w-full mt-2">
              Issue Virtual Card ($2.00 fee)
            </Button>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};

// -------------------------------------------------------------
// 3. Wallet
// -------------------------------------------------------------
export const WalletPage = () => {
  return (
    <PageWrapper 
      title="Naira & Crypto Wallet" 
      subtitle="Manage your balances, fund, withdraw, and track real-time transaction activity."
    >
      <div className="space-y-8">
        {/* Balances Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center" variant="default">
            <p className="text-xs font-semibold text-on-surface-variant/80 uppercase">Naira Balance</p>
            <h2 className="text-3xl font-bold text-primary my-2">₦254,820.00</h2>
            <Button size="sm" variant="default" className="mt-2">Withdraw</Button>
          </Card>
          <Card className="p-6 text-center" variant="outline">
            <p className="text-xs font-semibold text-on-surface-variant/80 uppercase">Crypto Balance</p>
            <h2 className="text-3xl font-bold text-secondary my-2">1,480.00 USDT</h2>
            <Button size="sm" variant="secondary" className="mt-2">Convert</Button>
          </Card>
          <Card className="p-6 text-center" variant="outline">
            <p className="text-xs font-semibold text-on-surface-variant/80 uppercase">Virtual Card Funding</p>
            <h2 className="text-3xl font-bold text-primary my-2">$120.00</h2>
            <Button size="sm" variant="outline" className="mt-2">Fund Card</Button>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className="p-6" variant="default">
          <h3 className="text-lg font-bold text-primary mb-4">Recent Activity</h3>
          <div className="divide-y divide-outline-variant/20">
            {[
              { type: 'USDT Deposit', date: 'Jul 19, 12:04 PM', amount: '+ 240.00 USDT', status: 'Completed', color: 'text-emerald-600' },
              { type: 'Naira Conversion Settle', date: 'Jul 19, 12:04 PM', amount: '+ ₦395,520.00', status: 'Completed', color: 'text-emerald-600' },
              { type: 'Virtual Card Funding', date: 'Jul 18, 04:15 PM', amount: '- $50.00', status: 'Completed', color: 'text-red-600' },
              { type: 'DSTV Subscription Pay', date: 'Jul 15, 08:30 AM', amount: '- ₦18,500.00', status: 'Completed', color: 'text-red-600' },
            ].map((tx, idx) => (
              <div key={idx} className="flex justify-between py-4 text-sm items-center">
                <div>
                  <h4 className="font-semibold text-primary">{tx.type}</h4>
                  <p className="text-xs text-on-surface-variant/80">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-mono font-bold ${tx.color}`}>{tx.amount}</p>
                  <p className="text-xs text-on-surface-variant/70">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};

// -------------------------------------------------------------
// 4. Everyday Payments
// -------------------------------------------------------------
export const EverydayPaymentsPage = () => {
  const [billType, setBillType] = useState('airtime');

  return (
    <PageWrapper 
      title="Everyday Payments" 
      subtitle="Pay for utility bills, buy airtime, internet data bundles, and other utilities directly with Naira or Crypto."
    >
      <div className="max-w-xl mx-auto">
        <Card className="p-8" variant="default">
          <div className="flex gap-2 border-b border-outline-variant/25 pb-4 mb-6">
            {[
              { id: 'airtime', name: 'Airtime/Data' },
              { id: 'power', name: 'Electricity' },
              { id: 'tv', name: 'Cable TV' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setBillType(tab.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${billType === tab.id ? 'bg-primary text-white' : 'text-on-surface-variant hover:bg-surface-container'}`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="space-y-5">
            {billType === 'airtime' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-2">SELECT PROVIDER</label>
                  <Select
                    defaultValue="mtn"
                    options={[
                      { value: 'mtn', label: 'MTN Nigeria' },
                      { value: 'airtel', label: 'Airtel Nigeria' },
                      { value: 'glo', label: 'Globacom' },
                      { value: '9mobile', label: '9mobile' },
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-2">PHONE NUMBER</label>
                  <Input placeholder="e.g. 08012345678" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-2">AMOUNT (NGN)</label>
                  <Input placeholder="₦ 1,000" />
                </div>
              </>
            )}

            {billType === 'power' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-2">ELECTRICITY DISCO</label>
                  <Select
                    defaultValue="ikeja"
                    options={[
                      { value: 'ikeja', label: 'Ikeja Electric (IKEDC)' },
                      { value: 'eko', label: 'Eko Electric (EKEDC)' },
                      { value: 'abuja', label: 'Abuja Electricity (AEDC)' },
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-2">METER NUMBER</label>
                  <Input placeholder="Enter meter number" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-2">AMOUNT (NGN)</label>
                  <Input placeholder="₦ 5,000" />
                </div>
              </>
            )}

            {billType === 'tv' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-2">CABLE TV PROVIDER</label>
                  <Select
                    defaultValue="dstv"
                    options={[
                      { value: 'dstv', label: 'DSTV' },
                      { value: 'gotv', label: 'GOTV' },
                      { value: 'startimes', label: 'StarTimes' },
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-2">SMARTCARD/IUC NUMBER</label>
                  <Input placeholder="Enter smartcard number" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-2">PACKAGE PLAN</label>
                  <Select
                    defaultValue="premium"
                    options={[
                      { value: 'premium', label: 'DSTV Premium (₦29,500/mo)' },
                      { value: 'compact-plus', label: 'DSTV Compact Plus (₦19,800/mo)' },
                      { value: 'compact', label: 'DSTV Compact (₦12,500/mo)' },
                    ]}
                  />
                </div>
              </>
            )}

            <Button className="w-full mt-4">
              Process Bill Payment
            </Button>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};

// -------------------------------------------------------------
// 5. White Label
// -------------------------------------------------------------
export const WhiteLabelPage = () => {
  return (
    <PageWrapper 
      title="White-Label Fintech Platform" 
      subtitle="Launch your own branded money app in days. We manage the licensing, liquidity, compliance, and infrastructure while you build the brand."
    >
      <div className="space-y-12">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6" variant="default">
            <h3 className="font-bold text-primary text-lg mb-2">Fully Custom Brand</h3>
            <p className="text-sm text-on-surface-variant/80">
              Own your interface, logo, styling, custom domain, and landing pages. Customers interact only with your brand.
            </p>
          </Card>
          <Card className="p-6" variant="default">
            <h3 className="font-bold text-primary text-lg mb-2">KYC & Compliance</h3>
            <p className="text-sm text-on-surface-variant/80">
              Built-in multi-tier identity verification, automated fraud detection, and regulatory reporting systems.
            </p>
          </Card>
          <Card className="p-6" variant="default">
            <h3 className="font-bold text-primary text-lg mb-2">Liquidity & Settlement</h3>
            <p className="text-sm text-on-surface-variant/80">
              Pre-integrated banking corridors, card processors, and automatic Naira-crypto liquidity pools.
            </p>
          </Card>
        </div>

        <Card className="p-8 text-center" variant="outline">
          <h3 className="text-2xl font-bold text-primary mb-3">Launch Your Brand Today</h3>
          <p className="text-sm text-on-surface-variant max-w-xl mx-auto mb-6">
            Get in touch with our product experts to deploy an enterprise-grade sandbox with virtual cards, fiat conversion, and billing modules.
          </p>
          <Button size="lg" className="px-8">Talk to Sales</Button>
        </Card>
      </div>
    </PageWrapper>
  );
};

// -------------------------------------------------------------
// 6. Case Studies
// -------------------------------------------------------------
export const CaseStudiesPage = () => {
  return (
    <PageWrapper 
      title="Business Case Studies" 
      subtitle="See how modern startups and global platforms leverage the white-label infrastructure of FlairPay."
    >
      <div className="grid md:grid-cols-2 gap-8">
        {[
          { startup: 'KoraPay Global', use: 'Crypto Settle', desc: 'Saves 3.5% transaction costs on inbound African remittance routes with instant settlement.', metrics: '99.9% Settle SLA' },
          { startup: 'Apex Cards', use: 'Virtual Cards', desc: 'Launched branded USD virtual spend cards for 15,000 customers in less than two weeks.', metrics: '15k Cards Issued' },
          { startup: 'NairaLink UK', use: 'Cross-Border', desc: 'Allows UK diasporans to purchase power tokens and airtime for families using local payment gates.', metrics: '$4.2M Vol Processed' },
          { startup: 'CoinNaira P2P', use: 'Compliance SaaS', desc: 'Integrates automated tier-2 identity checks, screening fraud transactions instantly.', metrics: '98% KYC Pass Rate' },
        ].map((cs, idx) => (
          <Card key={idx} className="p-8 flex flex-col justify-between" variant="default">
            <div>
              <span className="text-[10px] font-mono uppercase bg-primary-container/20 text-secondary px-2.5 py-1 rounded-full font-semibold">{cs.use}</span>
              <h3 className="text-xl font-bold text-primary mt-3 mb-2">{cs.startup}</h3>
              <p className="text-sm text-on-surface-variant/80">{cs.desc}</p>
            </div>
            <div className="border-t border-outline-variant/15 mt-6 pt-4 flex justify-between items-center text-xs font-mono">
              <span className="text-on-surface-variant">Success Metric:</span>
              <span className="font-bold text-secondary">{cs.metrics}</span>
            </div>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
};

// -------------------------------------------------------------
// 7. Docs
// -------------------------------------------------------------
export const DocsPage = () => {
  return (
    <PageWrapper 
      title="Developer API Reference" 
      subtitle="Integrate card issuance and crypto-to-fiat conversions with a few lines of code."
    >
      <div className="grid md:grid-cols-4 gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="md:col-span-1 space-y-2 border-r border-outline-variant/20 pr-4">
          <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">Getting Started</h4>
          <a href="#intro" className="block text-sm font-semibold text-secondary">Introduction</a>
          <a href="#quickstart" className="block text-sm text-on-surface-variant/80 hover:text-primary">Quickstart Guide</a>
          <h4 className="text-xs font-bold text-primary uppercase tracking-wider mt-6 mb-3">APIs</h4>
          <a href="#cards-api" className="block text-sm text-on-surface-variant/80 hover:text-primary">Cards API</a>
          <a href="#conversion-api" className="block text-sm text-on-surface-variant/80 hover:text-primary">Rate Conversion API</a>
          <a href="#wallet-api" className="block text-sm text-on-surface-variant/80 hover:text-primary">Wallet Transfers API</a>
        </div>

        {/* Content & Code Area */}
        <div className="md:col-span-3 space-y-6">
          <Card className="p-6" variant="default">
            <h3 className="text-xl font-bold text-primary mb-3">Authenticating API Requests</h3>
            <p className="text-sm text-on-surface-variant mb-4">
              Authenticate requests by including your secret API key in the <code>Authorization</code> bearer token header of all server-side calls.
            </p>
            <div className="bg-surface-container rounded-xl p-4 border border-outline-variant/30 text-xs font-mono overflow-x-auto text-primary">
              <pre>{`curl --request POST \\
  --url https://api.flairpay.com/v1/cards \\
  --header 'Authorization: Bearer sec_live_89a3f2...' \\
  --header 'Content-Type: application/json' \\
  --data '{"holder_name":"EIMAAM DEV","color":"carbon"}'`}</pre>
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
};

// -------------------------------------------------------------
// 8. SDKs
// -------------------------------------------------------------
export const SdksPage = () => {
  return (
    <PageWrapper 
      title="SDKs & Software Libraries" 
      subtitle="Start building faster with our pre-built official language wrappers."
    >
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { lang: 'Node.js', cli: 'npm install @flairpay/node', version: 'v1.4.2' },
          { lang: 'Python', cli: 'pip install flairpay-python', version: 'v2.0.1' },
          { lang: 'Go', cli: 'go get github.com/flairpay/sdk-go', version: 'v0.9.8' },
        ].map((sdk, idx) => (
          <Card key={idx} className="p-6 flex flex-col justify-between" variant="default">
            <div>
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center justify-between">
                {sdk.lang}
                <span className="text-xs font-mono bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-md">{sdk.version}</span>
              </h3>
              <div className="bg-surface-container rounded-lg p-3 text-xs font-mono text-primary select-all mb-4 text-center border border-outline-variant/20">
                {sdk.cli}
              </div>
            </div>
            <Button size="sm" variant="default" className="w-full">
              View Repository
            </Button>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
};

// -------------------------------------------------------------
// 9. Auth Core Page
// -------------------------------------------------------------
export const AuthPage = () => {
  return (
    <PageWrapper 
      title="Authentication Integration" 
      subtitle="Understand security practices, webhooks signatures, and token-based client authorizations."
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-6" variant="default">
          <h3 className="text-lg font-bold text-primary mb-3">Webhook Security</h3>
          <p className="text-sm text-on-surface-variant mb-4">
            FlairPay signs all webhook payloads with a HMAC SHA-256 signature in the <code>X-FlairPay-Signature</code> header. Verify these payloads to ensure requests originate from our secure environment.
          </p>
        </Card>
        <Card className="p-6" variant="outline">
          <h3 className="text-lg font-bold text-primary mb-3">API Key Scopes</h3>
          <ul className="text-sm text-on-surface-variant space-y-2 list-disc pl-5">
            <li><code>cards:write</code> - Issue and terminate virtual cards.</li>
            <li><code>rates:read</code> - Query live rate estimates.</li>
            <li><code>transactions:read</code> - Access transaction lists.</li>
          </ul>
        </Card>
      </div>
    </PageWrapper>
  );
};

// -------------------------------------------------------------
// 10. Pricing
// -------------------------------------------------------------
export const PricingPage = () => {
  return (
    <PageWrapper 
      title="Transparent Pricing Tiers" 
      subtitle="No hidden setup costs. Standard low-percentage transaction pricing that scales as you grow."
    >
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { tier: 'Starter', price: 'Free', setup: '$0 setup fee', fee: '1.2% per conversion', features: ['Receive crypto', 'Fund virtual cards', 'Naira withdrawals', 'Standard Support'] },
          { tier: 'Pro Business', price: '$29 / mo', setup: 'No conversion setup fee', fee: '0.8% per conversion', features: ['Starter features', 'API Access', 'Branded UI links', 'Priority SLA support'] },
          { tier: 'Enterprise Platform', price: 'Custom', setup: 'Custom SLA options', fee: 'Volume tier discount', features: ['All Pro features', 'White-label Domain SaaS', 'Managed compliance flow', 'Dedicated manager'] },
        ].map((p, idx) => (
          <Card key={idx} className="p-8 flex flex-col justify-between items-center text-center" variant={idx === 1 ? 'default' : 'outline'}>
            <div className="w-full">
              <h3 className="text-xl font-bold text-primary mb-2">{p.tier}</h3>
              <h2 className="text-4xl font-extrabold text-secondary my-4">{p.price}</h2>
              <p className="text-xs text-on-surface-variant/80 font-mono mb-6">{p.setup} • {p.fee}</p>
              <hr className="border-outline-variant/20 mb-6" />
              <ul className="text-sm text-on-surface-variant space-y-3 mb-8 text-left">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <HiOutlineCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Button className="w-full" variant={idx === 1 ? 'default' : 'outline'}>
              Choose Plan
            </Button>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
};

// -------------------------------------------------------------
// 11. Company
// -------------------------------------------------------------
export const CompanyPage = () => {
  return (
    <PageWrapper 
      title="Our Mission & Company" 
      subtitle="Bridging the gap between the global crypto economy and local real-world payments."
    >
      <Card className="p-8 space-y-6" variant="default">
        <h3 className="text-2xl font-bold text-primary">FlairPay's Vision</h3>
        <p className="text-base text-on-surface-variant leading-relaxed">
          FlairPay was founded in 2024 to make financial access open, instant, and borderless. By wrapping complex regulatory and transactional rails behind elegant, simple APIs and white-label tools, we empower businesses to launch global money apps in a fraction of the time.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 text-center border-t border-outline-variant/15">
          <div>
            <h4 className="text-3xl font-extrabold text-secondary">2024</h4>
            <p className="text-xs text-on-surface-variant mt-1">FOUNDED</p>
          </div>
          <div>
            <h4 className="text-3xl font-extrabold text-secondary">150M+</h4>
            <p className="text-xs text-on-surface-variant mt-1">VOLUME CONVERTED</p>
          </div>
          <div>
            <h4 className="text-3xl font-extrabold text-secondary">40+</h4>
            <p className="text-xs text-on-surface-variant mt-1">WHITE-LABEL BRANDS</p>
          </div>
          <div>
            <h4 className="text-3xl font-extrabold text-secondary">24/7</h4>
            <p className="text-xs text-on-surface-variant mt-1">LIQUIDITY SLA</p>
          </div>
        </div>
      </Card>
    </PageWrapper>
  );
};

// -------------------------------------------------------------
// 12. Sign In
// -------------------------------------------------------------
export const SignInPage = () => {
  return (
    <div className="min-h-[85vh] bg-surface text-on-surface flex items-center justify-center px-4 py-16">
      <Card className="max-w-md w-full p-8" variant="default">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary mb-2">Welcome Back</h2>
          <p className="text-xs text-on-surface-variant/80">Enter your credentials to access your dashboard</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-2">EMAIL ADDRESS</label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-2">PASSWORD</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <Button className="w-full mt-2">
            Sign In
          </Button>
          <p className="text-center text-xs text-on-surface-variant mt-6">
            Don't have an account? <Link to="/register" className="text-secondary font-bold hover:underline">Get Started</Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

// -------------------------------------------------------------
// 13. Register
// -------------------------------------------------------------
export const RegisterPage = () => {
  return (
    <div className="min-h-[85vh] bg-surface text-on-surface flex items-center justify-center px-4 py-16">
      <Card className="max-w-md w-full p-8" variant="default">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary mb-2">Get Started</h2>
          <p className="text-xs text-on-surface-variant/80">Launch your virtual card and crypto payout account</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-2">FULL NAME</label>
            <Input type="text" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-2">EMAIL ADDRESS</label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-2">PASSWORD</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-2">PRIMARY ACCOUNT TYPE</label>
            <Select
              defaultValue="personal"
              options={[
                { value: 'personal', label: 'Personal Spending' },
                { value: 'business', label: 'Business & White-Label' },
              ]}
            />
          </div>
          <Button className="w-full mt-2">
            Create Account
          </Button>
          <p className="text-center text-xs text-on-surface-variant mt-6">
            Already have an account? <Link to="/signin" className="text-secondary font-bold hover:underline">Sign In</Link>
          </p>
        </form>
      </Card>
    </div>
  );
};
