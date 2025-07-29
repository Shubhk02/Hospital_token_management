
import React, { useState } from "react";
import { CalendarClock, Calendar, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface AppointmentProps {
  date: string;
  time: string;
  doctor: string;
  department: string;
  showActions?: boolean;
  onCancel?: () => void;
  onReschedule?: () => void;
}

const UpcomingAppointment: React.FC<AppointmentProps> = ({
  date,
  time,
  doctor,
  department,
  showActions = true,
  onCancel,
  onReschedule,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleReschedule = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (onReschedule) {
        onReschedule();
      } else {
        navigate("/appointments");
        toast({
          title: "Reschedule Appointment",
          description: "Navigate to appointments page to reschedule",
        });
      }
      setIsLoading(false);
    }, 500);
  };

  const handleCancelConfirm = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (onCancel) {
        onCancel();
      }
      toast({
        title: "Appointment Cancelled",
        description: "Your appointment has been successfully cancelled.",
        variant: "destructive",
      });
      setIsLoading(false);
    }, 500);
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
            className="w-full flex-1 text-xs sm:text-sm flex items-center justify-center hover-scale transition-all duration-200 border-primary/20 hover:border-primary/40"
            onClick={handleReschedule}
            disabled={isLoading}
          >
            <Calendar className="mr-1 h-3.5 w-3.5" />
            {isLoading ? "Processing..." : "Reschedule"}
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full flex-1 text-red-500 hover:text-red-600 hover:bg-red-50 text-xs sm:text-sm flex items-center justify-center hover-scale transition-all duration-200 border border-transparent hover:border-red-200"
                disabled={isLoading}
              >
                <X className="mr-1 h-3.5 w-3.5" />
                Cancel
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="animate-scale-in">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Cancel Appointment
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel your appointment with Dr. {doctor} on {date} at {time}? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="hover-scale">Keep Appointment</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleCancelConfirm}
                  className="bg-red-500 hover:bg-red-600 hover-scale"
                >
                  Yes, Cancel
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      )}
    </Card>
  );
};

export default UpcomingAppointment;
