import { Home, Target, BarChart3, Settings, LogOut, User, ChevronRight, ArrowLeftRight, UserPlus, HelpCircle, Sun, Moon, Search, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
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
  const [settingsOpen, setSettingsOpen] = useState(false);
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

        <DropdownMenu open={settingsOpen} onOpenChange={setSettingsOpen}>
          <div onMouseEnter={() => setSettingsOpen(true)} onMouseLeave={() => setSettingsOpen(false)}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-3 text-sidebar-foreground/80">
                <Menu className="h-4 w-4" />
                Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              align="start"
              className="w-56"
              onMouseEnter={() => setSettingsOpen(true)}
              onMouseLeave={() => setSettingsOpen(false)}
            >
              <DropdownMenuItem onClick={onSettings}>
                <Settings className="mr-2 h-4 w-4" />
                Account settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onSupport}>
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & support
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  {theme === 'dark' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                  Theme
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-40">
                  <DropdownMenuRadioGroup value={theme} onValueChange={(value) => onThemeChange(value as 'dark' | 'light')}>
                    <DropdownMenuRadioItem value="light">
                      <Sun className="mr-2 h-4 w-4" />
                      Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      <Moon className="mr-2 h-4 w-4" />
                      Dark
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={isPolycode ? onRoleSwitch : user.role === 'creator' ? onOpenHostAccount : onOpenCreatorAccount}
              >
                {isPolycode ? <ArrowLeftRight className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
                {roleActionLabel}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </div>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}
