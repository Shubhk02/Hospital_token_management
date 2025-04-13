
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CurrentTokenProps {
  tokenNumber: string;
  department: string;
  doctor?: string;
  status: "active" | "waiting" | "complete";
}

const CurrentToken: React.FC<CurrentTokenProps> = ({
  tokenNumber,
  department,
  doctor,
  status,
}) => {
  const statusDisplay = {
    active: { color: "bg-green-100 text-green-700 border-green-200", text: "Active" },
    waiting: { color: "bg-amber-100 text-amber-700 border-amber-200", text: "Waiting" },
    complete: { color: "bg-gray-100 text-gray-700 border-gray-200", text: "Complete" },
  };

  const currentStatus = statusDisplay[status];

  return (
    <Card className="border-hospital-primary">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Current Token</CardTitle>
          <Badge variant="outline" className={currentStatus.color}>
            {currentStatus.text}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex flex-col items-center justify-center py-4">
          <div className="text-4xl font-bold text-hospital-primary mb-2">{tokenNumber}</div>
          <div className="text-lg font-medium mb-1">{department}</div>
          {doctor && <div className="text-sm text-gray-500">Dr. {doctor}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentToken;
