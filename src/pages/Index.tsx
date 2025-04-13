
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

const Index = () => {
  const [tokens, setTokens] = useState([
    {
      id: "1",
      tokenNumber: "C024",
      department: "Cardiology",
      doctor: "Smith",
      time: "10:30 AM",
      estimatedWait: "15 min",
      status: "waiting" as const
    },
    {
      id: "2",
      tokenNumber: "G048",
      department: "General Medicine",
      doctor: "Wilson",
      time: "Yesterday, 2:15 PM",
      estimatedWait: "N/A",
      status: "complete" as const
    },
    {
      id: "3",
      tokenNumber: "P012",
      department: "Pediatrics",
      doctor: "Martinez",
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
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome to HealthQueue</h1>
        <p className="text-gray-600">Manage your hospital visits and queue tokens efficiently</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CurrentToken 
              tokenNumber="C024" 
              department="Cardiology"
              doctor="Smith"
              status="waiting"
            />
            <UpcomingAppointment 
              date="April 15" 
              time="2:00 PM"
              doctor="Martinez"
              department="Pediatrics"
            />
          </div>

          <Tabs defaultValue="departments" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="queue">Queue Status</TabsTrigger>
            </TabsList>
            <TabsContent value="departments" className="pt-4">
              <DepartmentSelector />
            </TabsContent>
            <TabsContent value="queue" className="pt-4">
              <QueueStatus />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-semibold">My Tokens</h2>
            <Button variant="ghost" size="sm" className="text-hospital-primary">
              <PlusCircle className="h-4 w-4 mr-1" />
              New Token
            </Button>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {tokens.map((token) => (
              <TokenCard
                key={token.id}
                tokenNumber={token.tokenNumber}
                department={token.department}
                doctor={token.doctor}
                time={token.time}
                estimatedWait={token.estimatedWait}
                status={token.status}
              />
            ))}
          </div>
          
          <TokenGenerator onTokenGenerated={handleTokenGenerated} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
