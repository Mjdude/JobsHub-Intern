import { Home, Search, Bookmark, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "search", icon: Search, label: "Search" },
  { id: "saved", icon: Bookmark, label: "Saved" },
  { id: "profile", icon: User, label: "Profile" },
  { id: "settings", icon: Settings, label: "Settings" },
];

const MobileNavigation = ({ activeTab, onTabChange }: MobileNavigationProps) => {
  return (
    <nav className="mobile-nav z-40">
      <div className="flex items-center justify-around py-2">
        {navigationItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              "flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-300",
              "hover:bg-secondary/50 min-w-0 flex-1",
              activeTab === id
                ? "text-primary bg-secondary/30"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon 
              className={cn(
                "w-5 h-5 transition-all duration-300",
                activeTab === id && "scale-110"
              )} 
            />
            <span className="text-xs font-medium truncate">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;