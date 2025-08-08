import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import JobCard from "@/components/JobCard";
import SearchFilters, { SearchFiltersRef } from "@/components/SearchFilters";
import { mockJobs, getFilteredJobs, type Job } from "@/data/mockJobs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, TrendingUp, Star, Search, Home, AlertTriangle, Bookmark, Briefcase } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');
  const { toast } = useToast();
  const searchFiltersRef = useRef<SearchFiltersRef>(null);
  const navigate = useNavigate();

  // Filter jobs based on search and filters
  const filteredJobs = getFilteredJobs(jobs, searchQuery, filters);
  
  // Filter for saved jobs
  const savedJobsList = filteredJobs.filter(job => savedJobs.has(job.id));
  
  // Determine which jobs to show based on active tab
  const showSavedJobs = activeTab === 'saved';
  const displayJobs = showSavedJobs ? savedJobsList : filteredJobs;
  
  // Separate into urgent and regular jobs from the display jobs
  const urgentJobs = displayJobs.filter(job => job.urgent);
  const regularJobs = displayJobs.filter(job => !job.urgent);

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

  return (
    <div className="min-h-screen bg-gradient-subtle pb-24 sm:pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-1 sm:gap-2 overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground h-9 w-9"
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <h1 
                className="text-xl sm:text-2xl font-bold text-foreground cursor-pointer hover:text-primary transition-colors whitespace-nowrap"
                onClick={() => navigate('/')}
              >
                JobsHub
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm whitespace-nowrap ml-1 sm:ml-2">
                {filteredJobs.length} {window.innerWidth < 640 ? '' : 'opportunities found'}
              </p>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => searchFiltersRef.current?.focusSearch()}
                className="text-muted-foreground hover:text-foreground h-9 w-9"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="h-9 px-2 sm:px-3 gap-1 sm:gap-2 text-xs sm:text-sm"
              >
                <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
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
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'all' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            All Jobs
            <Badge variant="secondary" className="ml-1">
              {filteredJobs.length}
            </Badge>
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'saved'
                ? 'text-primary border-b-2 border-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            Saved Jobs
            <Badge variant="secondary" className="ml-1">
              {savedJobsList.length}
            </Badge>
          </button>
        </div>

        {/* No Saved Jobs Message */}
        {activeTab === 'saved' && savedJobsList.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
              <Bookmark className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No saved jobs yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Save jobs you're interested in to find them here later
            </p>
            <Button onClick={() => setActiveTab('all')} variant="outline">
              Browse all jobs
            </Button>
          </motion.div>
        )}

        {/* Urgent Jobs Section */}
        {urgentJobs.length > 0 && (
          <section className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="p-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h2 className="font-semibold text-base sm:text-lg">Urgent Hiring</h2>
              <Badge variant="outline" className="ml-1 sm:ml-2 text-xs sm:text-sm">{urgentJobs.length} positions</Badge>
            </div>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {urgentJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <JobCard
                    onApply={handleApply}
                    job={job}
                    isSaved={savedJobs.has(job.id)}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Regular Jobs Section */}
        {regularJobs.length > 0 && (
          <section className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: urgentJobs.length * 0.1 }}
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Recommended for You
              </h2>
              <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {regularJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: (urgentJobs.length + index) * 0.1 }}
                  >
                    <JobCard
                      onApply={handleApply}
                      job={job}
                      isSaved={savedJobs.has(job.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
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
      </main>
    </div>
  );
};

export default HomeFeed;