
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  CalendarDays, 
  LayoutDashboard, 
  Clock, 
  FileText, 
  Settings, 
  User, 
  LogOut,
  Stethoscope,
  Hospital,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, className }) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const navItems = [
    { 
      name: "Dashboard", 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      path: "/" 
    },
    { 
      name: "Appointments", 
      icon: <CalendarDays className="h-5 w-5" />, 
      path: "/appointments" 
    },
    { 
      name: "Queue Status", 
      icon: <Clock className="h-5 w-5" />, 
      path: "/queue" 
    },
    { 
      name: "Departments", 
      icon: <Hospital className="h-5 w-5" />, 
      path: "/departments" 
    },
    { 
      name: "Doctors", 
      icon: <Stethoscope className="h-5 w-5" />, 
      path: "/doctors" 
    },
    { 
      name: "Medical Records", 
      icon: <FileText className="h-5 w-5" />, 
      path: "/records" 
    },
    { 
      name: "Profile", 
      icon: <User className="h-5 w-5" />, 
      path: "/profile" 
    },
    { 
      name: "Settings", 
      icon: <Settings className="h-5 w-5" />, 
      path: "/settings" 
    }
  ];

  const handleSignOut = () => {
    toast({
      title: "Signing out",
      description: "You have been signed out successfully",
    });
    navigate("/");
  };

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:shadow-lg",
        className
      )}
      aria-hidden={!isOpen}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 border-b">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="h-8 w-8 mr-2 rounded-md bg-hospital-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-semibold text-lg">H</span>
            </div>
            <h2 className="text-xl font-bold text-hospital-dark group-hover:text-hospital-primary transition-colors">HealthQueue</h2>
          </div>
          
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="md:hidden"
              aria-label="Close sidebar"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <nav className="flex-1 overflow-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-hospital-primary text-white" 
                      : "text-gray-700 hover:bg-hospital-secondary hover:text-hospital-primary"
                  )}
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
