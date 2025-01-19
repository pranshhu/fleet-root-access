import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AuthError, AuthChangeEvent } from "@supabase/supabase-js";
import { Bot } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session) => {
      if (event === 'SIGNED_IN' && session) {
        toast.success("Successfully signed in!");
        navigate("/dashboard");
      }
      if (event === 'SIGNED_OUT') {
        navigate("/");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1A1F2C] p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <div className="bg-primary/10 p-4 rounded-2xl">
              <Bot className="w-12 h-12 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">Fleet Root Access</h1>
            <p className="text-sm text-gray-400">Sign in to your account to manage your robot fleet</p>
          </div>
        </div>
        <div className="bg-[#221F26] p-8 rounded-xl shadow-2xl border border-gray-800/50">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#4F46E5',
                    brandAccent: '#6366F1',
                    brandButtonText: 'white',
                    defaultButtonBackground: '#2D2B35',
                    defaultButtonBackgroundHover: '#363340',
                    inputBackground: '#2D2B35',
                    inputBorder: '#363340',
                    inputBorderHover: '#4F46E5',
                    inputBorderFocus: '#6366F1',
                  },
                },
              },
              className: {
                container: 'space-y-4',
                label: 'text-sm font-medium text-gray-300',
                input: 'bg-[#2D2B35] border border-gray-700 text-white',
                button: 'w-full',
                divider: 'bg-gray-700',
                anchor: 'text-primary hover:text-primary/80',
              },
            }}
            theme="dark"
            providers={[]}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;