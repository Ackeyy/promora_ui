import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { CampaignCard } from '@/app/components/cards';
import { Badge } from '@/app/components/ui/badge';
import { Switch } from '@/app/components/ui/switch';
import { Label } from '@/app/components/ui/label';
import { Search, Filter, Plus, Youtube, Instagram, Facebook } from 'lucide-react';
import { useState } from 'react';

interface CampaignDiscoverProps {
  onCampaignClick: (id: string) => void;
  onCreateCampaign: () => void;
  userRole: 'creator' | 'host';
}

export function CampaignDiscover({ onCampaignClick, onCreateCampaign, userRole }: CampaignDiscoverProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const campaigns = [
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
    {
      id: '4',
      name: 'Beauty & Skincare Routine',
      thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
      tags: ['Beauty', 'Skincare'],
      ratePerView: 55,
      budget: 120000,
      spent: 78000,
      approvalRate: 90,
      views: 1418000,
      creators: 52,
      platforms: ['IG', 'YT'],
    },
    {
      id: '5',
      name: 'Gaming Setup Showcase',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      tags: ['Gaming', 'Tech'],
      ratePerView: 65,
      budget: 150000,
      spent: 92000,
      approvalRate: 86,
      views: 1415000,
      creators: 48,
      platforms: ['YT', 'FB'],
    },
    {
      id: '6',
      name: 'Healthy Meal Prep Series',
      thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
      tags: ['Food', 'Health'],
      ratePerView: 40,
      budget: 85000,
      spent: 55000,
      approvalRate: 94,
      views: 1375000,
      creators: 41,
      platforms: ['IG', 'FB'],
    },
  ];

  const categories = ['Fashion', 'Tech', 'Fitness', 'Beauty', 'Gaming', 'Food', 'Lifestyle'];
  const platforms = [
    { id: 'YT', label: 'YouTube', icon: <Youtube className="h-4 w-4" /> },
    { id: 'IG', label: 'Instagram', icon: <Instagram className="h-4 w-4" /> },
    { id: 'FB', label: 'Facebook', icon: <Facebook className="h-4 w-4" /> },
  ];

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Discover Campaigns</h1>
            <p className="text-muted-foreground">
              {userRole === 'creator' ? 'Find campaigns and start earning' : 'Browse active campaigns'}
            </p>
          </div>
          {userRole === 'host' && (
            <Button
              onClick={onCreateCampaign}
              className="bg-gradient-to-r from-primary to-chart-2 hover:shadow-lg hover:shadow-primary/50"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Campaign
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>
      </motion.div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-64 shrink-0 space-y-6"
        >
          {/* Verified Hosts */}
          <div className="p-4 bg-card border border-border rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="verified" className="text-sm">Verified Hosts Only</Label>
              <Switch
                id="verified"
                checked={verifiedOnly}
                onCheckedChange={setVerifiedOnly}
              />
            </div>
          </div>

          {/* Platforms Filter */}
          <div className="p-4 bg-card border border-border rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Platforms</h3>
            </div>
            <div className="space-y-2">
              {platforms.map((platform) => (
                <motion.button
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all
                    ${selectedPlatforms.includes(platform.id)
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'hover:bg-muted'
                    }
                  `}
                >
                  {platform.icon}
                  {platform.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Categories Filter */}
          <div className="p-4 bg-card border border-border rounded-xl">
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    className={`cursor-pointer transition-all ${
                      selectedCategories.includes(category)
                        ? 'bg-primary hover:bg-primary/90'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {category}
                  </Badge>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Campaigns Grid */}
        <div className="flex-1">
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {campaigns.length} campaigns
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {campaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <CampaignCard
                  campaign={campaign}
                  onClick={() => onCampaignClick(campaign.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
