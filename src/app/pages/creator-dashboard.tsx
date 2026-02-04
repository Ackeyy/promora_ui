import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { StatCard } from '@/app/components/cards';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { Modal } from '@/app/components/modal';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { DollarSign, Target, Eye, Upload, RefreshCcw, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { api } from '@/lib/api';
import type { ToastType } from '@/app/components/toast';

interface CreatorDashboardProps {
  onCampaignClick: (id: string) => void;
  onDiscoverCampaigns: () => void;
  onToast: (message: string, type?: ToastType) => void;
}

export function CreatorDashboard({ onCampaignClick, onDiscoverCampaigns, onToast }: CreatorDashboardProps) {
  const [earningsPeriod, setEarningsPeriod] = useState('today');
  const [uploadModal, setUploadModal] = useState<{ open: boolean; campaignId?: string; campaignName?: string }>({ open: false });
  const [reelLink, setReelLink] = useState('');
  const [showReverifyToast, setShowReverifyToast] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [reverifyId, setReverifyId] = useState<string | null>(null);

  const earnings = {
    today: 0,
    month: 0,
    year: 0,
    total: 0,
  };

  const joinedCampaigns: Array<{
    id: string;
    name: string;
    thumbnail: string;
    rate: number;
    earned: number;
    views: number;
    status: 'active' | 'pending';
    nextCycleDate: string;
    canReverify: boolean;
  }> = [];

  const handleUpload = async () => {
    if (!uploadModal.campaignId) return;
    setIsUploading(true);
    try {
      await api.submitContent(uploadModal.campaignId, {
        platform: 'instagram',
        reelUrl: reelLink,
      });
      onToast('Submission received. Verification cycle queued.', 'success');
      setUploadModal({ open: false });
      setReelLink('');
    } catch (error) {
      onToast(error instanceof Error ? error.message : 'Unable to submit content.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleReverify = async (campaign: typeof joinedCampaigns[0]) => {
    if (!campaign.canReverify) {
      setShowReverifyToast(true);
      setTimeout(() => setShowReverifyToast(false), 3000);
      return;
    }
    setReverifyId(campaign.id);
    try {
      await api.reverifySubmission(campaign.id);
      onToast('Re-verification requested for the current cycle.', 'success');
    } catch (error) {
      onToast(error instanceof Error ? error.message : 'Unable to request re-verification.', 'error');
    } finally {
      setReverifyId(null);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Creator Dashboard</h1>
          <p className="text-muted-foreground">Track your earnings and manage campaigns</p>
        </motion.div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="relative">
            <Card className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Earnings</CardTitle>
                  <Select value={earningsPeriod} onValueChange={setEarningsPeriod}>
                    <SelectTrigger className="w-28 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="year">Year</SelectItem>
                      <SelectItem value="total">Total</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-chart-2">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <motion.p
                      key={earningsPeriod}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl font-bold"
                    >
                      ₹{earnings[earningsPeriod as keyof typeof earnings].toLocaleString()}
                    </motion.p>
                    <p className="text-sm text-muted-foreground">From verified views</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <StatCard
            title="Campaigns Joined"
            value={joinedCampaigns.length}
            subtitle="Active campaigns"
            icon={<Target className="h-6 w-6 text-primary" />}
          />

          <StatCard
            title="Total Views"
            value="0"
            subtitle="Across all campaigns"
            icon={<Eye className="h-6 w-6 text-primary" />}
            trend={{ value: 0, direction: 'up' }}
          />
        </div>

      {/* Joined Campaigns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Campaigns</h2>
          <Button
            onClick={onDiscoverCampaigns}
            className="bg-gradient-to-r from-primary to-chart-2 hover:shadow-lg hover:shadow-primary/50"
          >
            Discover More
          </Button>
        </div>

        <div className="space-y-4">
          {joinedCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <Card className="overflow-hidden hover:border-primary/50 transition-all cursor-pointer">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Thumbnail */}
                    <div
                      className="w-full md:w-48 h-32 bg-cover bg-center relative cursor-pointer"
                      style={{ backgroundImage: `url(${campaign.thumbnail})` }}
                      onClick={() => onCampaignClick(campaign.id)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur">
                        ₹{campaign.rate}/1k
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2 cursor-pointer hover:text-primary transition-colors" onClick={() => onCampaignClick(campaign.id)}>
                            {campaign.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
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

                        {campaign.status === 'active' ? (
                          <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        ) : campaign.status === 'pending' ? (
                          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        ) : null}
                      </div>

                      {/* Progress */}
                      <div className="mb-4">
                        <Progress value={(campaign.views / 300000) * 100} className="h-2" />
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
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
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Upload Modal */}
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
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Upload content for: <span className="font-semibold text-foreground">{uploadModal.campaignName}</span>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reel-link">Reel/Video Link</Label>
            <Input
              id="reel-link"
              placeholder="https://instagram.com/reel/..."
              value={reelLink}
              onChange={(e) => setReelLink(e.target.value)}
              className="bg-background"
            />
          </div>

          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold mb-1">Verification Process</p>
                <p className="text-muted-foreground">
                  Your content will be verified within 12 hours. You'll be notified once the views are counted and payment is processed.
                </p>
              </div>
            </div>
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

      {/* Reverify Toast */}
      {showReverifyToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-4 right-4 bg-card border border-border rounded-xl shadow-2xl p-4 max-w-sm z-50"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold mb-1">Next Cycle Available</p>
              <p className="text-sm text-muted-foreground mb-3">
                Re-verification will be available on Feb 3, 2026 at 2:00 PM
              </p>
              <Button size="sm" className="bg-primary">
                Schedule Reminder
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      </div>

      {/* Footer Credit */}
      <div className="mt-auto pt-[125px] text-center text-sm text-muted-foreground">
        © Promora 2026
      </div>
    </div>
  );
}
