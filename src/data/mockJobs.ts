export interface Job {
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

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Google",
    location: "Bangalore",
    type: "Full Time",
    salary: "₹25-40 LPA",
    experience: "3-5 years",
    postedTime: "2 hours ago",
    description: "We're looking for a passionate Frontend Developer to join our team and help build the next generation of user interfaces. You'll work with React, TypeScript, and modern web technologies.",
    tags: ["React", "TypeScript", "CSS", "JavaScript", "UI/UX"],
    applicants: 47,
    urgent: true,
  },
  {
    id: "2",
    title: "Product Manager Intern",
    company: "Microsoft",
    location: "Remote",
    type: "Internship",
    salary: "₹50K/month",
    experience: "0-1 years",
    postedTime: "5 hours ago",
    description: "Join our product team as an intern and gain hands-on experience in product strategy, user research, and feature development.",
    tags: ["Product Strategy", "Analytics", "User Research", "Agile"],
    applicants: 134,
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "Amazon",
    location: "Hyderabad",
    type: "Full Time",
    salary: "₹18-30 LPA",
    experience: "2-4 years",
    postedTime: "1 day ago",
    description: "Looking for a Data Scientist to work on machine learning models and data analysis projects that impact millions of customers.",
    tags: ["Python", "Machine Learning", "SQL", "AWS", "Statistics"],
    applicants: 89,
  },
  {
    id: "4",
    title: "Full Stack Developer",
    company: "Flipkart",
    location: "Bangalore",
    type: "Full Time",
    salary: "₹15-25 LPA",
    experience: "1-3 years",
    postedTime: "1 day ago",
    description: "Build and maintain scalable web applications using modern technologies. Work with both frontend and backend systems.",
    tags: ["Node.js", "React", "MongoDB", "JavaScript", "REST APIs"],
    applicants: 67,
  },
  {
    id: "5",
    title: "UI/UX Designer",
    company: "Zomato",
    location: "Delhi NCR",
    type: "Full Time",
    salary: "₹12-20 LPA",
    experience: "2-4 years",
    postedTime: "2 days ago",
    description: "Create intuitive and beautiful user experiences for our mobile and web applications. Collaborate with product and engineering teams.",
    tags: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
    applicants: 52,
  },
  {
    id: "6",
    title: "DevOps Engineer",
    company: "Swiggy",
    location: "Bangalore",
    type: "Full Time",
    salary: "₹20-35 LPA",
    experience: "3-6 years",
    postedTime: "3 days ago",
    description: "Manage and optimize our cloud infrastructure, implement CI/CD pipelines, and ensure high availability of our services.",
    tags: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
    applicants: 38,
    urgent: true,
  },
  {
    id: "7",
    title: "Software Engineer Intern",
    company: "PayTM",
    location: "Noida",
    type: "Internship",
    salary: "₹40K/month",
    experience: "0-1 years",
    postedTime: "4 days ago",
    description: "Work on real-world projects and learn from experienced engineers. Opportunity to contribute to products used by millions.",
    tags: ["Java", "Spring Boot", "MySQL", "Git", "Problem Solving"],
    applicants: 245,
  },
  {
    id: "8",
    title: "Mobile App Developer",
    company: "BYJU'S",
    location: "Bangalore",
    type: "Full Time",
    salary: "₹14-22 LPA",
    experience: "2-5 years",
    postedTime: "5 days ago",
    description: "Develop and maintain mobile applications for iOS and Android platforms. Focus on performance, user experience, and scalability.",
    tags: ["React Native", "Flutter", "iOS", "Android", "Mobile UI"],
    applicants: 73,
  },
  {
    id: "9",
    title: "Business Analyst",
    company: "Accenture",
    location: "Mumbai",
    type: "Full Time",
    salary: "₹8-15 LPA",
    experience: "1-3 years",
    postedTime: "1 week ago",
    description: "Analyze business requirements, create documentation, and work with stakeholders to deliver solutions that drive business value.",
    tags: ["Business Analysis", "SQL", "Excel", "Process Improvement", "Documentation"],
    applicants: 156,
  },
  {
    id: "10",
    title: "Cybersecurity Specialist",
    company: "TCS",
    location: "Pune",
    type: "Full Time",
    salary: "₹12-20 LPA",
    experience: "2-5 years",
    postedTime: "1 week ago",
    description: "Protect our digital infrastructure and ensure security compliance. Work on threat detection, incident response, and security audits.",
    tags: ["Cybersecurity", "SIEM", "Penetration Testing", "Risk Assessment", "Compliance"],
    applicants: 42,
  },
];

export const getFilteredJobs = (
  jobs: Job[],
  searchQuery: string,
  filters: {
    location: string;
    jobType: string;
    experience: string;
    salary: string;
  }
) => {
  return jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLocation = !filters.location || 
      job.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchesJobType = !filters.jobType || 
      job.type.toLowerCase().includes(filters.jobType.toLowerCase());

    const matchesExperience = !filters.experience || 
      job.experience.includes(filters.experience);

    // Simplified salary matching
    const matchesSalary = !filters.salary || true; // For demo purposes

    return matchesSearch && matchesLocation && matchesJobType && 
           matchesExperience && matchesSalary;
  });
};