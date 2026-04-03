import { useState } from "react";
import logo from "@/assets/formation-arc-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState("");
  const { toast } = useToast();

  const validateEmail = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return "Enter a valid email address";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Enter a valid email address";
    return "";
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(email));
  };

  const handleEmailChange = (value: string) => {
    const lower = value.toLowerCase();
    setEmail(lower);
    if (emailTouched) setEmailError(validateEmail(lower));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    const error = validateEmail(email);
    setEmailError(error);
    if (error) return;
    setLoading(true);

    if (isForgotPassword) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Check your email", description: "We sent you a password reset link." });
      }
      setLoading(false);
      return;
    }

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Check your email", description: "We sent you a confirmation link." });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 pb-12">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-6">
          <img src={logo} alt="The Formation Arc" className="h-32 w-auto mx-auto mt-[22px]" />
          <div className="space-y-1.5 text-supporting italic leading-relaxed">
            <p className="text-primary not-italic font-light">Overcome Fear. Restore identity.</p>
            <p></p>
            <p className="text-base not-italic">A practice for retraining distress and strengthening stability.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={handleEmailBlur}
              placeholder="you@example.com"
              className="bg-secondary"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              inputMode="email"
            />
            {emailTouched && emailError && <p className="text-sm text-muted-foreground mt-1">{emailError}</p>}
          </div>

          {!isForgotPassword && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="bg-secondary pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "..." : isForgotPassword ? "Send Reset Link" : isSignUp ? "Create Account" : "Sign In"}
          </Button>

          {!isForgotPassword && !isSignUp && (
            <button
              type="button"
              onClick={() => setIsForgotPassword(true)}
              className="w-full text-center text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline mt-3"
            >
              Forgot password?
            </button>
          )}

          {isForgotPassword ? (
            <p className="text-center text-sm text-text-supporting mt-2">
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="text-primary underline-offset-4 hover:underline"
              >
                Back to sign in
              </button>
            </p>
          ) : (
            <p className="text-center text-sm text-text-supporting mt-2">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary underline-offset-4 hover:underline"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
