import { useLocation, useNavigate } from "react-router-dom";
import { Home, Shield, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Activated", icon: Shield, path: "/activated" },
  { label: "Daily Formation", icon: Sun, path: "/daily-formation" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 border-t"
      style={{
        backdropFilter: "blur(14px)",
        background: "rgba(12, 70, 81, 0.6)",
      }}
    >
      <div className="flex h-16 items-center justify-around">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-1 text-xs transition-colors"
              style={{
                color: active ? "#DDFF2C" : "rgba(248, 247, 242, 0.45)",
              }}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
