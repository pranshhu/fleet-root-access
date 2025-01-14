import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DashboardNav } from "@/components/DashboardNav";
import { SidebarProvider } from "@/components/ui/sidebar";

const Team = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/");
      }
    };
    
    checkUser();
  }, [navigate]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background dark">
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-white">Team</h1>
        </main>
        <DashboardNav />
      </div>
    </SidebarProvider>
  );
};

export default Team;