import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { CampaignCard } from '@/app/components/cards';
import { Badge } from '@/app/components/ui/badge';
import { Switch } from '@/app/components/ui/switch';
import { Label } from '@/app/components/ui/label';
import { Search, Filter, Plus, Youtube, Instagram, Facebook } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import type { Campaign } from '@/lib/types';

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
  const [sortBy, setSortBy] = useState('recent');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = useMemo(() => {
    const tags = new Set<string>();
    campaigns.forEach((campaign) => {
      campaign.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, [campaigns]);
  const platforms = [
    { id: 'YOUTUBE', label: 'YouTube', icon: <Youtube className="h-4 w-4" /> },
    { id: 'INSTAGRAM', label: 'Instagram', icon: <Instagram className="h-4 w-4" /> },
    { id: 'FACEBOOK', label: 'Facebook', icon: <Facebook className="h-4 w-4" /> },
  ];

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    api.getCampaigns('ACTIVE')
      .then((res) => {
        if (isMounted) setCampaigns(res.data);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCampaigns = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const results = campaigns.filter((campaign) => {
      const matchesQuery =
        !query ||
        campaign.title.toLowerCase().includes(query) ||
        campaign.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
        campaign.host?.name?.toLowerCase().includes(query);
      const matchesPlatforms =
        selectedPlatforms.length === 0 ||
        selectedPlatforms.some((platform) => campaign.platforms.includes(platform));
      const matchesCategories =
        selectedCategories.length === 0 ||
        campaign.tags?.some((tag) => selectedCategories.includes(tag));
      const matchesVerified =
        !verifiedOnly || campaign.host?.verifiedBadge;
      return matchesQuery && matchesPlatforms && matchesCategories && matchesVerified;
    });

    return results.slice().sort((a, b) => {
      if (sortBy === 'budget') return b.budgetTotalPaise - a.budgetTotalPaise;
      if (sortBy === 'rate') return b.ratePer1kViewsPaise - a.ratePer1kViewsPaise;
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });
  }, [campaigns, searchQuery, selectedPlatforms, selectedCategories, verifiedOnly, sortBy]);

  const cards = filteredCampaigns.map((campaign) => ({
    id: campaign.id,
    name: campaign.title,
    thumbnail: campaign.thumbnail ?? 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    tags: campaign.tags ?? [],
    ratePerView: Math.round(campaign.ratePer1kViewsPaise / 100),
    budget: campaign.budgetTotalPaise / 100,
    spent: campaign.budgetSpentPaise / 100,
    views: 0,
    creators: campaign.creatorCount ?? 0,
    createdAt: campaign.createdAt,
    host: campaign.host ? { name: campaign.host.name, verifiedBadge: campaign.host.verifiedBadge } : undefined,
  }));

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

        {/* Search + Sort */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Newest</SelectItem>
              <SelectItem value="budget">Budget (High to Low)</SelectItem>
              <SelectItem value="rate">Rate (High to Low)</SelectItem>
            </SelectContent>
          </Select>
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
            {isLoading ? 'Loading campaigns...' : `Showing ${cards.length} campaigns`}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {cards.map((campaign, index) => (
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
