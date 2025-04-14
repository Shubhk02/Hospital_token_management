
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { CalendarCheck, Clock, ClipboardList } from "lucide-react";

const Appointments = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      toast({
        title: "Date Selected",
        description: `You selected ${selectedDate.toLocaleDateString()}`,
      });
    }
  };

  const handleBookAppointment = () => {
    toast({
      title: "Appointment Booked",
      description: `Your appointment has been scheduled for ${date?.toLocaleDateString()}`,
    });
    navigate("/");
  };

  return (
    <Layout>
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Manage Appointments</h1>
        <p className="text-sm sm:text-base text-gray-600">Schedule, reschedule, or cancel your appointments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarCheck className="h-5 w-5 mr-2 text-hospital-primary" />
                Schedule an Appointment
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="mb-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                />
              </div>
              <Button 
                className="w-full md:w-auto bg-hospital-primary hover:bg-hospital-primary/90"
                onClick={handleBookAppointment}
              >
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-hospital-primary" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-md bg-gray-50">
                  <div className="font-medium">Dr. Sharma - Cardiology</div>
                  <div className="text-sm text-gray-500">April 15, 2:00 PM</div>
                  <div className="flex mt-2 gap-2">
                    <Button size="sm" variant="outline">Reschedule</Button>
                    <Button size="sm" variant="ghost" className="text-red-500">Cancel</Button>
                  </div>
                </div>
                <div className="p-3 border rounded-md bg-gray-50">
                  <div className="font-medium">Dr. Gupta - Pediatrics</div>
                  <div className="text-sm text-gray-500">April 23, 10:30 AM</div>
                  <div className="flex mt-2 gap-2">
                    <Button size="sm" variant="outline">Reschedule</Button>
                    <Button size="sm" variant="ghost" className="text-red-500">Cancel</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ClipboardList className="h-5 w-5 mr-2 text-hospital-primary" />
                Past Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-md bg-gray-50">
                  <div className="font-medium">Dr. Patel - General Medicine</div>
                  <div className="text-sm text-gray-500">March 10, 9:15 AM</div>
                </div>
                <div className="p-3 border rounded-md bg-gray-50">
                  <div className="font-medium">Dr. Singh - Neurology</div>
                  <div className="text-sm text-gray-500">February 28, 3:45 PM</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Appointments;
