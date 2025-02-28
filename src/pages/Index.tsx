
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bot } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Directly navigate to dashboard, bypassing authentication
    navigate("/dashboard");
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
            <p className="text-sm text-gray-400">Redirecting to dashboard...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
