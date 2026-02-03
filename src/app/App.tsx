import { useState, useEffect } from 'react';
import { AppSidebar } from '@/app/components/app-sidebar';
import { ToastContainer, useToast } from '@/app/components/toast';
import { LandingPage } from '@/app/pages/landing';
import { LoginPage } from '@/app/pages/login';
import { SignupPage } from '@/app/pages/signup';
import { CreatorOnboarding } from '@/app/pages/creator-onboarding';
import { HostOnboarding } from '@/app/pages/host-onboarding';
import { CreatorDashboard } from '@/app/pages/creator-dashboard';
import { HostDashboard } from '@/app/pages/host-dashboard';
import { CampaignDiscover } from '@/app/pages/campaign-discover';
import { CampaignDetail } from '@/app/pages/campaign-detail';
import { CampaignCreate } from '@/app/pages/campaign-create';
import { CampaignManage } from '@/app/pages/campaign-manage';
import { CreatorStats } from '@/app/pages/creator-stats';
import { HostStats } from '@/app/pages/host-stats';
import { SettingsModal } from '@/app/pages/settings-modal';

export type UserRole = 'creator' | 'host';
export type Page = 'landing' | 'login' | 'signup' | 'creator-onboarding' | 'host-onboarding' | 'dashboard' | 'campaigns' | 'campaign-detail' | 'campaign-create' | 'campaign-manage' | 'stats' | 'settings';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  isOnboarded: boolean;
  isHostVerified?: boolean;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [redirectAfterAuth, setRedirectAfterAuth] = useState<string | null>(null);
  const { toasts, addToast, removeToast } = useToast();

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleLogin = (email: string) => {
    // Mock login
    const mockUser: User = {
      id: '1',
      name: 'Alex Johnson',
      email,
      avatar: '',
      role: 'creator',
      isOnboarded: true,
      isHostVerified: false,
    };
    setUser(mockUser);
    
    if (redirectAfterAuth) {
      setCurrentPage(redirectAfterAuth as Page);
      setRedirectAfterAuth(null);
    } else {
      setCurrentPage('dashboard');
    }
    addToast('Welcome back!', 'success');
  };

  const handleSignup = (email: string, role: UserRole) => {
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      role,
      isOnboarded: false,
    };
    setUser(mockUser);
    
    if (role === 'creator') {
      setCurrentPage('creator-onboarding');
    } else {
      setCurrentPage('host-onboarding');
    }
  };

  const handleOnboardingComplete = () => {
    if (user) {
      setUser({ ...user, isOnboarded: true });
      if (redirectAfterAuth) {
        setCurrentPage(redirectAfterAuth as Page);
        setRedirectAfterAuth(null);
      } else {
        setCurrentPage('dashboard');
      }
      addToast('Onboarding completed!', 'success');
    }
  };

  const handleRoleToggle = () => {
    if (!user) return;

    const newRole: UserRole = user.role === 'creator' ? 'host' : 'creator';
    
    // If switching to host and not onboarded as host, show onboarding
    if (newRole === 'host' && !user.isHostVerified) {
      setCurrentPage('host-onboarding');
      setUser({ ...user, role: newRole });
      return;
    }

    setUser({ ...user, role: newRole });
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
    addToast('Logged out successfully', 'info');
  };

  const handleCampaignClick = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setCurrentPage('campaign-detail');
  };

  const handleJoinCampaign = (campaignId: string) => {
    if (!user) {
      setRedirectAfterAuth('campaign-detail');
      setSelectedCampaignId(campaignId);
      setCurrentPage('signup');
      return;
    }
    addToast('Joined campaign successfully!', 'success');
  };

  const handleNavigate = (page: string) => {
    if (page === 'campaigns') {
      setCurrentPage('campaigns');
    } else if (page === 'stats') {
      setCurrentPage('stats');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const renderPage = () => {
    // Public pages
    if (currentPage === 'landing') {
      return <LandingPage onNavigate={setCurrentPage} />;
    }
    if (currentPage === 'login') {
      return <LoginPage onLogin={handleLogin} onNavigate={setCurrentPage} />;
    }
    if (currentPage === 'signup') {
      return <SignupPage onSignup={handleSignup} onNavigate={setCurrentPage} />;
    }

    // Onboarding
    if (currentPage === 'creator-onboarding') {
      return <CreatorOnboarding onComplete={handleOnboardingComplete} />;
    }
    if (currentPage === 'host-onboarding') {
      return (
        <HostOnboarding
          onComplete={() => {
            if (user) {
              setUser({ ...user, isHostVerified: true, isOnboarded: true });
              setCurrentPage('dashboard');
              addToast('Host onboarding completed!', 'success');
            }
          }}
        />
      );
    }

    // Auth required pages
    if (!user || !user.isOnboarded) {
      setCurrentPage('landing');
      return <LandingPage onNavigate={setCurrentPage} />;
    }

    // Campaign pages
    if (currentPage === 'campaigns') {
      return (
        <CampaignDiscover
          onCampaignClick={handleCampaignClick}
          onCreateCampaign={() => setCurrentPage('campaign-create')}
          userRole={user.role}
        />
      );
    }

    if (currentPage === 'campaign-detail' && selectedCampaignId) {
      return (
        <CampaignDetail
          campaignId={selectedCampaignId}
          userRole={user.role}
          onJoin={handleJoinCampaign}
          onManage={() => setCurrentPage('campaign-manage')}
          onBack={() => setCurrentPage('campaigns')}
        />
      );
    }

    if (currentPage === 'campaign-create' && user.role === 'host') {
      return (
        <CampaignCreate
          onComplete={(campaignId) => {
            setSelectedCampaignId(campaignId);
            setCurrentPage('campaign-manage');
            addToast('Campaign created successfully!', 'success');
          }}
          onCancel={() => setCurrentPage('dashboard')}
        />
      );
    }

    if (currentPage === 'campaign-manage' && selectedCampaignId && user.role === 'host') {
      return (
        <CampaignManage
          campaignId={selectedCampaignId}
          onBack={() => setCurrentPage('dashboard')}
        />
      );
    }

    // Stats pages
    if (currentPage === 'stats') {
      if (user.role === 'creator') {
        return <CreatorStats />;
      } else {
        return <HostStats />;
      }
    }

    // Dashboard (default)
    if (user.role === 'creator') {
      return (
        <CreatorDashboard
          onCampaignClick={handleCampaignClick}
          onDiscoverCampaigns={() => setCurrentPage('campaigns')}
        />
      );
    } else {
      return (
        <HostDashboard
          onCampaignClick={handleCampaignClick}
          onCreateCampaign={() => setCurrentPage('campaign-create')}
          onManageCampaign={(campaignId) => {
            setSelectedCampaignId(campaignId);
            setCurrentPage('campaign-manage');
          }}
        />
      );
    }
  };

  const isAuthenticated = user && user.isOnboarded;
  const showSidebar = isAuthenticated && !['creator-onboarding', 'host-onboarding'].includes(currentPage);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {showSidebar && user && (
          <AppSidebar
            user={{
              name: user.name,
              avatar: user.avatar,
              role: user.role,
            }}
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onRoleToggle={handleRoleToggle}
            onSettings={() => setShowSettings(true)}
            onLogout={handleLogout}
          />
        )}

        <main className="flex-1 min-h-screen">
          {renderPage()}
        </main>
      </div>

      {showSettings && user && (
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          user={user}
          onUpdateUser={setUser}
        />
      )}

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
