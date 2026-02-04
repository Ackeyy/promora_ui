import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Modal } from '@/app/components/modal';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Calendar, DollarSign, Eye, RefreshCcw, Upload, XCircle } from 'lucide-react';
import { api } from '@/lib/api';
import type { CreatorCampaign } from '@/lib/types';
import type { ToastType } from '@/app/components/toast';

interface CreatorActiveCampaignsProps {
  campaigns: CreatorCampaign[];
  onCampaignClick: (id: string) => void;
  onBack: () => void;
  onLeave: (id: string) => void;
  onRecordActivity: (id: string) => void;
  onToast: (message: string, type?: ToastType) => void;
}

export function CreatorActiveCampaigns({
  campaigns,
  onCampaignClick,
  onBack,
  onLeave,
  onRecordActivity,
  onToast,
}: CreatorActiveCampaignsProps) {
  const [uploadModal, setUploadModal] = useState<{ open: boolean; campaignId?: string; campaignName?: string }>({ open: false });
  const [reelLink, setReelLink] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [reverifyId, setReverifyId] = useState<string | null>(null);
  const [leaveTarget, setLeaveTarget] = useState<CreatorCampaign | null>(null);

  const activeCampaigns = useMemo(
    () =>
      [...campaigns]
        .filter((campaign) => campaign.status === 'active')
        .sort((a, b) => new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime()),
    [campaigns]
  );

  const handleUpload = async () => {
    if (!uploadModal.campaignId) return;
    setIsUploading(true);
    try {
      await api.submitContent(uploadModal.campaignId, {
        platform: 'instagram',
        reelUrl: reelLink,
      });
      onRecordActivity(uploadModal.campaignId);
      onToast('Submission received. Verification cycle queued.', 'success');
      setUploadModal({ open: false });
      setReelLink('');
    } catch (error) {
      onToast(error instanceof Error ? error.message : 'Unable to submit content.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleReverify = async (campaign: CreatorCampaign) => {
    if (!campaign.canReverify) {
      onToast('Re-verification opens on the next cycle.', 'info');
      return;
    }
    setReverifyId(campaign.id);
    try {
      await api.reverifySubmission(campaign.id);
      onRecordActivity(campaign.id);
      onToast('Re-verification requested for the current cycle.', 'success');
    } catch (error) {
      onToast(error instanceof Error ? error.message : 'Unable to request re-verification.', 'error');
    } finally {
      setReverifyId(null);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Active Campaigns</h1>
          <p className="text-muted-foreground">Stay on top of your live brand collaborations.</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back to Dashboard
        </Button>
      </div>

      <div className="space-y-4">
        {activeCampaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={campaign.thumbnail} alt={campaign.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {campaign.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <button
                        type="button"
                        onClick={() => onCampaignClick(campaign.id)}
                        className="text-left"
                      >
                        <h2 className="text-lg font-semibold hover:text-primary transition-colors">{campaign.name}</h2>
                      </button>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {(campaign.views / 1000).toFixed(0)}k views
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          ₹{campaign.earned.toLocaleString()} earned
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-3 md:items-end">
                    <Badge className="bg-primary/10 text-primary border border-primary/20">
                      ₹{campaign.rate}/1k rate
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Next cycle: {campaign.nextCycleDate}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button
                    size="sm"
                    onClick={() => setUploadModal({ open: true, campaignId: campaign.id, campaignName: campaign.name })}
                    className="bg-primary hover:shadow-lg hover:shadow-primary/30 transition-all"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReverify(campaign)}
                    disabled={!campaign.canReverify || reverifyId === campaign.id}
                  >
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    {reverifyId === campaign.id ? 'Requesting...' : 'Re-verify'}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setLeaveTarget(campaign)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Leave
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={uploadModal.open}
        onClose={() => {
          setUploadModal({ open: false });
          setReelLink('');
        }}
        title="Upload Content"
        size="md"
      >
        <div className="p-6 space-y-6">
          <p className="text-sm text-muted-foreground">
            Upload content for: <span className="font-semibold text-foreground">{uploadModal.campaignName}</span>
          </p>
          <div className="space-y-2">
            <Label htmlFor="active-reel-link">Reel/Video Link</Label>
            <Input
              id="active-reel-link"
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
                setUploadModal({ open: false });
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
        isOpen={Boolean(leaveTarget)}
        onClose={() => setLeaveTarget(null)}
        title="Leave campaign?"
        size="sm"
      >
        <div className="p-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to leave <span className="font-semibold text-foreground">{leaveTarget?.name}</span>?
            You will stop earning from future verified views.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setLeaveTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => {
                if (leaveTarget) {
                  onLeave(leaveTarget.id);
                  setLeaveTarget(null);
                }
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
