import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { animateProjectCard } from "@/lib/animations";
import { ArrowRight } from "lucide-react";
import { ProjectModal } from "./ProjectModal";
import acidBaseImg from "@/assets/acidbase.jpg";
import adjunctFacultyImg from "@/assets/adfm.jpg";
import attendanceImg from "@/assets/ats.png";
import fallDetectionImg from "@/assets/falldetectionsystem.png";
import innoversityImg from "@/assets/innoversity.png";
import timeClockImg from "@/assets/timeclock.png";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github?: string;
  demo?: string;
  features: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Acid Base Game",
    description: "An interactive 2D chemistry game built in Godot Engine to help high school students understand acid-base reactions.",
    image: acidBaseImg,
    tech: ["Godot Engine", "Game Development", "Education Technology", "UI Design"],
    features: [
      "Developed a 2D game with levels that increase in complexity to test reaction prediction skills",
      "Integrated multiple-choice mechanics to enhance learning",
      "Achieved an 85% user engagement score and 30% improvement in comprehension"
    ]
  },
  {
    id: 2,
    title: "Adjunct Faculty Management System",
    description: "A web platform to manage adjunct faculty data, evaluations, and role-based access during online course surges.",
    image: adjunctFacultyImg,
    tech: ["Python FastAPI", "Vue.js", "MySQL", "JWT", "Canvas LMS Integration"],
    features: [
      "Integrated Canvas LMS and Evaluation Kit for centralized evaluations",
      "Implemented JWT-based authentication with multi-role login",
      "Improved evaluation processing speed by 40% and administrative efficiency"
    ]
  },
  {
    id: 3,
    title: "Attendance Tracking System",
    description: "Secure attendance management system using Vue.js frontend and Node.js backend for real-time institutional tracking.",
    image: attendanceImg,
    tech: ["Vue.js", "Node.js", "MySQL", "JWT", "Raspberry Pi"],
    features: [
      "Built scalable RESTful APIs with JWT-based login",
      "Captured real-time attendance data on Raspberry Pi devices",
      "Reduced manual attendance workload by 70% with improved accuracy"
    ]
  },
  {
    id: 4,
    title: "Fall Detection System",
    description: "An IoT and Android-based solution to detect falls for senior safety monitoring with emergency alert capabilities.",
    image: fallDetectionImg,
    tech: ["IoT", "Android", "Raspberry Pi", "Firebase", "Accelerometer Sensors"],
    features: [
      "Designed a wearable device for fall detection with accelerometer sensors",
      "Integrated alerts via Firebase and Android notifications",
      "Achieved 90% detection accuracy with emergency alerts under 15 seconds"
    ]
  },
  {
    id: 5,
    title: "Innoversity",
    description: "A crowdsourcing platform for ideas and competitions, enabling secure submissions and community-driven problem solving.",
    image: innoversityImg,
    tech: ["React.js", "Spring Boot", "MongoDB", "JWT"],
    features: [
      "Built secure user roles with JWT-based authentication",
      "Enabled challenge submissions, voting, and rewards",
      "Onboarded 150+ users and facilitated 30+ solved challenges"
    ]
  },
  {
    id: 6,
    title: "Time Clock",
    description: "A full-stack employee time tracking solution with punch in/out, time logs, and automated reporting for HR.",
    image: timeClockImg,
    tech: ["React", "Spring Boot", "MySQL", "Apache Kafka", "REST APIs"],
    features: [
      "Implemented work-hour tracking with automated reporting",
      "Integrated Kafka for reliable event-driven logs",
      "Improved administrative efficiency by 35% and reduced attendance errors by 70%"
    ]
  }
];

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    if (inView) {
      projectRefs.current.forEach(card => {
        if (card) animateProjectCard(card);
      });
    }
  }, [inView]);
  
  return (
    <section id="projects" ref={ref} className="section py-24" data-section="projects">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center heading-glow" data-animate>
          <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">Featured Projects</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              ref={el => projectRefs.current[index] = el}
              className="project-card bg-card rounded-lg overflow-hidden shadow-xl"
              data-animate
            >
              <div className="overflow-hidden h-64">
                <div 
                  className="w-full h-full bg-cover bg-center project-image"
                  style={{ backgroundImage: `url(${project.image})` }}
                ></div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display font-semibold text-xl heading-glow">{project.title}</h3>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-badge">{tech}</span>
                  ))}
                </div>
                
                <div className="flex items-center justify-end mt-4">                  
                  <button 
                    className="view-project text-primary text-sm font-medium flex items-center gap-1 transition-all hover:gap-2 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};