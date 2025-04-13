
import React from "react";
import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

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
  return (
    <Card className="border-hospital-secondary">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <CalendarClock className="h-5 w-5 text-hospital-primary mr-2" />
          <h3 className="font-medium">Upcoming Appointment</h3>
        </div>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="text-2xl font-bold mb-1 text-hospital-primary">{date}</div>
        <div className="text-lg font-medium mb-3">{time}</div>
        
        <div className="space-y-1">
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-600">Doctor:</span> Dr. {doctor}
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-600">Department:</span> {department}
          </div>
        </div>
      </CardContent>
      {showActions && (
        <CardFooter className="flex justify-between gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            Reschedule
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 text-red-500 hover:text-red-600 hover:bg-red-50">
            Cancel
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default UpcomingAppointment;
