
import React from "react";
import { Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TokenCardProps {
  tokenNumber: string;
  department: string;
  doctor: string;
  time: string;
  estimatedWait: string;
  status: "waiting" | "ready" | "complete" | "scheduled";
  className?: string;
}

const TokenCard: React.FC<TokenCardProps> = ({
  tokenNumber,
  department,
  doctor,
  time,
  estimatedWait,
  status,
  className,
}) => {
  const statusStyles = {
    waiting: {
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      borderColor: "border-amber-200",
      label: "In Queue"
    },
    ready: {
      bgColor: "bg-green-50", 
      textColor: "text-green-700",
      borderColor: "border-green-200",
      label: "Ready"
    },
    complete: {
      bgColor: "bg-gray-50",
      textColor: "text-gray-500",
      borderColor: "border-gray-200",
      label: "Complete"
    },
    scheduled: {
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
      label: "Scheduled"
    }
  };

  const currentStatus = statusStyles[status];

  return (
    <Card className={cn("token-card border transition-all", currentStatus.borderColor, className)}>
      <CardHeader className={cn("pb-2", currentStatus.bgColor)}>
        <div className="flex items-center justify-between">
          <span className={cn("text-sm font-medium rounded-full px-2 py-0.5", currentStatus.bgColor, currentStatus.textColor)}>
            {currentStatus.label}
          </span>
          <span className={cn("text-lg font-bold", currentStatus.textColor)}>
            {tokenNumber}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <h3 className="font-medium text-lg mb-1">{department}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <User className="h-4 w-4 mr-1" />
          <span>Dr. {doctor}</span>
        </div>
        <div className="flex items-center text-sm mb-1">
          <Clock className="h-4 w-4 mr-1 text-hospital-primary" />
          <span>{time}</span>
        </div>
        {status === "waiting" && (
          <div className="text-sm text-gray-500">
            Est. wait: <span className="font-medium">{estimatedWait}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        {status === "waiting" && (
          <Button variant="outline" size="sm" className="w-full text-hospital-primary border-hospital-primary hover:bg-hospital-secondary">
            View Position
          </Button>
        )}
        {status === "ready" && (
          <Button size="sm" className="w-full bg-hospital-primary hover:bg-hospital-primary/90">
            Check In
          </Button>
        )}
        {status === "scheduled" && (
          <Button variant="outline" size="sm" className="w-full">
            View Details
          </Button>
        )}
        {status === "complete" && (
          <Button variant="ghost" size="sm" className="w-full">
            View Summary
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TokenCard;
