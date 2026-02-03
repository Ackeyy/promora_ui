import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Checkbox } from '@/app/components/ui/checkbox';
import { ArrowLeft, UserPlus, Users, Store } from 'lucide-react';
import { useState } from 'react';
import type { UserRole } from '@/app/App';

interface SignupPageProps {
  onSignup: (email: string, role: UserRole) => void;
  onNavigate: (page: string) => void;
}

export function SignupPage({ onSignup, onNavigate }: SignupPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('creator');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && agreedToTerms) {
      onSignup(email, selectedRole);
    }
  };

  const roles = [
    {
      value: 'creator' as UserRole,
      label: 'Creator',
      description: 'Join campaigns and earn from views',
      icon: <Users className="h-6 w-6" />,
    },
    {
      value: 'host' as UserRole,
      label: 'Host',
      description: 'Launch campaigns for your brand',
      icon: <Store className="h-6 w-6" />,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-chart-2/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-r from-chart-2/20 to-chart-3/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => onNavigate('landing')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Card */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-chart-2 rounded-2xl blur-xl opacity-20" />
          <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl">
            {/* Logo */}
            <div className="text-center mb-8">
              <motion.h1
                className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                PROMORA
              </motion.h1>
              <p className="text-muted-foreground">Create your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label>I want to</Label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map((role) => (
                    <motion.button
                      key={role.value}
                      type="button"
                      onClick={() => setSelectedRole(role.value)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        p-4 rounded-xl border-2 transition-all text-left
                        ${selectedRole === role.value
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                    >
                      <div className={`
                        inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2
                        ${selectedRole === role.value ? 'bg-primary text-primary-foreground' : 'bg-muted'}
                      `}>
                        {role.icon}
                      </div>
                      <p className="font-semibold mb-1">{role.label}</p>
                      <p className="text-xs text-muted-foreground">{role.description}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background"
                />
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  required
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                  I agree to the{' '}
                  <button type="button" className="text-primary hover:underline">Terms of Service</button>,{' '}
                  <button type="button" className="text-primary hover:underline">Privacy Policy</button>,{' '}
                  <button type="button" className="text-primary hover:underline">Refund Policy</button>,{' '}
                  <button type="button" className="text-primary hover:underline">Disclaimer</button>, and{' '}
                  <button type="button" className="text-primary hover:underline">User Agreement</button>
                </label>
              </div>

              <Button
                type="submit"
                disabled={!agreedToTerms}
                className="w-full bg-gradient-to-r from-primary to-chart-2 hover:shadow-lg hover:shadow-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Create Account
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">Already have an account?</span>
              </div>
            </div>

            {/* Login Link */}
            <Button
              variant="outline"
              className="w-full border-primary/30 hover:bg-primary/10"
              onClick={() => onNavigate('login')}
            >
              Login
            </Button>
          </div>
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 text-sm text-muted-foreground"
        >
          🔒 Your data is secure with us
        </motion.div>
      </motion.div>
    </div>
  );
}
