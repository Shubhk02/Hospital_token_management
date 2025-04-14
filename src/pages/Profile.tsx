
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, Settings, ShieldCheck, Bell, LogOut, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSaveChanges = () => {
    toast({
      title: "Changes Saved",
      description: "Your profile has been updated successfully",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully",
    });
    navigate("/");
  };

  return (
    <Layout>
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">My Profile</h1>
        <p className="text-sm sm:text-base text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-2 text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="bg-hospital-primary text-white text-lg">AS</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">Arjun Singh</CardTitle>
              <p className="text-sm text-gray-500">DevOps Engineer</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-2">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span className="font-medium">arjun.singh@careflow.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone:</span>
                    <span className="font-medium">+91 98765 43210</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Department:</span>
                    <span className="font-medium">DevOps Team</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Joined:</span>
                    <span className="font-medium">May 2022</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => toast({ title: "Edit Profile", description: "Edit your personal information" })}
                >
                  Edit Profile
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full flex items-center justify-center text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border rounded-md"
                        defaultValue="Arjun Singh" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <input 
                        type="email" 
                        className="w-full p-2 border rounded-md"
                        defaultValue="arjun.singh@careflow.com" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <input 
                        type="tel" 
                        className="w-full p-2 border rounded-md"
                        defaultValue="+91 98765 43210" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Role</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border rounded-md"
                        defaultValue="DevOps Engineer" 
                        disabled
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveChanges}>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Password</label>
                      <input type="password" className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">New Password</label>
                      <input type="password" className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Confirm New Password</label>
                      <input type="password" className="w-full p-2 border rounded-md" />
                    </div>
                  </div>
                  <Button onClick={handleSaveChanges}>Update Password</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Deployment Alerts</p>
                        <p className="text-sm text-gray-500">Receive alerts when deployments succeed or fail</p>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">CI/CD Pipeline Updates</p>
                        <p className="text-sm text-gray-500">Get notified about pipeline status changes</p>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">System Monitoring</p>
                        <p className="text-sm text-gray-500">Receive system health and performance alerts</p>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <input type="checkbox" className="toggle" />
                    </div>
                  </div>
                  <Button onClick={handleSaveChanges}>Save Preferences</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
