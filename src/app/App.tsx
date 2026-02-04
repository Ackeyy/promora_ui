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
import { Modal } from '@/app/components/modal';
import { Button } from '@/app/components/ui/button';
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
  creatorEnabled: boolean;
  hostEnabled: boolean;
  lastRoleUsed?: UserRole;
}

function profileToUser(p: UserProfile, preferredRole?: UserRole): User {
  const lastRole = p.lastRoleUsed === 'HOST' ? 'host' : p.lastRoleUsed === 'CREATOR' ? 'creator' : undefined;
  const modeRole: UserRole | undefined =
    p.modeType === 'HOST'
      ? 'host'
      : p.modeType === 'CREATOR'
        ? 'creator'
        : undefined;
  const roleModeDefault: UserRole | undefined =
    p.roleMode.hostEnabled && !p.roleMode.creatorEnabled
      ? 'host'
      : p.roleMode.creatorEnabled && !p.roleMode.hostEnabled
        ? 'creator'
        : undefined;
  const polycodeRole = preferredRole ?? lastRole ?? roleModeDefault ?? 'creator';
  const role: UserRole =
    p.modeType === 'POLYCODE'
      ? polycodeRole
      : roleModeDefault ?? modeRole ?? (p.roleMode.hostEnabled ? 'host' : 'creator');
  return {
    id: p.id,
    name: p.name ?? p.email,
    email: p.email,
    avatar: p.avatarUrl,
    role,
    isOnboarded: p.onboardingComplete,
    isHostVerified: p.hostProfile?.verifiedBadge,
    creatorEnabled: p.roleMode.creatorEnabled,
    hostEnabled: p.roleMode.hostEnabled,
    lastRoleUsed: lastRole,
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
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [roleChoiceOpen, setRoleChoiceOpen] = useState(false);
  const [roleChoiceUser, setRoleChoiceUser] = useState<User | null>(null);
  const [toggleConfirmOpen, setToggleConfirmOpen] = useState(false);
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null);
  const [supportOpen, setSupportOpen] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const fetchUser = useCallback(async (preferredRole?: UserRole) => {
    try {
      const res = await api.getMe();
      const u = profileToUser(res.data, preferredRole);
      setUser(u);
      setCurrentRole(u.role);
      return u;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    fetchUser().finally(() => setAuthChecked(true));
  }, []);

  useEffect(() => {
    if (authChecked && user?.isOnboarded && currentPage === 'landing') {
      setCurrentPage('dashboard');
    }
  }, [authChecked, user, currentPage]);

  const handleLogin = async (email: string, password: string) => {
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      const result = await authLogin(email, password);
      if (!result.ok) {
        const message = result.errorCode === 'USER_NOT_FOUND'
          ? "User doesn't exist."
          : result.errorCode === 'INVALID_PASSWORD'
            ? "User's password is wrong."
            : 'Unexpected error. Try again.';
        setLoginError(message);
        return;
      }
      const u = await fetchUser();
      if (u) {
        const loginRole: UserRole =
          u.hostEnabled && !u.creatorEnabled
            ? 'host'
            : u.creatorEnabled && !u.hostEnabled
              ? 'creator'
              : u.lastRoleUsed ?? u.role;
        setCurrentRole(loginRole);
        setUser({ ...u, role: loginRole });
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
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignup = async (email: string, password: string, role: UserRole) => {
    setIsSigningUp(true);
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
    } finally {
      setIsSigningUp(false);
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

  const handleRoleSwitch = () => {
    if (!user) return;
    const newRole: UserRole = currentRole === 'creator' ? 'host' : 'creator';
    if (user.creatorEnabled && user.hostEnabled) {
      setPendingRole(newRole);
      setToggleConfirmOpen(true);
      return;
    }
  };

  const handleOpenCreatorAccount = () => {
    setCurrentPage('creator-onboarding');
  };

  const handleOpenHostAccount = () => {
    setCurrentPage('host-onboarding');
  };

  const handleRoleChangeConfirm = (nextRole: UserRole) => {
    api.updateMe({ lastRoleUsed: nextRole === 'creator' ? 'CREATOR' : 'HOST' }).catch(() => null);
    setCurrentRole(nextRole);
    if (user) setUser({ ...user, role: nextRole });
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
      return (
        <LoginPage
          onLogin={handleLogin}
          onNavigate={setCurrentPage}
          errorMessage={loginError}
          onClearError={() => setLoginError(null)}
          isLoading={isLoggingIn}
        />
      );
    }
    if (currentPage === 'signup') {
      return <SignupPage onSignup={handleSignup} onNavigate={setCurrentPage} isLoading={isSigningUp} />;
    }

    // Onboarding
    if (currentPage === 'creator-onboarding') {
      return (
        <CreatorOnboarding
          onComplete={handleOnboardingComplete}
          onBack={() => setCurrentPage('dashboard')}
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
          onBack={() => setCurrentPage('dashboard')}
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
    <div className="h-screen bg-background text-foreground overflow-hidden">
      <div className="flex h-full">
        {showSidebar && user && (
          <AppSidebar
            user={{
              name: user.name,
              avatar: user.avatar,
              role: currentRole,
              creatorEnabled: user.creatorEnabled,
              hostEnabled: user.hostEnabled,
            }}
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onRoleSwitch={handleRoleSwitch}
            onOpenCreatorAccount={handleOpenCreatorAccount}
            onOpenHostAccount={handleOpenHostAccount}
            onSettings={() => setShowSettings(true)}
            onSupport={() => setSupportOpen(true)}
            onThemeChange={setTheme}
            theme={theme}
            onLogout={handleLogout}
          />
        )}

        <main className="flex-1 h-full overflow-y-auto">
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

      {supportOpen && (
        <Modal
          isOpen={supportOpen}
          onClose={() => setSupportOpen(false)}
          title="Chat with Whop"
          size="sm"
        >
          <div className="p-6 space-y-4">
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-sm font-semibold">Support thread</p>
              <p className="text-xs text-muted-foreground">
                This thread view is a placeholder for the upcoming chat experience.
              </p>
            </div>
            <div className="space-y-3">
              {['Welcome to Promora support.', 'We will follow up here shortly.', 'Add your request below.'].map((message, index) => (
                <div key={message} className={`rounded-lg border border-border p-3 text-sm ${index === 2 ? 'bg-background' : 'bg-muted/20'}`}>
                  {message}
                </div>
              ))}
            </div>
            <Button className="w-full" variant="outline" onClick={() => setSupportOpen(false)}>
              Close
            </Button>
          </div>
        </Modal>
      )}

      {roleChoiceOpen && roleChoiceUser && (
        <Modal
          isOpen={roleChoiceOpen}
          onClose={() => {
            setRoleChoiceOpen(false);
            setRoleChoiceUser(null);
          }}
          title="Continue as"
          size="sm"
        >
          <div className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Choose which dashboard you want to use for this session.
            </p>
            <div className="grid gap-3">
              <button
                type="button"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-left transition-colors hover:border-primary/60 hover:bg-primary/5"
                onClick={() => {
                  api.updateMe({ lastRoleUsed: 'CREATOR' }).catch(() => null);
                  setCurrentRole('creator');
                  setUser({ ...roleChoiceUser, role: 'creator' });
                  setRoleChoiceOpen(false);
                  setRoleChoiceUser(null);
                  setCurrentPage('dashboard');
                }}
              >
                <span className="block font-semibold">Creator</span>
                <span className="block text-xs text-muted-foreground">Promote campaigns and track earnings.</span>
              </button>
              <button
                type="button"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-left transition-colors hover:border-primary/60 hover:bg-primary/5"
                onClick={() => {
                  api.updateMe({ lastRoleUsed: 'HOST' }).catch(() => null);
                  setCurrentRole('host');
                  setUser({ ...roleChoiceUser, role: 'host' });
                  setRoleChoiceOpen(false);
                  setRoleChoiceUser(null);
                  setCurrentPage('dashboard');
                }}
              >
                <span className="block font-semibold">Host</span>
                <span className="block text-xs text-muted-foreground">Manage campaigns and creator payouts.</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {toggleConfirmOpen && pendingRole && (
        <Modal
          isOpen={toggleConfirmOpen}
          onClose={() => {
            setToggleConfirmOpen(false);
            setPendingRole(null);
          }}
          title="Switch role?"
          size="sm"
        >
          <div className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              You&apos;re about to switch to the {pendingRole} dashboard. Continue?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm transition-colors hover:border-primary/60 hover:bg-primary/5"
                onClick={() => {
                  setToggleConfirmOpen(false);
                  setPendingRole(null);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                onClick={() => {
                  handleRoleChangeConfirm(pendingRole);
                  setToggleConfirmOpen(false);
                  setPendingRole(null);
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
