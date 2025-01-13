import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AuthError, AuthChangeEvent } from "@supabase/supabase-js";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session) => {
      if (event === 'SIGNED_IN' && session) {
        toast.success("Successfully signed in!");
        navigate("/dashboard");
      }
      if (event === 'SIGNED_UP') {
        toast.success("Account created successfully!");
      }
      if (event === 'PASSWORD_RECOVERY') {
        toast.info("Check your email for the password reset link");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent) => {
      if (event === 'USER_ERROR') {
        const { error } = await supabase.auth.getSession();
        if (error) {
          const errorMessage = getErrorMessage(error);
          toast.error(errorMessage);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getErrorMessage = (error: AuthError) => {
    try {
      if (error.message.includes('invalid_credentials')) {
        return 'Invalid email or password';
      }
      if (error.message.includes('weak_password')) {
        return 'Password should be at least 6 characters long';
      }
      return error.message;
    } catch {
      return 'An error occurred during authentication';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 dark">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-xl border border-gray-700">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">Robot Fleet Management</h1>
          <p className="text-gray-400">Sign in or create an account to continue</p>
        </div>
        
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#3B82F6',
                  brandAccent: '#2563EB',
                  inputBackground: '#1F2937',
                  inputText: 'white',
                  inputPlaceholder: '#9CA3AF',
                  inputBorder: '#374151',
                  inputLabelText: '#D1D5DB',
                }
              }
            },
            className: {
              container: 'w-full',
              button: 'w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md',
              input: 'w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
              label: 'block text-sm font-medium text-gray-300 mb-1',
              loader: 'border-gray-300',
              message: 'text-gray-300',
              anchor: 'text-blue-400 hover:text-blue-300',
            }
          }}
          theme="dark"
          providers={[]}
        />
      </div>
    </div>
  );
};

export default Index;