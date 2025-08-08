import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Bell, 
  Shield, 
  LogOut, 
  Edit3, 
  Mail, 
  MapPin, 
  Briefcase,
  Star,
  DollarSign,
  Download,
  Share2,
  HelpCircle,
  Info,
  Filter,
  X,
  Check,
  Home,
  ChevronRight,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define types for our filters
type FilterCategory = 'jobType' | 'experience' | 'location' | 'salary';
type FilterValues = {
  [key: string]: boolean;
};

type Filters = {
  jobType: FilterValues;
  experience: FilterValues;
  location: FilterValues;
  salary: FilterValues;
};

const SettingsScreen = () => {
  const [expandedFilter, setExpandedFilter] = useState<FilterCategory | null>(null);
  const [notifications, setNotifications] = useState({
    jobAlerts: true,
    emailUpdates: false,
    pushNotifications: true,
    weeklyDigest: true,
  });

  const [filters, setFilters] = useState<Filters>({
    jobType: {
      fullTime: true,
      partTime: true,
      internship: true,
      contract: true,
    },
    experience: {
      entry: true,
      mid: true,
      senior: true,
      executive: true,
    },
    location: {
      remote: true,
      onSite: true,
      hybrid: true,
    },
    salary: {
      low: true,
      medium: true,
      high: true,
    }
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleFilterChange = (category: FilterCategory, filterKey: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [filterKey]: !prev[category][filterKey]
      }
    }));
  };

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
    
    toast({
      title: "Preferences Updated",
      description: "Your notification settings have been saved.",
    });
  };

  const settingSections = [
    {
      title: "Filters",
      icon: Filter,
      items: [
        {
          id: "jobType",
          label: "Job Types",
          icon: Briefcase,
        },
        {
          id: "experience",
          label: "Experience Levels",
          icon: Star,
        },
        {
          id: "location",
          label: "Work Location",
          icon: MapPin,
        },
        {
          id: "salary",
          label: "Salary Ranges",
          icon: DollarSign,
        },
      ]
    },
    {
      title: "Account",
      icon: User,
      items: [
        {
          id: "editProfile",
          label: "Edit Profile",
          icon: Edit3,
          action: () => toast({ title: "Coming Soon", description: "Profile editing coming soon!" })
        },
        {
          id: "changeEmail",
          label: "Change Email",
          icon: Mail,
          action: () => toast({ title: "Coming Soon", description: "Email change coming soon!" })
        },
        {
          id: "changePassword",
          label: "Change Password",
          icon: Shield,
          action: () => toast({ title: "Coming Soon", description: "Password change coming soon!" })
        },
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { 
          id: "jobAlerts", 
          label: "Job Alerts", 
          hasSwitch: true,
          value: notifications.jobAlerts,
          onChange: () => handleNotificationChange("jobAlerts")
        },
        { 
          id: "emailUpdates", 
          label: "Email Updates", 
          hasSwitch: true,
          value: notifications.emailUpdates,
          onChange: () => handleNotificationChange("emailUpdates")
        },
        { 
          id: "pushNotifications", 
          label: "Push Notifications", 
          hasSwitch: true,
          value: notifications.pushNotifications,
          onChange: () => handleNotificationChange("pushNotifications")
        },
        { 
          id: "weeklyDigest", 
          label: "Weekly Digest", 
          hasSwitch: true,
          value: notifications.weeklyDigest,
          onChange: () => handleNotificationChange("weeklyDigest")
        },
      ]
    },
    {
      title: "Support",
      icon: HelpCircle,
      items: [
        {
          id: "helpCenter",
          label: "Help Center",
          icon: HelpCircle,
          action: () => toast({ title: "Coming Soon", description: "Help center coming soon!" })
        },
        {
          id: "contactSupport",
          label: "Contact Support",
          icon: Mail,
          action: () => toast({ title: "Coming Soon", description: "Contact support coming soon!" })
        },
        {
          id: "about",
          label: "About JobsHub",
          icon: Info,
          action: () => navigate('/')
        },
      ]
    },
    {
      title: "Legal",
      icon: Shield,
      items: [
        {
          id: "privacy",
          label: "Privacy Policy",
          icon: Shield,
          action: () => toast({ title: "Coming Soon", description: "Privacy policy coming soon!" })
        },
        {
          id: "terms",
          label: "Terms of Service",
          icon: FileText,
          action: () => toast({ title: "Coming Soon", description: "Terms of service coming soon!" })
        },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground"
              >
                <Home className="w-5 h-5" />
              </Button>
              <h1 
                className="text-2xl font-bold text-foreground cursor-pointer hover:text-primary transition-colors"
                onClick={() => navigate('/')}
              >
                JobsHub
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="text-foreground hover:bg-secondary"
              >
                Log In
              </Button>
              <Button 
                variant="default" 
                onClick={() => navigate('/signup')}
                className="bg-primary hover:bg-primary/90"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">John Doe</h3>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">john.doe@example.com</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Bangalore, India</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        Premium Member
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Software Engineer
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Settings Sections */}
          {settingSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (sectionIndex + 1) * 0.1 }}
              className="mb-6"
            >
              <Card className="glass-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <section.icon className="w-5 h-5 text-primary" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <div key={item.id}>
                      <div 
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                        onClick={() => {
                          if (item.action) {
                            item.action();
                          } else if (['jobType', 'experience', 'location', 'salary'].includes(item.id)) {
                            setExpandedFilter(expandedFilter === item.id ? null : item.id as FilterCategory);
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon && (
                            <div className="p-1.5 rounded-md bg-accent">
                              <item.icon className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}
                          <span className="text-foreground">{item.label}</span>
                        </div>
                        {item.hasSwitch ? (
                          <Switch
                            checked={item.value}
                            onCheckedChange={item.onChange}
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      
                      {expandedFilter === item.id && (
                        <div className="space-y-2 mt-2 ml-8">
                          {Object.entries(filters[item.id as keyof typeof filters] || {}).map(([key, value]) => (
                            <div 
                              key={key}
                              className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-muted/50 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFilterChange(item.id as FilterCategory, key);
                              }}
                            >
                              <span className="text-sm text-foreground capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                                value 
                                  ? 'bg-primary border-primary' 
                                  : 'border-border'
                              }`}>
                                {value && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {itemIndex < section.items.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          {/* Logout Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (settingSections.length + 1) * 0.1 }}
          >
            <Card className="glass-card border-destructive/20">
              <CardContent className="p-4">
                <Button
                  variant="destructive"
                  className="w-full gap-2"
                  onClick={() => toast({ 
                    title: "Logged Out", 
                    description: "You have been successfully logged out." 
                  })}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (settingSections.length + 2) * 0.1 }}
            className="text-center text-sm text-muted-foreground py-6"
          >
            <p>JobsHub v1.0.0</p>
            <p className="mt-1">
              Built with ❤️ for job seekers
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;