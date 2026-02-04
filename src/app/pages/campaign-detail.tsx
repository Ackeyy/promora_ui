import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { Card, CardContent } from '@/app/components/ui/card';
import { Modal } from '@/app/components/modal';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Checkbox } from '@/app/components/ui/checkbox';
import { ArrowLeft, Eye, Users, DollarSign, Calendar, CheckCircle, Youtube, Instagram, Facebook, RefreshCcw, Upload, XCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import type { Campaign, CreatorCampaign, UserProfile } from '@/lib/types';
import type { ToastType } from '@/app/components/toast';

const PLATFORM_ICON_MAP = {
  youtube: <Youtube className="h-4 w-4" />,
  instagram: <Instagram className="h-4 w-4" />,
  facebook: <Facebook className="h-4 w-4" />,
};

interface CampaignDetailProps {
  campaignId: string;
  userRole: 'creator' | 'host';
  joinedCampaigns: CreatorCampaign[];
  onJoin: (campaign: Campaign) => void;
  onLeave: (id: string) => void;
  onRecordActivity: (id: string) => void;
  onManage: () => void;
  onBack: () => void;
  onToast: (message: string, type?: ToastType) => void;
}

export function CampaignDetail({
  campaignId,
  userRole,
  joinedCampaigns,
  onJoin,
  onLeave,
  onRecordActivity,
  onManage,
  onBack,
  onToast,
}: CampaignDetailProps) {
  const [joinModal, setJoinModal] = useState(false);
  const [leaveModal, setLeaveModal] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [handles, setHandles] = useState({
    youtube: '',
    instagram: '',
    facebook: '',
  });
  const [isJoining, setIsJoining] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [reelLink, setReelLink] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [reverifyId, setReverifyId] = useState<string | null>(null);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    api.getCampaign(campaignId)
      .then((res) => {
        if (isMounted) setCampaign(res.data);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [campaignId]);

  useEffect(() => {
    if (userRole !== 'creator') return;
    api.getMe()
      .then((res) => setProfile(res.data))
      .catch(() => {});
  }, [userRole]);

  useEffect(() => {
    if (!joinModal || !profile?.creatorHandles) return;
    setHandles((prev) => ({
      youtube: prev.youtube || profile.creatorHandles?.youtube || '',
      instagram: prev.instagram || profile.creatorHandles?.instagram || '',
      facebook: prev.facebook || profile.creatorHandles?.facebook || '',
    }));
  }, [joinModal, profile]);

  const formattedPlatforms = useMemo(() => {
    if (!campaign) return [];
    const platformRates = campaign.platformRates ?? {};
    return campaign.platforms.map((platform) => {
      const id = platform.toLowerCase();
      return {
        id,
        name: platform
          .toLowerCase()
          .replace('youtube', 'YouTube')
          .replace('instagram', 'Instagram')
          .replace('facebook', 'Facebook'),
        rate: Math.round((platformRates[id] ?? campaign.ratePer1kViewsPaise) / 100),
        icon: PLATFORM_ICON_MAP[id as keyof typeof PLATFORM_ICON_MAP],
        color:
          id === 'youtube'
            ? 'text-red-500'
            : id === 'instagram'
              ? 'text-pink-500'
              : 'text-blue-500',
      };
    });
  }, [campaign]);

  const handleJoinClick = () => {
    if (userRole === 'creator') {
      setJoinModal(true);
    }
  };

  const handleJoinConfirm = async () => {
    setIsJoining(true);
    try {
      const selectedHandles = Object.fromEntries(
        selectedPlatforms
          .map((platform) => [platform, handles[platform as keyof typeof handles]?.trim()])
          .filter(([, value]) => value)
      ) as Record<string, string>;
      await api.joinCampaign(campaignId, {
        platforms: selectedPlatforms,
        handles: selectedHandles,
      });
      if (campaign) {
        onJoin(campaign);
      }
      onToast('Request sent to join campaign.', 'success');
      setJoinModal(false);
    } catch (error) {
      onToast(error instanceof Error ? error.message : 'Unable to join campaign.', 'error');
    } finally {
      setIsJoining(false);
    }
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((p) => p !== platformId) : [...prev, platformId]
    );
  };

  const isJoinDisabled =
    selectedPlatforms.length === 0 ||
    selectedPlatforms.some((platform) => !handles[platform as keyof typeof handles]?.trim()) ||
    isJoining;

  const joinedCampaign = joinedCampaigns.find((item) => item.id === campaignId);
  const isJoined = Boolean(joinedCampaign);

  const handleUpload = async () => {
    if (!campaign) return;
    setIsUploading(true);
    try {
      await api.submitContent(campaignId, {
        platform: 'instagram',
        reelUrl: reelLink,
      });
      onRecordActivity(campaignId);
      onToast('Submission received. Verification cycle queued.', 'success');
      setUploadModal(false);
      setReelLink('');
    } catch (error) {
      onToast(error instanceof Error ? error.message : 'Unable to submit content.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleReverify = async () => {
    if (!joinedCampaign) return;
    if (!joinedCampaign.canReverify) {
      onToast('Re-verification opens on the next cycle.', 'info');
      return;
    }
    setReverifyId(campaignId);
    try {
      await api.reverifySubmission(campaignId);
      onRecordActivity(campaignId);
      onToast('Re-verification requested for the current cycle.', 'success');
    } catch (error) {
      onToast(error instanceof Error ? error.message : 'Unable to request re-verification.', 'error');
    } finally {
      setReverifyId(null);
    }
  };

  if (isLoading || !campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading campaign...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={campaign.thumbnail ?? 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80'}
          alt={campaign.title}
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
                    {(campaign.tags ?? []).map((tag) => (
                      <Badge key={tag} className="bg-primary/90 backdrop-blur">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h1 className="text-5xl font-bold mb-3">{campaign.title}</h1>
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-muted-foreground">by</span>
                    <span className="font-semibold">{campaign.host?.name ?? 'Host'}</span>
                    {campaign.host?.verifiedBadge && (
                      <Badge className="bg-blue-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>

                {userRole === 'creator' ? (
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-3">
                      <Button
                        size="lg"
                        onClick={handleJoinClick}
                        disabled={isJoined}
                        className={
                          isJoined
                            ? 'bg-muted text-muted-foreground cursor-not-allowed'
                            : 'bg-gradient-to-r from-primary to-chart-2 hover:shadow-lg hover:shadow-primary/50'
                        }
                      >
                        {isJoined ? 'Joined' : 'Join Campaign'}
                      </Button>
                      {isJoined && (
                        <Button size="lg" variant="destructive" onClick={() => setLeaveModal(true)}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Leave
                        </Button>
                      )}
                    </div>
                    {isJoined && joinedCampaign && (
                      <div className="text-right text-sm text-muted-foreground">
                        Active since {new Date(joinedCampaign.lastActivityAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
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
                {formattedPlatforms.map((platform) => (
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
                  {(campaign.requirements?.length ?? 0) > 0 ? (
                    <ul className="space-y-3">
                      {campaign.requirements?.map((req, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No additional requirements listed.</p>
                  )}
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
                    <p className="text-3xl font-bold">0</p>
                  </div>

                  {userRole === 'creator' && isJoined && joinedCampaign && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <Eye className="h-3.5 w-3.5" />
                          Your Views
                        </div>
                        <p className="text-lg font-semibold">{joinedCampaign.views.toLocaleString()}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <DollarSign className="h-3.5 w-3.5" />
                          Pay Received
                        </div>
                        <p className="text-lg font-semibold">₹{joinedCampaign.earned.toLocaleString()}</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Users className="h-4 w-4" />
                      Creators Joined
                    </div>
                    <p className="text-3xl font-bold">{campaign.creatorCount ?? 0}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <DollarSign className="h-4 w-4" />
                      Budget Progress
                    </div>
                    <Progress
                      value={(campaign.budgetSpentPaise / Math.max(1, campaign.budgetTotalPaise)) * 100}
                      className="h-3 mb-2"
                      indicatorClassName="bg-yellow-400"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">₹{(campaign.budgetSpentPaise / 100).toLocaleString()}</span>
                      <span className="font-semibold">₹{(campaign.budgetTotalPaise / 100).toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      Campaign Duration
                    </div>
                    <p className="text-sm">
                      {campaign.startAt ? new Date(campaign.startAt).toLocaleDateString() : 'TBD'} - {campaign.endAt ? new Date(campaign.endAt).toLocaleDateString() : 'TBD'}
                    </p>
                  </div>

                  {userRole === 'creator' && isJoined && (
                    <div className="flex flex-col gap-3 pt-2 border-t border-border">
                      <Button
                        onClick={() => setUploadModal(true)}
                        className="bg-primary hover:shadow-lg hover:shadow-primary/30 transition-all"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleReverify}
                        disabled={!joinedCampaign?.canReverify || reverifyId === campaignId}
                      >
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        {reverifyId === campaignId ? 'Requesting...' : 'Re-verify'}
                      </Button>
                    </div>
                  )}
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
            {formattedPlatforms.map((platform) => (
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
              disabled={isJoinDisabled}
              className="flex-1 bg-gradient-to-r from-primary to-chart-2"
            >
              {isJoining ? 'Joining...' : 'Join Campaign'}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={uploadModal}
        onClose={() => {
          setUploadModal(false);
          setReelLink('');
        }}
        title="Upload Content"
        size="md"
      >
        <div className="p-6 space-y-6">
          <p className="text-sm text-muted-foreground">
            Upload content for: <span className="font-semibold text-foreground">{campaign.title}</span>
          </p>
          <div className="space-y-2">
            <Label htmlFor="campaign-detail-reel">Reel/Video Link</Label>
            <Input
              id="campaign-detail-reel"
              placeholder="https://instagram.com/reel/..."
              value={reelLink}
              onChange={(e) => setReelLink(e.target.value)}
              className="bg-background"
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setUploadModal(false);
                setReelLink('');
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!reelLink || isUploading}
              className="flex-1 bg-gradient-to-r from-primary to-chart-2"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Verify & Upload'}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={leaveModal}
        onClose={() => setLeaveModal(false)}
        title="Leave campaign?"
        size="sm"
      >
        <div className="p-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to leave <span className="font-semibold text-foreground">{campaign.title}</span>?
            You will stop earning from future verified views.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setLeaveModal(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => {
                onLeave(campaignId);
                setLeaveModal(false);
              }}
            >
              Leave campaign
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
