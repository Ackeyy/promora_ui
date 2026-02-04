import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft, LogIn } from 'lucide-react';
import { useState } from 'react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onNavigate: (page: string) => void;
  errorMessage?: string | null;
  onClearError?: () => void;
  isLoading?: boolean;
}

export function LoginPage({ onLogin, onNavigate, errorMessage, onClearError, isLoading }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
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
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-background/70 backdrop-blur-sm">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Logging in...
                </div>
              </div>
            )}
            {/* Logo */}
            <div className="text-center mb-8">
              <motion.h1
                className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                PROMORA
              </motion.h1>
              <p className="text-muted-foreground">Welcome back! Login to continue</p>
            </div>

            {errorMessage && (
              <div className="mb-6 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive shadow-sm">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    onClearError?.();
                  }}
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    onClearError?.();
                  }}
                  required
                  className="bg-background"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-chart-2 hover:shadow-lg hover:shadow-primary/50 transition-all"
                size="lg"
              >
                <LogIn className="mr-2 h-5 w-5" />
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">Don't have an account?</span>
              </div>
            </div>

            {/* Signup Link */}
            <Button
              variant="outline"
              className="w-full border-primary/30 hover:bg-primary/10"
              onClick={() => onNavigate('signup')}
            >
              Create Account
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
