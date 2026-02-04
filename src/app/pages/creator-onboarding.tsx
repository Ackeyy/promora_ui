import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';
import { Checkbox } from '@/app/components/ui/checkbox';
import { ArrowRight, Youtube, Instagram, Facebook, Sparkles, Video, Image as ImageIcon, Music } from 'lucide-react';
import { useState } from 'react';
import { api } from '@/lib/api';

interface CreatorOnboardingProps {
  onComplete: () => void;
  onToast?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export function CreatorOnboarding({ onComplete, onToast }: CreatorOnboardingProps) {
  const [step, setStep] = useState(1);
  const [contentTypes, setContentTypes] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [socialLinks, setSocialLinks] = useState({
    youtube: '',
    instagram: '',
    facebook: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contentTypeOptions = [
    { id: 'reels', label: 'Reels/Shorts', icon: <Video className="h-5 w-5" /> },
    { id: 'photos', label: 'Photos', icon: <ImageIcon className="h-5 w-5" /> },
    { id: 'videos', label: 'Long Videos', icon: <Youtube className="h-5 w-5" /> },
    { id: 'stories', label: 'Stories', icon: <Sparkles className="h-5 w-5" /> },
    { id: 'music', label: 'Music', icon: <Music className="h-5 w-5" /> },
  ];

  const platformOptions = [
    { id: 'youtube', label: 'YouTube', icon: <Youtube className="h-6 w-6" />, color: 'text-red-500' },
    { id: 'instagram', label: 'Instagram', icon: <Instagram className="h-6 w-6" />, color: 'text-pink-500' },
    { id: 'facebook', label: 'Facebook', icon: <Facebook className="h-6 w-6" />, color: 'text-blue-500' },
  ];

  const toggleContentType = (type: string) => {
    setContentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const togglePlatform = (platform: string) => {
    setPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      try {
        await api.submitCreatorOnboarding({
          platforms: platforms.map((p) =>
            p.toUpperCase()
              .replace(/^YT$/i, 'YOUTUBE')
              .replace(/^IG$/i, 'INSTAGRAM')
              .replace(/^FB$/i, 'FACEBOOK'),
          ),
          contentTypes,
        });
        onComplete();
      } catch (e) {
        onToast?.(e instanceof Error ? e.message : 'Failed to save', 'error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const canProceed = () => {
    if (step === 1) return contentTypes.length > 0;
    if (step === 2) return platforms.length > 0;
    return true; // Step 3 is optional
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
              {[1, 2, 3].map((s) => (
                <motion.div
                  key={s}
                  className={`h-2 rounded-full flex-1 ${s <= step ? 'bg-primary' : 'bg-muted'}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: s * 0.1 }}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Step {step} of 3</p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-3xl font-bold mb-2">What type of content do you create?</h2>
                <p className="text-muted-foreground mb-8">Select all that apply</p>

                <div className="space-y-3">
                  {contentTypeOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      type="button"
                      onClick={() => toggleContentType(option.id)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all
                        ${contentTypes.includes(option.id)
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                    >
                      <div className={`
                        flex items-center justify-center w-12 h-12 rounded-lg
                        ${contentTypes.includes(option.id) ? 'bg-primary text-primary-foreground' : 'bg-muted'}
                      `}>
                        {option.icon}
                      </div>
                      <span className="font-semibold">{option.label}</span>
                      {contentTypes.includes(option.id) && (
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
                <h2 className="text-3xl font-bold mb-2">Which platforms do you use?</h2>
                <p className="text-muted-foreground mb-8">Select all that apply</p>

                <div className="space-y-3">
                  {platformOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      type="button"
                      onClick={() => togglePlatform(option.id)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all
                        ${platforms.includes(option.id)
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                    >
                      <div className={`
                        flex items-center justify-center w-12 h-12 rounded-lg
                        ${platforms.includes(option.id) ? 'bg-primary' : 'bg-muted'}
                      `}>
                        <div className={platforms.includes(option.id) ? 'text-white' : option.color}>
                          {option.icon}
                        </div>
                      </div>
                      <span className="font-semibold">{option.label}</span>
                      {platforms.includes(option.id) && (
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

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-3xl font-bold mb-2">Add your social links</h2>
                <p className="text-muted-foreground mb-8">Optional - you can skip this step</p>

                <div className="space-y-4">
                  {platforms.includes('youtube') && (
                    <div className="space-y-2">
                      <Label htmlFor="youtube" className="flex items-center gap-2">
                        <Youtube className="h-5 w-5 text-red-500" />
                        YouTube Channel
                      </Label>
                      <Input
                        id="youtube"
                        placeholder="@yourchannel or channel URL"
                        value={socialLinks.youtube}
                        onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                        className="bg-background"
                      />
                    </div>
                  )}

                  {platforms.includes('instagram') && (
                    <div className="space-y-2">
                      <Label htmlFor="instagram" className="flex items-center gap-2">
                        <Instagram className="h-5 w-5 text-pink-500" />
                        Instagram Handle
                      </Label>
                      <Input
                        id="instagram"
                        placeholder="@yourhandle"
                        value={socialLinks.instagram}
                        onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                        className="bg-background"
                      />
                    </div>
                  )}

                  {platforms.includes('facebook') && (
                    <div className="space-y-2">
                      <Label htmlFor="facebook" className="flex items-center gap-2">
                        <Facebook className="h-5 w-5 text-blue-500" />
                        Facebook Page
                      </Label>
                      <Input
                        id="facebook"
                        placeholder="Your page URL"
                        value={socialLinks.facebook}
                        onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                        className="bg-background"
                      />
                    </div>
                  )}
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
              disabled={!canProceed() && step !== 3}
              className="flex-1 bg-gradient-to-r from-primary to-chart-2 hover:shadow-lg hover:shadow-primary/50"
            >
              {step === 3 ? 'Complete' : 'Continue'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {step === 3 && (
              <Button
                variant="ghost"
                onClick={onComplete}
              >
                Skip
              </Button>
            )}
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
            Join thousands of creators earning real money for authentic views
          </motion.p>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[
              'Get paid for verified views',
              'Transparent payment system',
              'No hidden fees',
              'Platform-held funds for trust',
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
