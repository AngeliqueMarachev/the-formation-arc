import { useLocation, useNavigate } from "react-router-dom";
import { Heart, CloudSnow, AudioLines } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Home", icon: Heart, path: "/" },
  { label: "Activated", icon: CloudSnow, path: "/activated" },
  { label: "Daily Formation", icon: AudioLines, path: "/daily-formation" },
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
              className="flex flex-col items-center gap-1 text-xs group"
              style={{
                color: active ? "#DDFF2C" : "rgba(248, 247, 242, 0.45)",
                transition: "transform 180ms ease, color 180ms ease",
              }}
            >
              <tab.icon
                className="h-5 w-5 transition-transform duration-[180ms] ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.04] group-active:scale-95"
              />
              <span className="transition-opacity duration-[180ms] ease-out group-hover:opacity-100"
                style={{ opacity: active ? 1 : 0.85 }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
