import { Home, Target, BarChart3, Settings, LogOut, User, ChevronRight, ArrowLeftRight, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
      {/* User Profile */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-12 w-12 ring-2 ring-primary/20">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-chart-2">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-sidebar-foreground">{user.name}</p>
            <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-sidebar-accent rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="capitalize">{user.role}</span>
          </div>
          <span className="text-xs text-muted-foreground">Current mode</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors
                ${isActive 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }
              `}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
              {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
            </motion.button>
          );
        })}

        <div className="pt-4">
          <DropdownMenu open={settingsOpen} onOpenChange={setSettingsOpen}>
            <div
              onMouseEnter={() => setSettingsOpen(true)}
              onMouseLeave={() => setSettingsOpen(false)}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3"
                >
                  <Settings className="h-5 w-5" />
                  Settings
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
                  Open settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={isPolycode ? onRoleSwitch : user.role === 'creator' ? onOpenHostAccount : onOpenCreatorAccount}
                >
                  {isPolycode ? <ArrowLeftRight className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
                  {roleActionLabel}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </div>
          </DropdownMenu>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-xs text-muted-foreground"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
        <div className="text-xs text-center text-muted-foreground space-y-1">
          <p>© 2026 Promora</p>
          <div className="flex justify-center gap-2 text-[10px]">
            <button className="hover:text-primary transition-colors">Terms</button>
            <span>•</span>
            <button className="hover:text-primary transition-colors">Privacy</button>
            <span>•</span>
            <button className="hover:text-primary transition-colors">Support</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
