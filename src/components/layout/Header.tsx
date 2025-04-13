
import React from "react";
import { Bell, HelpCircle, Menu, X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen, sidebarOpen, className }) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 unread notifications",
    });
  };
  
  const handleLogoClick = () => {
    navigate("/");
  };

  const handleAvatarClick = () => {
    navigate("/profile");
  };

  const handleHelpClick = () => {
    toast({
      title: "Help Center",
      description: "Our support team is available 24/7",
    });
  };

  const toggleSidebar = () => {
    if (setSidebarOpen) {
      setSidebarOpen(prev => !prev);
    }
  };

  return (
    <header className={cn("w-full flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 bg-white border-b", className)}>
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleSidebar}
          className="mr-2"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <div 
          className="flex items-center cursor-pointer group"
          onClick={handleLogoClick}
        >
          <div className="h-8 w-8 mr-2 rounded-md bg-hospital-primary flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="text-white font-semibold text-lg">H</span>
          </div>
          <h2 className="text-xl font-bold text-hospital-dark hidden xs:inline-block group-hover:text-hospital-primary transition-colors">HealthQueue</h2>
        </div>
      </div>
      
      <div className="flex items-center space-x-1 sm:space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-gray-100 transition-colors"
                onClick={handleNotificationClick}
              >
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-hospital-primary"></span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden sm:inline-flex hover:bg-gray-100 transition-colors"
                onClick={handleHelpClick}
              >
                <HelpCircle className="h-5 w-5" />
                <span className="sr-only">Help</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Help Center</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button 
          variant="ghost" 
          className="p-0 h-8 w-8 rounded-full hover:bg-transparent" 
          onClick={handleAvatarClick}
        >
          <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-hospital-primary transition-all">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-hospital-accent text-white">PT</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  );
};

export default Header;
