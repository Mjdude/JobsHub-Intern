import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building2, MapPin, Clock, DollarSign, Users } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  postedTime: string;
  description: string;
  tags: string[];
  applicants: number;
  urgent?: boolean;
}

interface JobCardProps {
  job: Job;
  onApply: (jobId: string) => void;
  isSaved?: boolean;
}

const JobCard = ({ job, onApply, isSaved = false }: JobCardProps) => {
  return (
    <Card className="job-card relative overflow-hidden">
      {isSaved ? (
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Saved
          </Badge>
        </div>
      ) : job.urgent ? (
        <div className="absolute top-3 right-3">
          <Badge variant="destructive" className="pulse-golden">
            Urgent
          </Badge>
        </div>
      ) : null}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h3 className="font-semibold text-lg text-foreground leading-tight">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="w-4 h-4" />
              <span className="font-medium">{job.company}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{job.postedTime}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {job.tags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:bg-yellow-900/50"
            >
              {tag}
            </Badge>
          ))}
          {job.tags.length > 3 && (
            <Badge 
              variant="outline" 
              className="text-xs text-yellow-600 border-yellow-300 dark:text-yellow-400 dark:border-yellow-700"
            >
              +{job.tags.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{job.applicants} applicants</span>
          </div>
          
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onApply(job.id);
            }}
            variant={isSaved ? "outline" : "default"}
            className={`px-6 ${isSaved ? 'border-yellow-400 text-yellow-600 hover:bg-yellow-50 dark:border-yellow-600 dark:text-yellow-400 dark:hover:bg-yellow-900/20' : 'btn-golden'}`}
            size="sm"
          >
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;