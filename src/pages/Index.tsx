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
      if (event === 'SIGNED_OUT') {
        navigate("/");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const getErrorMessage = (error: AuthError) => {
    return error.message || "An error occurred during authentication";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#000000',
                  brandAccent: '#333333',
                }
              }
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