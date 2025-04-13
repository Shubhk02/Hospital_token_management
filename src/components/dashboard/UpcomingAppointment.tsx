
import React from "react";
import { CalendarClock, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface AppointmentProps {
  date: string;
  time: string;
  doctor: string;
  department: string;
  showActions?: boolean;
}

const UpcomingAppointment: React.FC<AppointmentProps> = ({
  date,
  time,
  doctor,
  department,
  showActions = true,
}) => {
  const navigate = useNavigate();

  const handleReschedule = () => {
    navigate("/appointments");
    toast({
      title: "Reschedule Appointment",
      description: "Navigate to appointments page to reschedule",
    });
  };

  const handleCancel = () => {
    toast({
      title: "Cancel Appointment",
      description: "Are you sure you want to cancel this appointment?",
      variant: "destructive",
    });
  };

  return (
    <Card className="border-hospital-secondary">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <CalendarClock className="h-5 w-5 text-hospital-primary mr-2" />
          <h3 className="font-medium">Upcoming Appointment</h3>
        </div>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="text-xl sm:text-2xl font-bold mb-1 text-hospital-primary">{date}</div>
        <div className="text-base sm:text-lg font-medium mb-3">{time}</div>
        
        <div className="space-y-1">
          <div className="text-xs sm:text-sm text-gray-500">
            <span className="font-medium text-gray-600">Doctor:</span> Dr. {doctor}
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            <span className="font-medium text-gray-600">Department:</span> {department}
          </div>
        </div>
      </CardContent>
      {showActions && (
        <CardFooter className="flex flex-col xs:flex-row gap-2 pt-1">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex-1 text-xs sm:text-sm flex items-center justify-center"
            onClick={handleReschedule}
          >
            <Calendar className="mr-1 h-3.5 w-3.5" />
            Reschedule
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full flex-1 text-red-500 hover:text-red-600 hover:bg-red-50 text-xs sm:text-sm flex items-center justify-center"
            onClick={handleCancel}
          >
            <X className="mr-1 h-3.5 w-3.5" />
            Cancel
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default UpcomingAppointment;
