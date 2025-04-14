
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Bell, Check, AlertCircle, Info, Download, Clock, Server, GitMerge, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const NotificationItem = ({ 
  icon, 
  title, 
  description, 
  time, 
  isRead = false, 
  variant = "default" 
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  isRead?: boolean;
  variant?: "default" | "error" | "warning" | "info";
}) => {
  const { toast } = useToast();
  
  const handleMarkAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Notification Marked as Read",
      description: "This notification has been marked as read",
    });
  };

  const handleClick = () => {
    toast({
      title: "Notification Details",
      description: title,
    });
  };

  const getBgColor = () => {
    if (isRead) return "bg-white hover:bg-gray-50";
    switch(variant) {
      case "error": return "bg-red-50 hover:bg-red-100";
      case "warning": return "bg-amber-50 hover:bg-amber-100";
      case "info": return "bg-blue-50 hover:bg-blue-100";
      default: return "bg-green-50 hover:bg-green-100";
    }
  };

  return (
    <div 
      className={`p-3 rounded-md border cursor-pointer transition-colors ${getBgColor()}`}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">{icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-medium">{title}</p>
            {!isRead && (
              <Badge variant="outline" className="text-xs py-0 h-5">New</Badge>
            )}
          </div>
          <p className="text-sm text-gray-600">{description}</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500">{time}</span>
            {!isRead && (
              <Button size="sm" variant="ghost" onClick={handleMarkAsRead} className="h-6 text-xs">
                <Check className="h-3 w-3 mr-1" /> Mark as read
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const { toast } = useToast();

  const handleMarkAllRead = () => {
    toast({
      title: "All notifications marked as read",
    });
  };

  return (
    <Layout>
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Notifications</h1>
        <p className="text-sm sm:text-base text-gray-600">View and manage your DevOps notifications</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notification Center
          </CardTitle>
          <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
            <Check className="h-4 w-4 mr-1" /> Mark all as read
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="deployments">Deployments</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-3 pt-4">
              <NotificationItem 
                icon={<AlertCircle className="h-5 w-5 text-red-500" />}
                title="Production Deployment Failed"
                description="The production deployment pipeline failed due to failed unit tests."
                time="10 minutes ago"
                isRead={false}
                variant="error"
              />
              <NotificationItem 
                icon={<Server className="h-5 w-5 text-green-500" />}
                title="Staging Environment Updated"
                description="The staging environment has been successfully updated to version 2.4.1"
                time="1 hour ago"
                isRead={false}
              />
              <NotificationItem 
                icon={<Activity className="h-5 w-5 text-amber-500" />}
                title="High CPU Usage Alert"
                description="Database server db-prod-3 is experiencing high CPU usage (92%)"
                time="2 hours ago"
                isRead={false}
                variant="warning"
              />
              <NotificationItem 
                icon={<GitMerge className="h-5 w-5 text-purple-500" />}
                title="Pull Request Merged"
                description="Pull request #423 'Fix memory leak in API service' has been merged"
                time="5 hours ago"
                isRead={true}
              />
              <NotificationItem 
                icon={<Download className="h-5 w-5 text-blue-500" />}
                title="New Version Available"
                description="A new version of the Docker image is available for deployment"
                time="Yesterday"
                isRead={true}
                variant="info"
              />
            </TabsContent>
            
            <TabsContent value="alerts" className="space-y-3 pt-4">
              <NotificationItem 
                icon={<AlertCircle className="h-5 w-5 text-red-500" />}
                title="Production Deployment Failed"
                description="The production deployment pipeline failed due to failed unit tests."
                time="10 minutes ago"
                isRead={false}
                variant="error"
              />
              <NotificationItem 
                icon={<Activity className="h-5 w-5 text-amber-500" />}
                title="High CPU Usage Alert"
                description="Database server db-prod-3 is experiencing high CPU usage (92%)"
                time="2 hours ago"
                isRead={false}
                variant="warning"
              />
              <NotificationItem 
                icon={<Info className="h-5 w-5 text-blue-500" />}
                title="Security Update Available"
                description="Critical security patch is available for Kubernetes cluster"
                time="3 days ago"
                isRead={true}
                variant="info"
              />
            </TabsContent>
            
            <TabsContent value="deployments" className="space-y-3 pt-4">
              <NotificationItem 
                icon={<Server className="h-5 w-5 text-green-500" />}
                title="Staging Environment Updated"
                description="The staging environment has been successfully updated to version 2.4.1"
                time="1 hour ago"
                isRead={false}
              />
              <NotificationItem 
                icon={<GitMerge className="h-5 w-5 text-purple-500" />}
                title="Pull Request Merged"
                description="Pull request #423 'Fix memory leak in API service' has been merged"
                time="5 hours ago"
                isRead={true}
              />
              <NotificationItem 
                icon={<Download className="h-5 w-5 text-blue-500" />}
                title="New Version Available"
                description="A new version of the Docker image is available for deployment"
                time="Yesterday"
                isRead={true}
                variant="info"
              />
            </TabsContent>
            
            <TabsContent value="system" className="space-y-3 pt-4">
              <NotificationItem 
                icon={<Activity className="h-5 w-5 text-amber-500" />}
                title="High CPU Usage Alert"
                description="Database server db-prod-3 is experiencing high CPU usage (92%)"
                time="2 hours ago"
                isRead={false}
                variant="warning"
              />
              <NotificationItem 
                icon={<Clock className="h-5 w-5 text-blue-500" />}
                title="Scheduled Maintenance"
                description="Scheduled maintenance for the CI/CD pipeline on Saturday at 2 AM"
                time="2 days ago"
                isRead={true}
                variant="info"
              />
              <NotificationItem 
                icon={<Server className="h-5 w-5 text-red-500" />}
                title="Database Connection Issues"
                description="Intermittent connection issues with the staging database"
                time="3 days ago"
                isRead={true}
                variant="error"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Notifications;
