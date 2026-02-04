import { Home, Target, BarChart3, Settings, LogOut, User, ChevronRight, ArrowLeftRight, UserPlus, HelpCircle, Sun, Moon, Search, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { motion } from 'motion/react';
import { useState } from 'react';

interface AppSidebarProps {
  user: {
    name: string;
    avatar?: string;
    role: 'creator' | 'host';
    creatorEnabled: boolean;
    hostEnabled: boolean;
  };
  currentPage: string;
  activeCampaignCount?: number;
  onNavigate: (page: string) => void;
  onRoleSwitch: () => void;
  onOpenCreatorAccount: () => void;
  onOpenHostAccount: () => void;
  onSettings: () => void;
  onSupport: () => void;
  onThemeChange: (theme: 'dark' | 'light') => void;
  theme: 'dark' | 'light';
  onLogout: () => void;
}

export function AppSidebar({
  user,
  currentPage,
  activeCampaignCount = 0,
  onNavigate,
  onRoleSwitch,
  onOpenCreatorAccount,
  onOpenHostAccount,
  onSettings,
  onSupport,
  onThemeChange,
  theme,
  onLogout,
}: AppSidebarProps) {
  const [menuAction, setMenuAction] = useState('');
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'campaigns', label: 'Campaigns', icon: Target },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
  ];
  const isPolycode = user.creatorEnabled && user.hostEnabled;
  const roleActionLabel = isPolycode
    ? `Switch to ${user.role === 'creator' ? 'host' : 'creator'}`
    : user.role === 'creator'
      ? 'Open host account?'
      : 'Open creator account?';
  const handleMenuAction = (value: string) => {
    switch (value) {
      case 'settings':
        onSettings();
        break;
      case 'support':
        onSupport();
        break;
      case 'theme-light':
        onThemeChange('light');
        break;
      case 'theme-dark':
        onThemeChange('dark');
        break;
      case 'role':
        if (isPolycode) {
          onRoleSwitch();
        } else if (user.role === 'creator') {
          onOpenHostAccount();
        } else {
          onOpenCreatorAccount();
        }
        break;
      case 'logout':
        onLogout();
        break;
      default:
        break;
    }
    setMenuAction('');
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 h-screen shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col overflow-hidden"
    >
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2 text-sidebar-foreground">
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <div className="h-4 w-4 rounded-sm bg-primary" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Promora</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-3">
        <p className="px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Main</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.08)]'
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/80 hover:text-sidebar-foreground'
              }`}
            >
              <div className="h-8 w-8 rounded-xl bg-sidebar-accent/60 flex items-center justify-center">
                <Icon className="h-4 w-4 text-sidebar-foreground" />
              </div>
              <span className="text-sm font-medium">{item.label}</span>
              {isActive && <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />}
            </motion.button>
          );
        })}

        {user.role === 'creator' && (
          <motion.button
            onClick={() => onNavigate('active-campaigns')}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
              currentPage === 'active-campaigns'
                ? 'bg-sidebar-accent text-sidebar-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.08)]'
                : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/80 hover:text-sidebar-foreground'
            }`}
          >
            <div className="h-8 w-8 rounded-xl bg-sidebar-accent/60 flex items-center justify-center">
              <Target className="h-4 w-4 text-sidebar-foreground" />
            </div>
            <span className="text-sm font-medium">Active campaigns</span>
            <span className="ml-auto inline-flex min-w-[28px] items-center justify-center rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary">
              {activeCampaignCount}
            </span>
          </motion.button>
        )}

        {user.role === 'host' && (
          <div className="pt-3 space-y-3">
            <div className="flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <span>Your campaigns</span>
              <Search className="h-3.5 w-3.5" />
            </div>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl bg-sidebar-accent/70 text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
              <div className="h-8 w-8 rounded-lg bg-sidebar-accent flex items-center justify-center text-xs font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium truncate">Active campaigns</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl border border-sidebar-border text-sidebar-foreground/80 hover:bg-sidebar-accent/80 transition-colors">
              <div className="h-8 w-8 rounded-lg bg-sidebar-accent/60 flex items-center justify-center text-base font-semibold">
                +
              </div>
              <span className="text-sm font-medium">New campaign</span>
            </button>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-sidebar-accent/80">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-chart-2">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
        </div>

        <Select value={menuAction} onValueChange={handleMenuAction}>
          <SelectTrigger className="w-full justify-start gap-3 border border-sidebar-border bg-transparent text-sidebar-foreground/80">
            <Menu className="h-4 w-4" />
            <SelectValue placeholder="Menu" />
          </SelectTrigger>
          <SelectContent side="top" align="start">
            <SelectItem value="settings">
              <Settings className="h-4 w-4" />
              Account settings
            </SelectItem>
            <SelectItem value="support">
              <HelpCircle className="h-4 w-4" />
              Help & support
            </SelectItem>
            <SelectItem value={theme === 'dark' ? 'theme-light' : 'theme-dark'}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
            </SelectItem>
            <SelectItem value="role">
              {isPolycode ? <ArrowLeftRight className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
              {roleActionLabel}
            </SelectItem>
            <SelectItem value="logout">
              <LogOut className="h-4 w-4" />
              Log out
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
}
