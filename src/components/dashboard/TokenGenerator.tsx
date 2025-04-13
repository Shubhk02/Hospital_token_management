
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TokenGeneratorProps {
  onTokenGenerated?: (tokenInfo: {
    tokenNumber: string;
    department: string;
    doctor: string;
    estimatedWait: string;
  }) => void;
}

const TokenGenerator: React.FC<TokenGeneratorProps> = ({ onTokenGenerated }) => {
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const doctors = {
    "Cardiology": ["Smith", "Johnson", "Williams"],
    "Neurology": ["Brown", "Jones", "Garcia"],
    "Orthopedics": ["Miller", "Davis", "Rodriguez"],
    "Pediatrics": ["Martinez", "Hernandez", "Lopez"],
    "General Medicine": ["Gonzalez", "Wilson", "Anderson"],
  };

  const handleTokenGeneration = () => {
    if (!department || !doctor) {
      toast({
        title: "Please select both department and doctor",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const departmentPrefix = department.charAt(0).toUpperCase();
      const randomNum = Math.floor(Math.random() * 100).toString().padStart(3, '0');
      const tokenNumber = `${departmentPrefix}${randomNum}`;
      const estimatedWait = `${Math.floor(Math.random() * 30) + 10} minutes`;
      
      if (onTokenGenerated) {
        onTokenGenerated({
          tokenNumber,
          department,
          doctor,
          estimatedWait,
        });
      }

      toast({
        title: "Token generated successfully",
        description: `Your token number is ${tokenNumber}`,
      });

      setLoading(false);
      setDepartment("");
      setDoctor("");
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Token</CardTitle>
        <CardDescription>Select department and doctor to get a queue token</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="department" className="text-sm font-medium">
            Department
          </label>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(doctors).map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="doctor" className="text-sm font-medium">
            Doctor
          </label>
          <Select 
            value={doctor} 
            onValueChange={setDoctor} 
            disabled={!department}
          >
            <SelectTrigger>
              <SelectValue placeholder={department ? "Select doctor" : "First select a department"} />
            </SelectTrigger>
            <SelectContent>
              {department && doctors[department as keyof typeof doctors]?.map((doc) => (
                <SelectItem key={doc} value={doc}>
                  Dr. {doc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-hospital-primary hover:bg-hospital-primary/90"
          onClick={handleTokenGeneration}
          disabled={!department || !doctor || loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              Generating...
            </>
          ) : (
            "Generate Token"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TokenGenerator;
