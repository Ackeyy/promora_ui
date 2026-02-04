import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { StatCard } from '@/app/components/cards';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { DollarSign, Target, Eye, Plus, Settings, TrendingUp, Users, Clock } from 'lucide-react';
import { useState } from 'react';

interface HostDashboardProps {
  onCampaignClick: (id: string) => void;
  onCreateCampaign: () => void;
  onManageCampaign: (id: string) => void;
}

export function HostDashboard({ onCampaignClick, onCreateCampaign, onManageCampaign }: HostDashboardProps) {
  const [payoutPeriod, setPayoutPeriod] = useState('today');
  const [selectedFundCampaign, setSelectedFundCampaign] = useState('all');

  const payouts = {
    today: 0,
    month: 0,
    year: 0,
    total: 0,
  };

  const campaigns: Array<{
    id: string;
    name: string;
    thumbnail: string;
    budget: number;
    spent: number;
    reserved: number;
    views: number;
    creators: number;
    status: 'active';
    platforms: string[];
  }> = [];

  const totalFundsLeft = campaigns.reduce((acc, c) => acc + (c.budget - c.spent - c.reserved), 0);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2">Host Dashboard</h1>
          <p className="text-muted-foreground">Manage your campaigns and track performance</p>
        </div>
        <Button
          onClick={onCreateCampaign}
          className="bg-gradient-to-r from-primary to-chart-2 hover:shadow-lg hover:shadow-primary/50"
          size="lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Create Campaign
        </Button>
      </motion.div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="relative">
          <Card className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Payout</CardTitle>
                <Select value={payoutPeriod} onValueChange={setPayoutPeriod}>
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
                    key={payoutPeriod}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl font-bold"
                  >
                    ₹{payouts[payoutPeriod as keyof typeof payouts].toLocaleString()}
                  </motion.p>
                  <p className="text-sm text-muted-foreground">Spent on campaigns</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <StatCard
          title="Total Campaigns"
          value={campaigns.length}
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

        <StatCard
          title="Total Creators"
          value="0"
          subtitle="Participating creators"
          icon={<Users className="h-6 w-6 text-primary" />}
          trend={{ value: 0, direction: 'up' }}
        />
      </div>

      {/* Funds Currently Left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-chart-2/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">Platform-Held Funds</h3>
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    Safe & Secure
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Funds are held securely and released to creators after verification
                </p>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Available</p>
                    <p className="text-3xl font-bold">₹{totalFundsLeft.toLocaleString()}</p>
                  </div>
                  <Select value={selectedFundCampaign} onValueChange={setSelectedFundCampaign}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Campaigns</SelectItem>
                      {campaigns.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                Withdraw Funds
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Campaigns List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Campaigns</h2>
        </div>

        <div className="space-y-4">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <Card className="overflow-hidden hover:border-primary/50 transition-all">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Thumbnail */}
                    <div
                      className="w-full md:w-48 h-32 bg-cover bg-center relative cursor-pointer"
                      style={{ backgroundImage: `url(${campaign.thumbnail})` }}
                      onClick={() => onCampaignClick(campaign.id)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 right-3 flex gap-2">
                        {campaign.platforms.map((platform) => (
                          <Badge key={platform} className="bg-primary/90 backdrop-blur">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                      <Badge className="absolute bottom-3 left-3 bg-green-500/90 backdrop-blur">
                        Active
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2 cursor-pointer hover:text-primary transition-colors" onClick={() => onCampaignClick(campaign.id)}>
                            {campaign.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {(campaign.views / 1000000).toFixed(1)}M views
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {campaign.creators} creators
                            </span>
                          </div>

                          {/* Budget Progress */}
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-muted-foreground">Budget Progress</span>
                              <span className="font-semibold">
                                ₹{campaign.spent.toLocaleString()} / ₹{campaign.budget.toLocaleString()}
                              </span>
                            </div>
                            <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
                          </div>

                          {/* Budget Breakdown */}
                          <div className="grid grid-cols-3 gap-3 text-sm">
                            <div>
                              <p className="text-muted-foreground">Spent</p>
                              <p className="font-semibold">₹{campaign.spent.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Reserved</p>
                              <p className="font-semibold">₹{campaign.reserved.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Available</p>
                              <p className="font-semibold text-green-500">
                                ₹{(campaign.budget - campaign.spent - campaign.reserved).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          onClick={() => onManageCampaign(campaign.id)}
                          className="bg-primary hover:shadow-lg hover:shadow-primary/30 transition-all"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {}}
                        >
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Extend Budget
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {}}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Extend Period
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

      {/* Footer Credit */}
      <div className="mt-12 text-center text-sm text-muted-foreground">
        © Promora 2026
      </div>
    </div>
  );
}
