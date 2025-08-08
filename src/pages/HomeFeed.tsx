import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import JobCard from "@/components/JobCard";
import SearchFilters, { SearchFiltersRef } from "@/components/SearchFilters";
import { mockJobs, getFilteredJobs, type Job } from "@/data/mockJobs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, TrendingUp, Star, Search, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BrandCarousel from "@/components/BrandCarousel";

const HomeFeed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
    experience: "",
    salary: "",
  });
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  const searchFiltersRef = useRef<SearchFiltersRef>(null);

  const filteredJobs = getFilteredJobs(jobs, searchQuery, filters);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value === prev[filterType as keyof typeof prev] ? "" : value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      location: "",
      jobType: "",
      experience: "",
      salary: "",
    });
    setSearchQuery("");
  };

  const handleApply = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
        toast({
          title: "Removed from Saved",
          description: `${job?.title} has been removed from your saved jobs.`,
        });
      } else {
        newSaved.add(jobId);
        toast({
          title: "Saved for Later",
          description: `${job?.title} has been saved to your list.`,
        });
      }
      return newSaved;
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    toast({
      title: "Feed Refreshed",
      description: "Showing latest job opportunities",
    });
  };

  useEffect(() => {
    // Auto-refresh every 30 seconds for demo
    const interval = setInterval(() => {
      setJobs(prevJobs => [...prevJobs].sort(() => Math.random() - 0.5));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const urgentJobs = filteredJobs.filter(job => job.urgent);
  const regularJobs = filteredJobs.filter(job => !job.urgent);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
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
              <p className="text-muted-foreground text-sm">
                {filteredJobs.length} opportunities found
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => searchFiltersRef.current?.focusSearch()}
                className="text-muted-foreground hover:text-foreground"
              >
                <Search className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          <SearchFilters
            ref={searchFiltersRef}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
          
          <BrandCarousel />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="px-4 py-3 bg-card/50">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">
              <span className="font-semibold text-primary">+23</span> new jobs today
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">
              <span className="font-semibold text-primary">94%</span> success rate
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Urgent Jobs Section */}
        {urgentJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="destructive" className="pulse-golden">
                Urgent
              </Badge>
              <h2 className="text-lg font-semibold text-foreground">
                Apply Soon - Limited Time
              </h2>
            </div>
            <div className="space-y-4">
              {urgentJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <JobCard
                    onApply={handleApply}
                    key={job.id}
                    job={job}
                    isSaved={savedJobs.has(job.id)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Jobs Section */}
        {regularJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: urgentJobs.length * 0.1 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Recommended for You
            </h2>
            <div className="space-y-4">
              {regularJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: (urgentJobs.length + index) * 0.1 }}
                >
                  <JobCard
                    onApply={handleApply}
                    key={job.id}
                    job={job}
                    isSaved={savedJobs.has(job.id)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No jobs found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={handleClearFilters} variant="outline">
              Clear all filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomeFeed;