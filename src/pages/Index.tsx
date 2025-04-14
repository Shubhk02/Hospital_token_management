
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import TokenCard from "@/components/dashboard/TokenCard";
import QueueStatus from "@/components/dashboard/QueueStatus";
import UpcomingAppointment from "@/components/dashboard/UpcomingAppointment";
import DepartmentSelector from "@/components/dashboard/DepartmentSelector";
import CurrentToken from "@/components/dashboard/CurrentToken";
import TokenGenerator from "@/components/dashboard/TokenGenerator";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [tokens, setTokens] = useState([
    {
      id: "1",
      tokenNumber: "C024",
      department: "Cardiology",
      doctor: "Sharma",
      time: "10:30 AM",
      estimatedWait: "15 min",
      status: "waiting" as const
    },
    {
      id: "2",
      tokenNumber: "G048",
      department: "General Medicine",
      doctor: "Malhotra",
      time: "Yesterday, 2:15 PM",
      estimatedWait: "N/A",
      status: "complete" as const
    },
    {
      id: "3",
      tokenNumber: "P012",
      department: "Pediatrics",
      doctor: "Agarwal",
      time: "April 15, 2:00 PM",
      estimatedWait: "N/A",
      status: "scheduled" as const
    }
  ]);

  const handleTokenGenerated = (tokenInfo: {
    tokenNumber: string;
    department: string;
    doctor: string;
    estimatedWait: string;
  }) => {
    const newToken = {
      id: Date.now().toString(),
      tokenNumber: tokenInfo.tokenNumber,
      department: tokenInfo.department,
      doctor: tokenInfo.doctor,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      estimatedWait: tokenInfo.estimatedWait,
      status: "waiting" as const
    };
    
    setTokens([newToken, ...tokens]);
    toast({
      title: "Token Generated",
      description: `Your token ${tokenInfo.tokenNumber} for ${tokenInfo.department} has been created.`,
    });
  };

  const handleNewTokenClick = () => {
    document.getElementById("token-generator")?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTokenCardClick = (id: string) => {
    toast({
      title: "Token Selected",
      description: `You selected token with ID: ${id}`,
    });
  };

  const handleRescheduleAppointment = () => {
    navigate("/appointments");
    toast({
      title: "Reschedule Appointment",
      description: "Navigate to appointments page to reschedule",
    });
  };

  const handleCancelAppointment = () => {
    toast({
      title: "Cancel Appointment",
      description: "Are you sure you want to cancel this appointment?",
      variant: "destructive",
    });
  };

  const handleSelectDepartment = (department: string) => {
    toast({
      title: "Department Selected",
      description: `You selected the ${department} department`,
    });
  };

  return (
    <Layout>
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Welcome to Careflow</h1>
        <p className="text-sm sm:text-base text-gray-600">DevOps monitoring and management platform</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CurrentToken 
              tokenNumber="C024" 
              department="Cardiology"
              doctor="Sharma"
              status="waiting"
            />
            <UpcomingAppointment 
              date="April 15" 
              time="2:00 PM"
              doctor="Agarwal"
              department="Pediatrics"
              showActions={true}
            />
          </div>

          <Tabs defaultValue="departments" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="departments">Infrastructure</TabsTrigger>
              <TabsTrigger value="queue">Deployment Status</TabsTrigger>
            </TabsList>
            <TabsContent value="departments" className="pt-4">
              <DepartmentSelector onSelectDepartment={handleSelectDepartment} />
            </TabsContent>
            <TabsContent value="queue" className="pt-4">
              <QueueStatus />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-base sm:text-lg font-semibold">My Services</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-hospital-primary hover:bg-hospital-secondary transition-colors"
              onClick={handleNewTokenClick}
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              <span className="hidden xs:inline-block">New Service</span>
            </Button>
          </div>
          
          <div className="space-y-3 max-h-60 sm:max-h-80 overflow-y-auto pr-1">
            {tokens.map((token) => (
              <div 
                key={token.id} 
                onClick={() => handleTokenCardClick(token.id)}
                className="cursor-pointer transition-transform hover:-translate-y-0.5"
              >
                <TokenCard
                  tokenNumber={token.tokenNumber}
                  department={token.department}
                  doctor={token.doctor}
                  time={token.time}
                  estimatedWait={token.estimatedWait}
                  status={token.status}
                />
              </div>
            ))}
          </div>
          
          <div id="token-generator">
            <TokenGenerator onTokenGenerated={handleTokenGenerated} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
