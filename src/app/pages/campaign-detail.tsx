import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { Card, CardContent } from '@/app/components/ui/card';
import { Modal } from '@/app/components/modal';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Checkbox } from '@/app/components/ui/checkbox';
import { ArrowLeft, Eye, Users, DollarSign, Calendar, CheckCircle, Youtube, Instagram, Facebook, Upload } from 'lucide-react';
import { useState } from 'react';

interface CampaignDetailProps {
  campaignId: string;
  userRole: 'creator' | 'host';
  onJoin: (campaignId: string) => void;
  onManage: () => void;
  onBack: () => void;
}

export function CampaignDetail({ campaignId, userRole, onJoin, onManage, onBack }: CampaignDetailProps) {
  const [joinModal, setJoinModal] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [handles, setHandles] = useState({
    youtube: '',
    instagram: '',
    facebook: '',
  });

  // Mock campaign data
  const campaign = {
    id: campaignId,
    name: 'Summer Fashion Collection 2026',
    description: 'Promote our latest summer collection featuring trendy outfits, vibrant colors, and sustainable fashion. We\'re looking for creators who can showcase our products in authentic, engaging ways that resonate with Gen-Z audiences.',
    thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80',
    host: 'FashionCo',
    verified: true,
    tags: ['Fashion', 'Trending', 'Summer'],
    ratePerView: 50,
    budget: 100000,
    spent: 65000,
    approvalRate: 92,
    views: 1300000,
    creators: 45,
    platforms: [
      { id: 'youtube', name: 'YouTube', rate: 70, icon: <Youtube className="h-5 w-5" />, color: 'text-red-500' },
      { id: 'instagram', name: 'Instagram', rate: 50, icon: <Instagram className="h-5 w-5" />, color: 'text-pink-500' },
    ],
    requirements: [
      'Minimum 5k followers on selected platform',
      'Content should be authentic and engaging',
      'Follow brand guidelines provided',
      'Post within 48 hours of approval',
    ],
    duration: {
      start: '2026-01-15',
      end: '2026-03-15',
    },
  };

  const platformIcons = {
    youtube: <Youtube className="h-4 w-4" />,
    instagram: <Instagram className="h-4 w-4" />,
    facebook: <Facebook className="h-4 w-4" />,
  };

  const handleJoinClick = () => {
    if (userRole === 'creator') {
      setJoinModal(true);
    }
  };

  const handleJoinConfirm = () => {
    onJoin(campaignId);
    setJoinModal(false);
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((p) => p !== platformId) : [...prev, platformId]
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={campaign.thumbnail}
          alt={campaign.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-8 pb-8 max-w-7xl">
            <Button variant="ghost" onClick={onBack} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {campaign.tags.map((tag) => (
                      <Badge key={tag} className="bg-primary/90 backdrop-blur">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h1 className="text-5xl font-bold mb-3">{campaign.name}</h1>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-muted-foreground">by</span>
                    <span className="font-semibold">{campaign.host}</span>
                    {campaign.verified && (
                      <Badge className="bg-blue-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>

                {userRole === 'creator' ? (
                  <Button
                    size="lg"
                    onClick={handleJoinClick}
                    className="bg-gradient-to-r from-primary to-chart-2 hover:shadow-lg hover:shadow-primary/50"
                  >
                    Join Campaign
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    onClick={onManage}
                    className="bg-gradient-to-r from-primary to-chart-2 hover:shadow-lg hover:shadow-primary/50"
                  >
                    Manage Campaign
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4">About This Campaign</h2>
              <p className="text-muted-foreground leading-relaxed">{campaign.description}</p>
            </motion.div>

            {/* Platforms & Rates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">Platforms & Rates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaign.platforms.map((platform) => (
                  <Card key={platform.id} className="border-border hover:border-primary/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={platform.color}>{platform.icon}</div>
                          <span className="font-semibold">{platform.name}</span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-primary">₹{platform.rate}/1k views</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4">Requirements</h2>
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {campaign.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="sticky top-8">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Eye className="h-4 w-4" />
                      Total Views
                    </div>
                    <p className="text-3xl font-bold">{(campaign.views / 1000000).toFixed(1)}M</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Users className="h-4 w-4" />
                      Creators Joined
                    </div>
                    <p className="text-3xl font-bold">{campaign.creators}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <CheckCircle className="h-4 w-4" />
                      Approval Rate
                    </div>
                    <p className="text-3xl font-bold text-green-500">{campaign.approvalRate}%</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <DollarSign className="h-4 w-4" />
                      Budget Progress
                    </div>
                    <Progress value={(campaign.spent / campaign.budget) * 100} className="h-3 mb-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">₹{campaign.spent.toLocaleString()}</span>
                      <span className="font-semibold">₹{campaign.budget.toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      Campaign Duration
                    </div>
                    <p className="text-sm">
                      {new Date(campaign.duration.start).toLocaleDateString()} - {new Date(campaign.duration.end).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Join Modal */}
      <Modal
        isOpen={joinModal}
        onClose={() => setJoinModal(false)}
        title="Join Campaign"
        size="md"
      >
        <div className="p-6 space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Select the platforms you'll use for this campaign
            </p>
          </div>

          {/* Platform Selection */}
          <div className="space-y-3">
            {campaign.platforms.map((platform) => (
              <div
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${selectedPlatforms.includes(platform.id)
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedPlatforms.includes(platform.id)}
                      onCheckedChange={() => togglePlatform(platform.id)}
                    />
                    <div className={platform.color}>{platform.icon}</div>
                    <span className="font-semibold">{platform.name}</span>
                  </div>
                  <Badge className="bg-primary">₹{platform.rate}/1k</Badge>
                </div>
                {selectedPlatforms.includes(platform.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3"
                  >
                    <Label htmlFor={`handle-${platform.id}`} className="text-sm">
                      Your {platform.name} Handle
                    </Label>
                    <Input
                      id={`handle-${platform.id}`}
                      placeholder={`@yourhandle`}
                      value={handles[platform.id as keyof typeof handles]}
                      onChange={(e) => setHandles({ ...handles, [platform.id]: e.target.value })}
                      className="bg-background mt-1"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-sm">
            <p className="font-semibold mb-1">What happens next?</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Review campaign requirements</li>
              <li>• Create and upload your content</li>
              <li>• Get verified within 12 hours</li>
              <li>• Earn money for verified views</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setJoinModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleJoinConfirm}
              disabled={selectedPlatforms.length === 0}
              className="flex-1 bg-gradient-to-r from-primary to-chart-2"
            >
              Join Campaign
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
