import { Modal } from '@/app/components/modal';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import { Switch } from '@/app/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { User, Bell, Shield, FileText, CheckCircle, Upload } from 'lucide-react';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'creator' | 'host';
  isOnboarded: boolean;
  isHostVerified?: boolean;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUpdateUser: (user: User) => void;
}

export function SettingsModal({ isOpen, onClose, user, onUpdateUser }: SettingsModalProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [notifications, setNotifications] = useState({
    campaigns: true,
    earnings: true,
    marketing: false,
  });
  const [legalModal, setLegalModal] = useState<string | null>(null);

  const legalDocs = [
    { id: 'terms', title: 'Terms of Service', icon: <FileText className="h-4 w-4" /> },
    { id: 'privacy', title: 'Privacy Policy', icon: <Shield className="h-4 w-4" /> },
    { id: 'refund', title: 'Refund Policy', icon: <FileText className="h-4 w-4" /> },
    { id: 'disclaimer', title: 'Disclaimer', icon: <FileText className="h-4 w-4" /> },
    { id: 'agreement', title: 'User Agreement', icon: <FileText className="h-4 w-4" /> },
  ];

  const handleSave = () => {
    onUpdateUser({ ...user, name, email });
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Settings" size="lg">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 p-1 bg-muted mx-6 mt-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <div className="p-6">
            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6 mt-0">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-chart-2 text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">JPG, PNG max 5MB</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label>Current Role</Label>
                <div className="flex items-center gap-3">
                  <Badge className="bg-primary capitalize">{user.role}</Badge>
                  {user.role === 'host' && user.isHostVerified && (
                    <Badge className="bg-blue-500">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified Host
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Switch roles from the settings menu in the sidebar.
                </p>
              </div>

              <Button onClick={handleSave} className="w-full bg-gradient-to-r from-primary to-chart-2">
                Save Changes
              </Button>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6 mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-semibold">Campaign Updates</p>
                    <p className="text-sm text-muted-foreground">
                      New campaigns, approvals, and rejections
                    </p>
                  </div>
                  <Switch
                    checked={notifications.campaigns}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, campaigns: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-semibold">Earnings & Payments</p>
                    <p className="text-sm text-muted-foreground">
                      Payment confirmations and earnings updates
                    </p>
                  </div>
                  <Switch
                    checked={notifications.earnings}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, earnings: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-semibold">Marketing Emails</p>
                    <p className="text-sm text-muted-foreground">
                      News, tips, and promotional content
                    </p>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, marketing: checked })
                    }
                  />
                </div>
              </div>
            </TabsContent>

            {/* Legal Tab */}
            <TabsContent value="legal" className="space-y-4 mt-0">
              {legalDocs.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setLegalModal(doc.id)}
                  className="w-full flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    {doc.icon}
                    <span className="font-semibold">{doc.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">View →</span>
                </button>
              ))}

              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-sm mt-6">
                <p className="font-semibold mb-1">Legal Information</p>
                <p className="text-muted-foreground">
                  By using Promora, you agree to our terms and policies. Last updated: February 2, 2026
                </p>
              </div>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account" className="space-y-6 mt-0">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Change Password</h3>
                  <div className="space-y-3">
                    <Input
                      type="password"
                      placeholder="Current password"
                      className="bg-background"
                    />
                    <Input
                      type="password"
                      placeholder="New password"
                      className="bg-background"
                    />
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      className="bg-background"
                    />
                  </div>
                  <Button className="mt-3 w-full">Update Password</Button>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="font-semibold mb-2 text-destructive">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Once you delete your account, there is no going back.
                  </p>
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </Modal>

      {/* Legal Document Modals */}
      <Modal
        isOpen={legalModal !== null}
        onClose={() => setLegalModal(null)}
        title={legalDocs.find((d) => d.id === legalModal)?.title || ''}
        size="lg"
      >
        <div className="p-6">
          <div className="prose prose-invert max-w-none">
            <h3>1. Introduction</h3>
            <p className="text-muted-foreground">
              Welcome to Promora. These {legalDocs.find((d) => d.id === legalModal)?.title.toLowerCase()} govern your use of our platform...
            </p>

            <h3>2. Platform-Held Funds</h3>
            <p className="text-muted-foreground">
              All campaign budgets are held securely by Promora and released to creators only after views are verified. We never use the term "escrow" but operate on a similar trust-based system.
            </p>

            <h3>3. Verification Process</h3>
            <p className="text-muted-foreground">
              Content verification can take up to 12 hours. Only verified views count toward creator earnings.
            </p>

            <h3>4. Payment Terms</h3>
            <p className="text-muted-foreground">
              Payments are processed within 48 hours of verification. Creators receive transparent payment ledgers.
            </p>

            <h3>5. Refund Policy</h3>
            <p className="text-muted-foreground">
              Hosts can withdraw unused funds at any time. Creator earnings are non-refundable once verified.
            </p>

            <p className="text-sm text-muted-foreground mt-8">
              Last updated: February 2, 2026
            </p>
          </div>

          <Button
            onClick={() => setLegalModal(null)}
            className="w-full mt-6"
            variant="outline"
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}
