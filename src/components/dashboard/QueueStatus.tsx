
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DepartmentQueueProps {
  department: string;
  currentToken: string;
  waitingCount: number;
  estimatedTime: string;
}

const DepartmentQueue: React.FC<DepartmentQueueProps> = ({
  department,
  currentToken,
  waitingCount,
  estimatedTime,
}) => {
  // Calculate percentage progress (for demo purposes)
  const progress = Math.min(100, (parseInt(currentToken.replace(/\D/g, '')) / 100) * 100);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-medium">{department}</h3>
        <span className="text-sm text-gray-500">Current: <span className="font-bold text-hospital-primary">{currentToken}</span></span>
      </div>
      <Progress value={progress} className="h-2 mb-1" />
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{waitingCount} waiting</span>
        <span>~{estimatedTime} wait</span>
      </div>
    </div>
  );
};

const QueueStatus: React.FC = () => {
  const departmentQueues = [
    { 
      department: "General Medicine", 
      currentToken: "G043", 
      waitingCount: 12, 
      estimatedTime: "25 min" 
    },
    { 
      department: "Pediatrics", 
      currentToken: "P018", 
      waitingCount: 5, 
      estimatedTime: "15 min" 
    },
    { 
      department: "Orthopedics", 
      currentToken: "O032", 
      waitingCount: 8, 
      estimatedTime: "40 min" 
    },
    { 
      department: "Ophthalmology", 
      currentToken: "E027", 
      waitingCount: 6, 
      estimatedTime: "20 min" 
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Current Queue Status</CardTitle>
      </CardHeader>
      <CardContent>
        {departmentQueues.map((queue, index) => (
          <DepartmentQueue
            key={index}
            department={queue.department}
            currentToken={queue.currentToken}
            waitingCount={queue.waitingCount}
            estimatedTime={queue.estimatedTime}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default QueueStatus;
