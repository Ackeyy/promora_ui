import { useState, useEffect, useCallback } from 'react';
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
import { api } from '@/lib/api';
import { login as authLogin, logout as authLogout } from '@/lib/auth';
import type { UserProfile } from '@/lib/types';

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

function profileToUser(p: UserProfile, preferredRole?: UserRole): User {
  const role: UserRole =
    preferredRole ??
    (p.roleMode.creatorEnabled ? 'creator' : p.roleMode.hostEnabled ? 'host' : 'creator');
  return {
    id: p.id,
    name: p.name ?? p.email,
    email: p.email,
    avatar: p.avatarUrl,
    role,
    isOnboarded: p.onboardingComplete,
    isHostVerified: p.hostProfile?.verifiedBadge,
  };
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>('creator');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [redirectAfterAuth, setRedirectAfterAuth] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const fetchUser = useCallback(async (preferredRole?: UserRole) => {
    try {
      const res = await api.getMe();
      const u = profileToUser(res.data, preferredRole ?? currentRole);
      setUser(u);
      setCurrentRole(u.role);
      return u;
    } catch {
      setUser(null);
      return null;
    }
  }, [currentRole]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    fetchUser().finally(() => setAuthChecked(true));
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const result = await authLogin(email, password);
    if (!result.ok) {
      addToast(result.error ?? 'Login failed', 'error');
      return;
    }
    const u = await fetchUser();
    if (u) {
      setCurrentRole(u.role);
      if (redirectAfterAuth) {
        setCurrentPage(redirectAfterAuth as Page);
        setRedirectAfterAuth(null);
      } else {
        setCurrentPage('dashboard');
      }
      addToast('Welcome back!', 'success');
    } else {
      addToast('Could not load profile', 'error');
    }
  };

  const handleSignup = async (email: string, password: string, role: UserRole) => {
    try {
      await api.signup({ email, password, role });
      const result = await authLogin(email, password);
      if (!result.ok) {
        addToast('Account created. Please log in.', 'success');
        setCurrentPage('login');
        return;
      }
      const u = await fetchUser();
      if (u) {
        setCurrentRole(role);
        if (!u.isOnboarded) {
          setCurrentPage(role === 'creator' ? 'creator-onboarding' : 'host-onboarding');
        } else {
          setCurrentPage('dashboard');
        }
      } else {
        setCurrentPage('login');
      }
    } catch (e: unknown) {
      const msg = e && typeof e === 'object' && 'message' in e ? String((e as { message: string }).message) : 'Signup failed';
      addToast(msg, 'error');
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
    const newRole: UserRole = currentRole === 'creator' ? 'host' : 'creator';
    if (newRole === 'host' && !user.isHostVerified) {
      setCurrentPage('host-onboarding');
      setUser({ ...user, role: newRole });
      setCurrentRole(newRole);
      return;
    }
    setCurrentRole(newRole);
    setUser({ ...user, role: newRole });
    setCurrentPage('dashboard');
  };

  const handleLogout = async () => {
    await authLogout();
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
    if (!authChecked) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      );
    }
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
      return (
        <CreatorOnboarding
          onComplete={handleOnboardingComplete}
          onToast={addToast}
        />
      );
    }
    if (currentPage === 'host-onboarding') {
      return (
        <HostOnboarding
          onComplete={async () => {
            const u = await fetchUser();
            if (u) {
              setCurrentPage('dashboard');
              addToast('Host onboarding completed!', 'success');
            }
          }}
          onToast={addToast}
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
          userRole={currentRole}
        />
      );
    }

    if (currentPage === 'campaign-detail' && selectedCampaignId) {
      return (
        <CampaignDetail
          campaignId={selectedCampaignId}
          userRole={currentRole}
          onJoin={handleJoinCampaign}
          onManage={() => setCurrentPage('campaign-manage')}
          onBack={() => setCurrentPage('campaigns')}
          onToast={addToast}
        />
      );
    }

    if (currentPage === 'campaign-create' && currentRole === 'host') {
      return (
        <CampaignCreate
          onComplete={(campaignId) => {
            setSelectedCampaignId(campaignId);
            setCurrentPage('campaign-manage');
            addToast('Campaign created successfully!', 'success');
          }}
          onCancel={() => setCurrentPage('dashboard')}
          onToast={addToast}
        />
      );
    }

    if (currentPage === 'campaign-manage' && selectedCampaignId && currentRole === 'host') {
      return (
        <CampaignManage
          campaignId={selectedCampaignId}
          onBack={() => setCurrentPage('dashboard')}
        />
      );
    }

    // Stats pages
    if (currentPage === 'stats') {
      if (currentRole === 'creator') {
        return <CreatorStats />;
      } else {
        return <HostStats />;
      }
    }

    // Dashboard (default)
    if (currentRole === 'creator') {
      return (
        <CreatorDashboard
          onCampaignClick={handleCampaignClick}
          onDiscoverCampaigns={() => setCurrentPage('campaigns')}
          onToast={addToast}
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
              role: currentRole,
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
