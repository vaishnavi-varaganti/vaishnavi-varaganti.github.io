import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { SimpleGame } from "./SimpleGame";

export const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" ref={ref} className="section bg-muted/30 py-24" data-section="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-7/12" data-animate>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 relative heading-glow">
              <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">About Me</span>
            </h2>
            
            <div className="text-muted-foreground space-y-4 mb-8">
              <p>
                Hi, I'm Vaishnavi. I write code that solves real problems and makes complex systems feel effortless. 
                Whether it’s processing financial transactions in milliseconds, automating workflows in healthcare, 
                or building tools for educators, I enjoy the challenge of taking messy, moving parts and making them work together.
              </p>
              <p>
                Most of my work lives in Java and Spring Boot, where I design microservices that stay fast and reliable even when millions of requests hit them. 
                I also spend time on the frontend with React and Angular, shaping interfaces that make complicated data easy to understand. 
                Recently, I’ve been building AI-driven fraud detection features, helping financial advisors spot issues before they become problems.
              </p>
              <p>
                I like working on systems end to end. From Kafka streams and database tuning to responsive dashboards and cloud deployments on AWS, 
                I take ownership and see things through. For me, the best part of engineering is that moment when a feature goes live and you know it’s making someone’s day easier.
              </p>
            </div>
            
            <div className="timeline-container pt-8">
              <div className="timeline-item" data-animate>
                <h3 className="font-display font-semibold text-lg heading-glow">Full Stack Developer @ Matrix-Financial Services</h3>
                <p className="text-primary text-sm mb-2">01/2025 - Present</p>
                <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                  Building secure, AI-powered financial applications with Java 17, Spring Boot, and Kafka. 
                  Developed fraud detection models with AWS SageMaker, deployed scalable microservices to AWS, 
                  and delivered dashboards in React for real-time risk insights.
                </p>
              </div>
              
              <div className="timeline-item" data-animate>
                <h3 className="font-display font-semibold text-lg heading-glow">Software Developer @ Northwest Missouri State University</h3>
                <p className="text-primary text-sm mb-2">11/2023 - 12/2024 (GPA: 4.0)</p>
                <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                  Designed and built academic platforms that automated reporting and faculty management, 
                  reducing manual work by 80 percent. Developed reusable components in React and Vue, 
                  integrated third-party systems, and deployed services to Azure with CI/CD pipelines.
                </p>
              </div>
              
              <div className="timeline-item" data-animate>
                <h3 className="font-display font-semibold text-lg heading-glow">Java Full Stack Developer @ Zensar Technologies</h3>
                <p className="text-primary text-sm mb-2">07/2022 - 07/2023</p>
                <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                  Developed a vehicle insurance portal with Spring Boot and MongoDB. 
                  Implemented VIN lookups that cut policy submission time by 30 percent 
                  and built responsive UIs in Angular and React. Secured APIs with JWT and deployed services on Azure.
                </p>
              </div>
              
              <div className="timeline-item" data-animate>
                <h3 className="font-display font-semibold text-lg heading-glow">Java Full Stack Developer @ Epam Systems</h3>
                <p className="text-primary text-sm mb-2">02/2022 - 07/2022</p>
                <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                  Created a training platform for QA engineers to test real-world bugs. 
                  Built distributed systems with Kafka and gRPC, introduced concurrency 
                  challenges for training scenarios, and automated deployments with GitLab CI/CD.
                </p>
              </div>

              <div className="timeline-item" data-animate>
                <h3 className="font-display font-semibold text-lg heading-glow">Software Developer @ VAK IT Systems</h3>
                <p className="text-primary text-sm mb-2">01/2020 - 01/2022</p>
                <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                  Helped build a Clinical Decision Support System that provided real-time prescription guidance for doctors. 
                  Developed microservices with Spring Boot, optimized Kafka consumers for patient lookup performance, 
                  and deployed applications to Azure Kubernetes Service with full CI/CD pipelines.
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:w-5/12 mt-10 md:mt-20" data-animate>
            <div className="transform transition-all duration-500 hover:scale-[1.02]">
              <SimpleGame />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};