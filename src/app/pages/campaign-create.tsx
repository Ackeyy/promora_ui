import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Switch } from '@/app/components/ui/switch';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, ArrowRight, Upload, Youtube, Instagram, Facebook, Lock, AlertTriangle, CreditCard } from 'lucide-react';
import { useState } from 'react';

interface CampaignCreateProps {
  onComplete: (campaignId: string) => void;
  onCancel: () => void;
}

export function CampaignCreate({ onComplete, onCancel }: CampaignCreateProps) {
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: '',
    description: '',
    thumbnail: '',
    video: '',
    type: 'product',
    productType: '',
    productLink: '',
    platforms: [] as string[],
    rates: {
      youtube: 70,
      instagram: 30,
      facebook: 30,
    },
    reviewContent: false,
    budget: '',
  });

  const productTypes = [
    'Fashion & Apparel',
    'Beauty & Cosmetics',
    'Tech & Gadgets',
    'Food & Beverage',
    'Fitness & Wellness',
    'Home & Lifestyle',
    'Other',
  ];

  const minRates = {
    youtube: 70,
    instagram: 30,
    facebook: 30,
  };

  const togglePlatform = (platform: string) => {
    setCampaignData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    if (step === 1) return campaignData.name && campaignData.description;
    if (step === 2) return campaignData.platforms.length > 0;
    if (step === 3) return Number(campaignData.budget) >= 500;
    return true;
  };

  const handleStartCampaign = () => {
    // Mock Razorpay checkout
    const mockCampaignId = 'camp_' + Math.random().toString(36).substr(2, 9);
    setTimeout(() => {
      onComplete(mockCampaignId);
    }, 1000);
  };

  const handleDraft = () => {
    // Save as draft logic
    onCancel();
  };

  const steps = [
    { number: 1, label: 'Details' },
    { number: 2, label: 'Platforms & Payout' },
    { number: 3, label: 'Budget' },
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onCancel} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold mb-2">Create Campaign</h1>
          <p className="text-muted-foreground">Launch your campaign in 3 simple steps</p>
        </div>

        {/* Step Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s, i) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex items-center gap-3 flex-1">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all
                      ${step >= s.number
                        ? 'bg-gradient-to-r from-primary to-chart-2 text-white shadow-lg shadow-primary/50'
                        : 'bg-muted text-muted-foreground'
                      }
                    `}
                  >
                    {s.number}
                  </motion.div>
                  <span className={`text-sm font-medium ${step >= s.number ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-4 ${step > s.number ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name *</Label>
                <Input
                  id="name"
                  placeholder="Summer Fashion Collection 2026"
                  value={campaignData.name}
                  onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your campaign, products, and what creators should showcase..."
                  value={campaignData.description}
                  onChange={(e) => setCampaignData({ ...campaignData, description: e.target.value })}
                  className="bg-background min-h-32"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">Campaign Thumbnail</Label>
                <div className="flex gap-3">
                  <Input
                    id="thumbnail"
                    placeholder="https://example.com/thumbnail.jpg"
                    value={campaignData.thumbnail}
                    onChange={(e) => setCampaignData({ ...campaignData, thumbnail: e.target.value })}
                    className="bg-background flex-1"
                  />
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="video">Campaign Video (Optional)</Label>
                <Input
                  id="video"
                  placeholder="https://youtube.com/watch?v=..."
                  value={campaignData.video}
                  onChange={(e) => setCampaignData({ ...campaignData, video: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-3">
                <Label>Campaign Type *</Label>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    type="button"
                    onClick={() => setCampaignData({ ...campaignData, type: 'product' })}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      p-4 rounded-xl border-2 transition-all text-left
                      ${campaignData.type === 'product'
                        ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                        : 'border-border'
                      }
                    `}
                  >
                    <p className="font-semibold mb-1">Product Advertisement</p>
                    <p className="text-sm text-muted-foreground">Promote your products/services</p>
                  </motion.button>

                  <div className="relative">
                    <div className="p-4 rounded-xl border-2 border-border bg-muted/30 opacity-50">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">Video Clipping</p>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">Content from your videos</p>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-chart-3">Coming Soon</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productType">Product Type</Label>
                <select
                  id="productType"
                  value={campaignData.productType}
                  onChange={(e) => setCampaignData({ ...campaignData, productType: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                >
                  <option value="">Select a category</option>
                  {productTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productLink">Product Link</Label>
                <Input
                  id="productLink"
                  placeholder="https://yourwebsite.com or @yourinstagram"
                  value={campaignData.productLink}
                  onChange={(e) => setCampaignData({ ...campaignData, productLink: e.target.value })}
                  className="bg-background"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <Label>Select Platforms *</Label>
                <div className="space-y-3">
                  {[
                    { id: 'youtube', label: 'YouTube', icon: <Youtube className="h-6 w-6" />, color: 'text-red-500' },
                    { id: 'instagram', label: 'Instagram', icon: <Instagram className="h-6 w-6" />, color: 'text-pink-500' },
                    { id: 'facebook', label: 'Facebook', icon: <Facebook className="h-6 w-6" />, color: 'text-blue-500' },
                  ].map((platform) => (
                    <motion.button
                      key={platform.id}
                      type="button"
                      onClick={() => togglePlatform(platform.id)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all
                        ${campaignData.platforms.includes(platform.id)
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                          : 'border-border'
                        }
                      `}
                    >
                      <div className={`${platform.color}`}>{platform.icon}</div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold">{platform.label}</p>
                        <p className="text-sm text-muted-foreground">
                          Min rate: ₹{minRates[platform.id as keyof typeof minRates]}/1k views
                        </p>
                      </div>
                      {campaignData.platforms.includes(platform.id) && (
                        <div className="flex items-center gap-3">
                          <Input
                            type="number"
                            value={campaignData.rates[platform.id as keyof typeof campaignData.rates]}
                            onChange={(e) => {
                              const value = Math.max(minRates[platform.id as keyof typeof minRates], Number(e.target.value));
                              setCampaignData({
                                ...campaignData,
                                rates: { ...campaignData.rates, [platform.id]: value },
                              });
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-24 bg-background"
                          />
                          <span className="text-sm text-muted-foreground">/1k</span>
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Minimum Rate Requirements</p>
                    <p className="text-muted-foreground">
                      YouTube: ₹70/1k • Instagram/Facebook: ₹30/1k
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold mb-1">Review content before publish</p>
                    <p className="text-sm text-muted-foreground">
                      Auto-approve after 48h deadline if not reviewed
                    </p>
                  </div>
                  <Switch
                    checked={campaignData.reviewContent}
                    onCheckedChange={(checked) => setCampaignData({ ...campaignData, reviewContent: checked })}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="budget">Campaign Budget *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="5000"
                    value={campaignData.budget}
                    onChange={(e) => setCampaignData({ ...campaignData, budget: e.target.value })}
                    className="bg-background pl-8"
                    min="500"
                  />
                </div>
                <p className="text-sm text-muted-foreground">Minimum budget: ₹500</p>
              </div>

              {Number(campaignData.budget) >= 500 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-gradient-to-br from-primary/10 to-chart-2/10 border border-primary/20 rounded-xl"
                >
                  <h4 className="font-semibold mb-4">Budget Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Campaign Budget</span>
                      <span className="font-semibold">₹{Number(campaignData.budget).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Platform Fee (0%)</span>
                      <span className="font-semibold">₹0</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-semibold">Total Amount</span>
                      <span className="text-xl font-bold text-primary">
                        ₹{Number(campaignData.budget).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="p-4 bg-muted/30 border border-border rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-chart-3 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Platform-Held Funds</p>
                    <p className="text-muted-foreground">
                      Your budget will be held securely by Promora and released to creators only after views are verified. This ensures trust and prevents fraud.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 bg-gradient-to-r from-primary to-chart-2"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleDraft} className="flex-1">
                Save as Draft
              </Button>
              <Button
                onClick={handleStartCampaign}
                disabled={!canProceed()}
                className="flex-1 bg-gradient-to-r from-primary to-chart-2 hover:shadow-lg hover:shadow-primary/50"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Start Campaign
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
