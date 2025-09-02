import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { animateSkillBars } from "@/lib/animations";
import { 
  Check, Code, Database, Cloud, Server, FileCode, GitBranch, Terminal, Laptop, Shield, Lock
} from "lucide-react";
import { 
  FaJsSquare, FaReact, FaHtml5, FaCss3Alt, FaAngular, FaBootstrap, 
  FaJava, FaNodeJs, FaPython, FaDocker, FaGithub, FaGitlab, FaWindows, 
  FaVuejs, FaAws, FaBitbucket
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiKubernetes, SiNginx, SiGradle, SiJenkins, SiTerraform, SiAnsible, SiSwagger, SiSonarqube } from "react-icons/si";

interface Skill {
  name: string;
  icon: React.ReactNode;
}

const frontendSkills: Skill[] = [
  { name: "JavaScript", icon: <FaJsSquare size={24} className="text-yellow-400" /> },
  { name: "TypeScript", icon: <SiTypescript size={24} className="text-blue-500" /> },
  { name: "React.js", icon: <FaReact size={24} className="text-cyan-400" /> },
  { name: "Vue.js", icon: <FaVuejs size={24} className="text-green-400" /> },
  { name: "AngularJS", icon: <FaAngular size={24} className="text-red-500" /> },
  { name: "Redux", icon: <Code size={24} className="text-purple-400" /> },
  { name: "Next.js", icon: <SiNextdotjs size={24} className="text-gray-400" /> },
  { name: "jQuery", icon: <Code size={24} className="text-blue-400" /> },
  { name: "Bootstrap", icon: <FaBootstrap size={24} className="text-purple-500" /> },
  { name: "HTML", icon: <FaHtml5 size={24} className="text-orange-500" /> },
  { name: "CSS", icon: <FaCss3Alt size={24} className="text-blue-400" /> }
];

const backendSkills: Skill[] = [
  { name: "Java (8–17)", icon: <FaJava size={24} className="text-orange-600" /> },
  { name: "Spring Boot", icon: <Server size={24} className="text-green-500" /> },
  { name: "Spring MVC", icon: <Server size={24} className="text-green-400" /> },
  { name: "Spring Security", icon: <Shield size={24} className="text-red-400" /> },
  { name: "Spring Data JPA", icon: <Database size={24} className="text-blue-600" /> },
  { name: "Hibernate / JPA", icon: <Database size={24} className="text-yellow-600" /> },
  { name: "Spring Cloud", icon: <Cloud size={24} className="text-blue-400" /> },
  { name: "Node.js", icon: <FaNodeJs size={24} className="text-green-600" /> },
  { name: "GraphQL", icon: <Code size={24} className="text-pink-400" /> },
  { name: "gRPC", icon: <Code size={24} className="text-gray-400" /> },
  { name: "Microservices", icon: <Server size={24} className="text-blue-300" /> },
  { name: "REST APIs", icon: <Code size={24} className="text-gray-400" /> },
];

const databaseSkills: Skill[] = [
  { name: "MySQL", icon: <Database size={24} className="text-blue-600" /> },
  { name: "PostgreSQL", icon: <Database size={24} className="text-blue-400" /> },
  { name: "MongoDB", icon: <Database size={24} className="text-green-500" /> },
  { name: "Oracle", icon: <Database size={24} className="text-red-600" /> },
  { name: "SQL Server", icon: <Database size={24} className="text-blue-700" /> }
];

const cloudSkills: Skill[] = [
  { name: "AWS", icon: <FaAws size={24} className="text-yellow-500" /> },
  { name: "Azure", icon: <FaWindows size={24} className="text-blue-500" /> },
  { name: "Kubernetes", icon: <SiKubernetes size={24} className="text-blue-400" /> },
  { name: "Nginx", icon: <SiNginx size={24} className="text-green-500" /> },
  { name: "Docker", icon: <FaDocker size={24} className="text-blue-500" /> }
];

const securitySkills: Skill[] = [
  { name: "Spring Security", icon: <Shield size={24} className="text-red-400" /> },
  { name: "JWT", icon: <Lock size={24} className="text-yellow-600" /> },
  { name: "OAuth2", icon: <Lock size={24} className="text-blue-500" /> },
  { name: "RBAC", icon: <Check size={24} className="text-green-400" /> },
  { name: "AES Encryption", icon: <Lock size={24} className="text-gray-500" /> }
];

const testingSkills: Skill[] = [
  { name: "JUnit", icon: <FileCode size={24} className="text-red-500" /> },
  { name: "Mockito", icon: <FileCode size={24} className="text-red-600" /> },
  { name: "Selenium", icon: <FileCode size={24} className="text-green-500" /> },
  { name: "Jest", icon: <FileCode size={24} className="text-yellow-400" /> },
  { name: "EasyMock", icon: <FileCode size={24} className="text-blue-500" /> },
  { name: "Test Containers", icon: <FileCode size={24} className="text-purple-500" /> },
  { name: "SonarQube", icon: <SiSonarqube size={24} className="text-blue-400" /> },
  { name: "TDD", icon: <Check size={24} className="text-green-400" /> }
];

const tools: Skill[] = [
  { name: "VS Code", icon: <Laptop size={24} className="text-blue-500" /> },
  { name: "Eclipse", icon: <Terminal size={24} className="text-purple-500" /> },
  { name: "Git", icon: <GitBranch size={24} className="text-orange-600" /> },
  { name: "GitHub", icon: <FaGithub size={24} className="text-white" /> },
  { name: "GitLab", icon: <FaGitlab size={24} className="text-orange-500" /> },
  { name: "Bitbucket", icon: <FaBitbucket size={24} className="text-blue-500" /> },
  { name: "Maven", icon: <Code size={24} className="text-red-400" /> },
  { name: "Gradle", icon: <SiGradle size={24} className="text-green-500" /> },
  { name: "Jenkins", icon: <SiJenkins size={24} className="text-red-500" /> },
  { name: "Terraform", icon: <SiTerraform size={24} className="text-purple-400" /> },
  { name: "Ansible", icon: <SiAnsible size={24} className="text-yellow-500" /> },
  { name: "Postman", icon: <Code size={24} className="text-orange-400" /> },
  { name: "Swagger", icon: <SiSwagger size={24} className="text-green-400" /> }
];

export const SkillsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      animateSkillBars();
    }
  }, [inView]);

  const renderSkills = (title: string, skills: Skill[]) => (
    <div className="space-y-6" data-animate>
      <h3 className="text-xl font-display font-semibold relative heading-glow">
        <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">{title}</span>
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg hover:bg-card/80 transition-all duration-300 hover-target border border-border/30">
            <div className="w-10 h-10 flex items-center justify-center bg-background/80 rounded-lg border border-border/30 p-1.5">
              {skill.icon}
            </div>
            <span className="font-medium text-sm">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" ref={ref} className="section bg-muted/30 py-24" data-section="skills">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center heading-glow" data-animate>
          <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">Skills & Expertise</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {renderSkills("Frontend Development", frontendSkills)}
          {renderSkills("Backend Development", backendSkills)}
          {renderSkills("Databases", databaseSkills)}
          {renderSkills("Cloud Technologies", cloudSkills)}
          {renderSkills("Security", securitySkills)}
          {renderSkills("Testing & Quality", testingSkills)}
          {renderSkills("Tools & Utilities", tools)}
        </div>
      </div>
    </section>
  );
};