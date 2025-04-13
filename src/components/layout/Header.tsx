
import React from "react";
import { Bell, HelpCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface HeaderProps {
  setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen, className }) => {
  return (
    <header className={cn("w-full flex items-center justify-between px-4 md:px-6 py-3 bg-white border-b", className)}>
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setSidebarOpen && setSidebarOpen(prev => !prev)}
          className="mr-2 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="flex items-center">
          <div className="h-8 w-8 mr-2 rounded-md bg-hospital-primary flex items-center justify-center">
            <span className="text-white font-semibold text-lg">H</span>
          </div>
          <h2 className="text-xl font-bold text-hospital-dark">HealthQueue</h2>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-hospital-primary"></span>
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">Help</span>
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="" alt="User" />
          <AvatarFallback className="bg-hospital-accent text-white">PT</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
