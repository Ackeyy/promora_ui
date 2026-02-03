import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';
import { ArrowRight, Store, Package, ShoppingBag, Shirt, Utensils, Dumbbell, Briefcase, Globe } from 'lucide-react';
import { useState } from 'react';

interface HostOnboardingProps {
  onComplete: () => void;
}

export function HostOnboarding({ onComplete }: HostOnboardingProps) {
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');

  const businessTypes = [
    { id: 'fashion', label: 'Fashion & Apparel', icon: <Shirt className="h-5 w-5" /> },
    { id: 'food', label: 'Food & Beverage', icon: <Utensils className="h-5 w-5" /> },
    { id: 'fitness', label: 'Fitness & Wellness', icon: <Dumbbell className="h-5 w-5" /> },
    { id: 'tech', label: 'Tech & Gadgets', icon: <Package className="h-5 w-5" /> },
    { id: 'ecommerce', label: 'E-commerce', icon: <ShoppingBag className="h-5 w-5" /> },
    { id: 'services', label: 'Services', icon: <Briefcase className="h-5 w-5" /> },
    { id: 'other', label: 'Other', icon: <Store className="h-5 w-5" /> },
  ];

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const canProceed = () => {
    if (step === 1) return businessType !== '';
    if (step === 2) return website !== '' || email !== '';
    return true;
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-12">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="w-full max-w-lg"
        >
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {[1, 2].map((s) => (
                <motion.div
                  key={s}
                  className={`h-2 rounded-full flex-1 ${s <= step ? 'bg-primary' : 'bg-muted'}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: s * 0.1 }}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Step {step} of 2</p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-3xl font-bold mb-2">What's your business type?</h2>
                <p className="text-muted-foreground mb-8">Help us understand your brand</p>

                <div className="space-y-3">
                  {businessTypes.map((option) => (
                    <motion.button
                      key={option.id}
                      type="button"
                      onClick={() => setBusinessType(option.id)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all
                        ${businessType === option.id
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                    >
                      <div className={`
                        flex items-center justify-center w-12 h-12 rounded-lg
                        ${businessType === option.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}
                      `}>
                        {option.icon}
                      </div>
                      <span className="font-semibold">{option.label}</span>
                      {businessType === option.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                        >
                          <ArrowRight className="h-4 w-4 text-primary-foreground" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-3xl font-bold mb-2">Verify your business</h2>
                <p className="text-muted-foreground mb-8">
                  Provide your website or social handle for verification. You'll receive a verified badge after review.
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Website or Social Handle
                    </Label>
                    <Input
                      id="website"
                      placeholder="www.yourbrand.com or @yourbrand"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Business Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@yourbrand.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background"
                    />
                  </div>

                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      💡 After verification, you'll receive a blue verified badge on your profile, building trust with creators.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 bg-gradient-to-r from-primary to-chart-2 hover:shadow-lg hover:shadow-primary/50"
            >
              {step === 2 ? 'Complete Setup' : 'Continue'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-primary via-chart-2 to-primary p-12 items-center justify-center relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />

        <div className="relative z-10 text-white">
          <motion.h1
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            PROMORA
          </motion.h1>
          <motion.p
            className="text-xl mb-8 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Launch campaigns and reach millions of engaged audiences
          </motion.p>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[
              'Pay only for verified views',
              'Platform-held funds for safety',
              'Transparent creator approval system',
              'Real-time campaign analytics',
            ].map((text, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight className="h-4 w-4" />
                </div>
                <span>{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
