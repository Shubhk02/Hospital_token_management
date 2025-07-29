
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
      time: "10:30",
      date: "2024-01-15",
      estimatedWait: "15 min",
      status: "waiting" as const
    },
    {
      id: "2",
      tokenNumber: "G048",
      department: "General Medicine",
      doctor: "Malhotra",
      time: "14:15",
      date: "2024-01-14",
      estimatedWait: "N/A",
      status: "complete" as const
    },
    {
      id: "3",
      tokenNumber: "P012",
      department: "Pediatrics",
      doctor: "Agarwal",
      time: "14:00",
      date: "2024-04-15",
      estimatedWait: "N/A",
      status: "scheduled" as const
    }
  ]);

  const handleTokenGenerated = (tokenInfo: {
    tokenNumber: string;
    department: string;
    doctor: string;
    estimatedWait: string;
    date: string;
    time: string;
  }) => {
    const newToken = {
      id: Date.now().toString(),
      tokenNumber: tokenInfo.tokenNumber,
      department: tokenInfo.department,
      doctor: tokenInfo.doctor,
      time: tokenInfo.time,
      date: tokenInfo.date,
      estimatedWait: tokenInfo.estimatedWait,
      status: "waiting" as const
    };
    
    console.log("Adding new token:", newToken); // Debug log
    setTokens(prevTokens => {
      const updatedTokens = [newToken, ...prevTokens];
      console.log("Updated tokens:", updatedTokens); // Debug log
      return updatedTokens;
    });
    
    toast({
      title: "Token Generated",
      description: `Your token ${tokenInfo.tokenNumber} for ${tokenInfo.department} on ${tokenInfo.date} at ${tokenInfo.time}`,
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
    // Update the scheduled appointment status to waiting (rescheduled)
    setTokens(prevTokens => {
      return prevTokens.map(token => 
        token.status === "scheduled" 
          ? { ...token, status: "waiting" as const }
          : token
      );
    });
    
    navigate("/appointments");
    toast({
      title: "Appointment Rescheduled",
      description: "Your appointment has been moved to waiting status.",
    });
  };

  const handleCancelAppointment = () => {
    // Find and remove the scheduled appointment from tokens
    setTokens(prevTokens => {
      return prevTokens.filter(token => token.status !== "scheduled");
    });
    
    toast({
      title: "Appointment Cancelled",
      description: "Your scheduled appointment has been removed from services.",
    });
  };

  const handleSelectDepartment = (department: string) => {
    toast({
      title: "Department Selected",
      description: `You selected the ${department} department`,
    });
  };

  // Find the scheduled appointment from tokens
  const scheduledAppointment = tokens.find(token => token.status === "scheduled");

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
            {scheduledAppointment ? (
              <UpcomingAppointment 
                date={scheduledAppointment.date} 
                time={scheduledAppointment.time}
                doctor={scheduledAppointment.doctor}
                department={scheduledAppointment.department}
                showActions={true}
                onCancel={handleCancelAppointment}
                onReschedule={handleRescheduleAppointment}
              />
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <p className="text-gray-500 text-sm">No upcoming appointments</p>
              </div>
            )}
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
                  date={token.date}
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
