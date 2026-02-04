import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { TrendingUp, TrendingDown, Eye, Users, DollarSign } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  icon?: React.ReactNode;
  gradient?: boolean;
  className?: string;
}

export function StatCard({ title, value, subtitle, trend, icon, gradient = false, className = '' }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`
        ${gradient ? 'bg-gradient-to-br from-primary via-primary to-chart-2 text-primary-foreground border-primary' : ''}
        hover:shadow-xl hover:shadow-primary/10 transition-all duration-300
        ${className}
      `}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={`text-sm mb-2 ${gradient ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                {title}
              </p>
              <motion.p
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="text-3xl font-bold mb-1"
              >
                {value}
              </motion.p>
              {subtitle && (
                <p className={`text-sm ${gradient ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {subtitle}
                </p>
              )}
            </div>
            {icon && (
              <div className={`
                p-3 rounded-lg
                ${gradient ? 'bg-white/20' : 'bg-primary/10'}
              `}>
                {icon}
              </div>
            )}
          </div>
          {trend && (
            <div className="mt-4 flex items-center gap-2">
              {trend.direction === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm ${trend.direction === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {trend.value}%
              </span>
              <span className={`text-sm ${gradient ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                vs last period
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface CampaignCardProps {
  campaign: {
    id: string;
    name: string;
    thumbnail: string;
    tags: string[];
    ratePerView: number;
    budget: number;
    spent: number;
    views: number;
    creators: number;
    createdAt?: string;
    host?: {
      name: string;
      verifiedBadge?: boolean;
    };
  };
  onClick?: () => void;
}

export function CampaignCard({ campaign, onClick }: CampaignCardProps) {
  const progress = (campaign.spent / campaign.budget) * 100;
  const createdAt = campaign.createdAt ? new Date(campaign.createdAt) : null;
  const daysAgo = createdAt ? Math.max(0, Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24))) : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 border-border hover:border-primary/50 bg-card/80">
        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={campaign.thumbnail}
            alt={campaign.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {campaign.tags.map((tag) => (
              <Badge key={tag} className="bg-primary/90 backdrop-blur-sm hover:bg-primary">
                {tag}
              </Badge>
            ))}
          </div>

          {daysAgo !== null && (
            <div className="absolute top-3 right-3 text-xs text-muted-foreground bg-background/70 px-2 py-1 rounded-full backdrop-blur-sm">
              {daysAgo === 0 ? 'Today' : `${daysAgo} days ago`}
            </div>
          )}

          {/* Rate */}
          <div className="absolute bottom-3 left-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="bg-gradient-to-r from-primary to-chart-2 px-3 py-1.5 rounded-full"
            >
              <p className="text-sm font-semibold text-white">
                ₹{campaign.ratePerView}/1k views
              </p>
            </motion.div>
          </div>
        </div>

        <CardContent className="p-4">
          {campaign.host?.name && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span className="font-medium text-foreground">{campaign.host.name}</span>
              {campaign.host.verifiedBadge && (
                <Badge className="bg-blue-500 text-white">Verified</Badge>
              )}
            </div>
          )}
          <h3 className="font-semibold text-lg mb-3 line-clamp-2">{campaign.name}</h3>

          {/* Progress */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Budget Progress</span>
              <span className="font-semibold">₹{campaign.spent.toLocaleString()} / ₹{campaign.budget.toLocaleString()}</span>
            </div>
            <Progress value={progress} className="h-2" indicatorClassName="bg-yellow-400" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Views</p>
              <p className="font-semibold text-sm">{(campaign.views / 1000).toFixed(1)}k</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Creators</p>
              <p className="font-semibold text-sm">{campaign.creators}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface GlowingCardProps {
  children: React.ReactNode;
  glowColor?: string;
  className?: string;
}

export function GlowingCard({ children, glowColor = 'primary', className = '' }: GlowingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`relative ${className}`}
    >
      <div className={`absolute -inset-1 bg-gradient-to-r from-${glowColor} to-chart-2 rounded-lg blur-lg opacity-25`} />
      <Card className="relative">
        {children}
      </Card>
    </motion.div>
  );
}
