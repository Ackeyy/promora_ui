import { Home, Target, BarChart3, Settings, LogOut, User, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import { Switch } from '@/app/components/ui/switch';
import { motion } from 'motion/react';

interface AppSidebarProps {
  user: {
    name: string;
    avatar?: string;
    role: 'creator' | 'host';
  };
  currentPage: string;
  onNavigate: (page: string) => void;
  onRoleToggle: () => void;
  onSettings: () => void;
  onLogout: () => void;
}

export function AppSidebar({ user, currentPage, onNavigate, onRoleToggle, onSettings, onLogout }: AppSidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'campaigns', label: 'Campaigns', icon: Target },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col"
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

        {/* Role Toggle */}
        <div className="flex items-center justify-between p-3 bg-sidebar-accent rounded-lg">
          <span className="text-sm">Creator</span>
          <Switch checked={user.role === 'host'} onCheckedChange={onRoleToggle} />
          <span className="text-sm">Host</span>
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
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={onSettings}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Button>
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
