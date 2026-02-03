import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { Switch } from '@/app/components/ui/switch';
import { Modal } from '@/app/components/modal';
import { ArrowLeft, Edit, Calendar, DollarSign, Pause, Play, TrendingUp, Eye, Users, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

interface CampaignManageProps {
  campaignId: string;
  onBack: () => void;
}

export function CampaignManage({ campaignId, onBack }: CampaignManageProps) {
  const [editModal, setEditModal] = useState(false);
  const [extendBudgetModal, setExtendBudgetModal] = useState(false);
  const [extendPeriodModal, setExtendPeriodModal] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [additionalBudget, setAdditionalBudget] = useState('');
  const [extensionDays, setExtensionDays] = useState('');

  // Mock campaign data
  const campaign = {
    id: campaignId,
    name: 'Summer Fashion Collection 2026',
    description: 'Promote our latest summer collection featuring trendy outfits...',
    thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    status: isPaused ? 'paused' : 'active',
    budget: 100000,
    spent: 65000,
    reserved: 15000,
    available: 20000,
    views: 1300000,
    creators: 45,
    approvalRate: 92,
    startDate: '2026-01-15',
    endDate: '2026-03-15',
    platforms: ['Instagram', 'YouTube'],
  };

  const recentActivity = [
    { creator: 'Sarah M.', action: 'Uploaded content', time: '2 hours ago', status: 'pending' },
    { creator: 'Mike J.', action: 'Content approved', time: '5 hours ago', status: 'approved' },
    { creator: 'Emma W.', action: 'Joined campaign', time: '1 day ago', status: 'active' },
    { creator: 'Alex K.', action: 'Content approved', time: '1 day ago', status: 'approved' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{campaign.name}</h1>
            <p className="text-muted-foreground">{campaign.description}</p>
          </div>
          <Badge className={campaign.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}>
            {campaign.status === 'active' ? (
              <>
                <Play className="h-3 w-3 mr-1" />
                Active
              </>
            ) : (
              <>
                <Pause className="h-3 w-3 mr-1" />
                Paused
              </>
            )}
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Button
          onClick={() => setEditModal(true)}
          variant="outline"
          className="h-auto flex-col gap-2 py-4"
        >
          <Edit className="h-5 w-5" />
          Edit Details
        </Button>
        <Button
          onClick={() => setExtendPeriodModal(true)}
          variant="outline"
          className="h-auto flex-col gap-2 py-4"
        >
          <Calendar className="h-5 w-5" />
          Extend Period
        </Button>
        <Button
          onClick={() => setExtendBudgetModal(true)}
          variant="outline"
          className="h-auto flex-col gap-2 py-4"
        >
          <DollarSign className="h-5 w-5" />
          Add Budget
        </Button>
        <Button
          onClick={() => setIsPaused(!isPaused)}
          variant="outline"
          className={`h-auto flex-col gap-2 py-4 ${isPaused ? 'border-green-500 text-green-500' : 'border-yellow-500 text-yellow-500'}`}
        >
          {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
          {isPaused ? 'Resume' : 'Pause'}
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Total Views</p>
            </div>
            <p className="text-2xl font-bold">{(campaign.views / 1000000).toFixed(1)}M</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Creators</p>
            </div>
            <p className="text-2xl font-bold">{campaign.creators}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Approval Rate</p>
            </div>
            <p className="text-2xl font-bold">{campaign.approvalRate}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Days Left</p>
            </div>
            <p className="text-2xl font-bold">28</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>Budget Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Budget</p>
                <p className="text-2xl font-bold">₹{campaign.budget.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Spent</p>
                <p className="text-2xl font-bold text-red-500">₹{campaign.spent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Reserved</p>
                <p className="text-2xl font-bold text-yellow-500">₹{campaign.reserved.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Available</p>
                <p className="text-2xl font-bold text-green-500">₹{campaign.available.toLocaleString()}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Budget Progress</span>
                <span>{((campaign.spent / campaign.budget) * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(campaign.spent / campaign.budget) * 100} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center text-white font-semibold">
                      {activity.creator.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{activity.creator}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                    <Badge
                      className={
                        activity.status === 'approved'
                          ? 'bg-green-500/10 text-green-500 border-green-500/20'
                          : activity.status === 'pending'
                          ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                          : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                      }
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modals */}
      <Modal
        isOpen={extendBudgetModal}
        onClose={() => setExtendBudgetModal(false)}
        title="Add Budget"
        size="md"
      >
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="additional-budget">Additional Budget Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                id="additional-budget"
                type="number"
                placeholder="5000"
                value={additionalBudget}
                onChange={(e) => setAdditionalBudget(e.target.value)}
                className="bg-background pl-8"
                min="500"
              />
            </div>
          </div>
          {Number(additionalBudget) > 0 && (
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm mb-2">New Total Budget</p>
              <p className="text-2xl font-bold text-primary">
                ₹{(campaign.budget + Number(additionalBudget)).toLocaleString()}
              </p>
            </div>
          )}
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setExtendBudgetModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-primary to-chart-2">
              Confirm & Pay
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={extendPeriodModal}
        onClose={() => setExtendPeriodModal(false)}
        title="Extend Campaign Period"
        size="md"
      >
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="extension-days">Extension (Days)</Label>
            <Input
              id="extension-days"
              type="number"
              placeholder="30"
              value={extensionDays}
              onChange={(e) => setExtensionDays(e.target.value)}
              className="bg-background"
              min="1"
            />
          </div>
          {Number(extensionDays) > 0 && (
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm mb-2">New End Date</p>
              <p className="text-lg font-semibold text-primary">
                {new Date(new Date(campaign.endDate).getTime() + Number(extensionDays) * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>
          )}
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setExtendPeriodModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-primary to-chart-2">
              Extend Campaign
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
