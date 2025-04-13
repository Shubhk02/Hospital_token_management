
import React from "react";
import { 
  Heart, 
  Stethoscope, 
  Brain, 
  Bone, 
  Baby, 
  Eye, 
  Pill, 
  Scissors
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface DepartmentItemProps {
  name: string;
  icon: React.ReactNode;
  count: number;
  onClick?: () => void;
}

const DepartmentItem: React.FC<DepartmentItemProps> = ({
  name,
  icon,
  count,
  onClick,
}) => {
  const handleClick = () => {
    toast({
      title: "Department Selected",
      description: `You selected the ${name} department`,
    });
    if (onClick) onClick();
  };

  return (
    <div 
      className="department-card flex flex-col items-center p-2 xs:p-3 sm:p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:border-hospital-primary cursor-pointer transition-all"
      onClick={handleClick}
    >
      <div className="h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 rounded-full bg-hospital-secondary flex items-center justify-center mb-2 xs:mb-3 department-icon">
        <div className="text-hospital-primary scale-75 xs:scale-90 sm:scale-100">{icon}</div>
      </div>
      <h3 className="font-medium text-xs xs:text-sm text-center mb-0.5 xs:mb-1">{name}</h3>
      <p className="text-[10px] xs:text-xs text-gray-500">
        {count} {count === 1 ? "person" : "people"} waiting
      </p>
    </div>
  );
};

interface DepartmentSelectorProps {
  className?: string;
  onSelectDepartment?: (department: string) => void;
}

const DepartmentSelector: React.FC<DepartmentSelectorProps> = ({
  className,
  onSelectDepartment,
}) => {
  const departments = [
    { name: "Cardiology", icon: <Heart className="h-6 w-6" />, count: 12 },
    { name: "General Medicine", icon: <Stethoscope className="h-6 w-6" />, count: 8 },
    { name: "Neurology", icon: <Brain className="h-6 w-6" />, count: 5 },
    { name: "Orthopedics", icon: <Bone className="h-6 w-6" />, count: 7 },
    { name: "Pediatrics", icon: <Baby className="h-6 w-6" />, count: 3 },
    { name: "Ophthalmology", icon: <Eye className="h-6 w-6" />, count: 9 },
    { name: "Pharmacy", icon: <Pill className="h-6 w-6" />, count: 1 },
    { name: "Surgery", icon: <Scissors className="h-6 w-6" />, count: 4 },
  ];

  const handleSelectDepartment = (department: string) => {
    if (onSelectDepartment) {
      onSelectDepartment(department);
    }
  };

  return (
    <div className={cn("", className)}>
      <h2 className="text-base xs:text-lg font-semibold mb-2 xs:mb-4">Select Department</h2>
      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-2 xs:gap-3">
        {departments.map((dept) => (
          <DepartmentItem
            key={dept.name}
            name={dept.name}
            icon={dept.icon}
            count={dept.count}
            onClick={() => handleSelectDepartment(dept.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default DepartmentSelector;
