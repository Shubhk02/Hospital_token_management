
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isMobile && sidebarOpen) {
        const sidebar = document.getElementById("sidebar");
        const sidebarTrigger = document.getElementById("sidebar-trigger");
        
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Header 
          setSidebarOpen={setSidebarOpen} 
          className="sticky top-0 z-10"
        />
        
        <main className={cn(
          "flex-1 px-4 md:px-6 py-6",
          isMobile && sidebarOpen && "overflow-hidden"
        )}>
          {/* Overlay for mobile when sidebar is open */}
          {isMobile && sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
