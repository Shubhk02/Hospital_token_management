
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isMobile && sidebarOpen) {
        const sidebar = document.querySelector(".sidebar-container");
        const sidebarTrigger = document.querySelector(".sidebar-trigger");
        
        if (sidebar && 
            !sidebar.contains(event.target as Node) && 
            sidebarTrigger && 
            !sidebarTrigger.contains(event.target as Node)) {
          setSidebarOpen(false);
        }
      }
    };
    
    document.addEventListener("mousedown", handleOutsideClick);
    
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMobile, sidebarOpen]);

  // Close sidebar on route change for mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        className="sidebar-container"
      />
      
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Header 
          setSidebarOpen={setSidebarOpen} 
          className="sticky top-0 z-10 sidebar-trigger"
        />
        
        <main className={cn(
          "flex-1 px-3 sm:px-4 md:px-6 py-4 sm:py-6",
          isMobile && sidebarOpen && "overflow-hidden"
        )}>
          {/* Overlay for mobile when sidebar is open */}
          {isMobile && sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-in fade-in duration-200"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          <div className="animate-in fade-in duration-300">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
