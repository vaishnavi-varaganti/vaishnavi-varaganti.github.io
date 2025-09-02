import { useEffect } from "react";
import { X } from "lucide-react";

interface ProjectFeature {
  title: string;
  description: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  features: string[];
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.id === "project-modal-overlay") {
        onClose();
      }
    };
    
    if (project) {
      document.addEventListener("keydown", handleEsc);
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [project, onClose]);
  
  if (!project) return null;
  
  return (
    <div 
      id="project-modal-overlay"
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] backdrop-blur-sm"
    >
      <div className="project-modal bg-card rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4 animate-fadeIn">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display font-bold text-2xl heading-glow">{project.title}</h3>
            <button 
              onClick={onClose} 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div
              className="w-full h-64 md:h-80 lg:h-96 bg-cover bg-center rounded-lg transition-all duration-300"
              style={{ backgroundImage: `url(${project.image})` }}
            ></div>
            
            <div className="space-y-4">
              <h4 className="font-display font-semibold text-lg heading-glow">Project Overview</h4>
              <p className="text-muted-foreground">{project.description}</p>
              
              <div>
                <h4 className="font-display font-semibold text-lg mb-2 heading-glow">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-display font-semibold text-lg mb-2 heading-glow">Key Features</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-wrap justify-end gap-4 pt-4">
                <button 
                  onClick={onClose}
                  className="bg-transparent border border-primary hover:bg-primary/20 text-white px-5 py-2 rounded-md font-medium transition-all duration-300 flex items-center gap-2 animate-glow"
                >
                  Close
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
