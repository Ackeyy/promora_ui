import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { CampaignCard } from '@/app/components/cards';
import { ArrowRight, Shield, CheckCircle, TrendingUp, Zap, Users, Eye, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredCampaigns = [
    {
      id: '1',
      name: 'Summer Fashion Collection 2026',
      thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
      tags: ['Fashion', 'Trending'],
      ratePerView: 50,
      budget: 100000,
      spent: 65000,
      approvalRate: 92,
      views: 1300000,
      creators: 45,
      platforms: ['IG', 'YT'],
    },
    {
      id: '2',
      name: 'Tech Gadget Launch Campaign',
      thumbnail: 'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=800&q=80',
      tags: ['Tech', 'Product'],
      ratePerView: 70,
      budget: 200000,
      spent: 120000,
      approvalRate: 88,
      views: 1700000,
      creators: 62,
      platforms: ['YT', 'FB'],
    },
    {
      id: '3',
      name: 'Fitness & Wellness Challenge',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      tags: ['Fitness', 'Health'],
      ratePerView: 45,
      budget: 75000,
      spent: 48000,
      approvalRate: 95,
      views: 1066000,
      creators: 38,
      platforms: ['IG', 'FB'],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCampaigns.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.h1
            className="text-2xl font-bold bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            PROMORA
          </motion.h1>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => onNavigate('login')}>
              Login
            </Button>
            <Button
              className="bg-gradient-to-r from-primary to-chart-2 hover:shadow-lg hover:shadow-primary/50 transition-all"
              onClick={() => onNavigate('signup')}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Performance-Based Creator Marketplace</span>
              </div>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                Get Paid
              </span>
              <br />
              <span>For Real Views</span>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Connect creators with brands. Pay only for verified views. Build trust with transparent, platform-held funds.
            </motion.p>

            <motion.div
              className="flex gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-chart-2 hover:shadow-2xl hover:shadow-primary/50 transition-all text-lg px-8"
                onClick={() => onNavigate('signup')}
              >
                Join Campaigns
                <Users className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 text-lg px-8"
                onClick={() => onNavigate('signup')}
              >
                Launch Campaign
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          >
            {[
              { icon: <Eye className="h-6 w-6" />, value: '500M+', label: 'Views Generated' },
              { icon: <Users className="h-6 w-6" />, value: '10K+', label: 'Active Creators' },
              { icon: <DollarSign className="h-6 w-6" />, value: '₹50Cr+', label: 'Paid Out' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  {stat.icon}
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Campaigns Carousel */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Campaigns</h2>
            <p className="text-muted-foreground text-lg">Join trending campaigns and start earning today</p>
          </motion.div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCampaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CampaignCard campaign={campaign} onClick={() => onNavigate('signup')} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Trustworthy & Transparent</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">How Promora Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We hold funds securely and release payments only after verified views
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Platform-Held Funds',
                description: 'Brands deposit campaign budgets which we hold securely until verification is complete.',
                icon: <Shield className="h-8 w-8" />,
              },
              {
                step: '02',
                title: 'Verified Views',
                description: 'Our system verifies every view to ensure authenticity. Only real engagement counts.',
                icon: <CheckCircle className="h-8 w-8" />,
              },
              {
                step: '03',
                title: 'Transparent Payouts',
                description: 'Creators get paid immediately after verification. Clear ledger, no hidden fees.',
                icon: <DollarSign className="h-8 w-8" />,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-chart-2 rounded-2xl blur-xl opacity-20" />
                <div className="relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-chart-2 text-white mb-6">
                    {item.icon}
                  </div>
                  <div className="text-sm font-bold text-primary mb-2">{item.step}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-chart-2 hover:shadow-2xl hover:shadow-primary/50 transition-all text-lg px-8"
              onClick={() => onNavigate('signup')}
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div className="col-span-2">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                PROMORA
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                The performance-based creator marketplace. Connect, create, earn.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <button className="block hover:text-primary transition-colors">Terms of Service</button>
                <button className="block hover:text-primary transition-colors">Privacy Policy</button>
                <button className="block hover:text-primary transition-colors">Refund Policy</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <button className="block hover:text-primary transition-colors">Disclaimer</button>
                <button className="block hover:text-primary transition-colors">User Agreement</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <button className="block hover:text-primary transition-colors">Help Center</button>
                <button className="block hover:text-primary transition-colors">Contact Us</button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2026 Promora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
