import { SiGmail } from "react-icons/si";
import { HiLocationMarker } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "./AnimatedText";
import { fireConfetti } from "@/lib/confetti";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const { toast } = useToast();
  
  const handleEmailClick = () => {
    fireConfetti();
    toast({
      title: "Email client opening!",
      description: "Thanks for reaching out.",
      variant: "default",
    });
  };
  
  return (
    <section id="contact" className="section py-24" data-section="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center heading-glow" data-animate>
          <span className="bg-gradient-to-r from-primary to-[#00d0ff] bg-clip-text text-transparent">Get In Touch</span>
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 text-center" data-animate>
            <div className="min-h-[4rem] mb-8 bg-card/30 rounded-lg p-6 backdrop-blur-sm shadow-md border border-primary/20 mx-auto max-w-3xl">
              <AnimatedText 
                text="I'm currently available for new opportunities. Whether you have a project idea, job opportunity, or just want to connect, feel free to reach out!" 
                className="text-lg text-primary-foreground font-medium"
                speed={40}
                delay={500}
              />
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="flex items-center gap-4 bg-card/30 p-5 rounded-lg backdrop-blur-sm shadow-md border border-primary/20">
                <div className="bg-background p-3 rounded-full">
                  <SiGmail className="w-7 h-7 text-[#EA4335]" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold heading-glow text-lg">Email</h3>
                  <Button 
                    variant="link"
                    className="p-0 h-auto text-primary hover:underline hover-target text-md"
                    onClick={() => {
                      window.open("mailto:vaishnavivaraganti08@gmail.com", "_blank");
                      handleEmailClick();
                    }}
                  >
                    Send Me An Email
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-card/30 p-5 rounded-lg backdrop-blur-sm shadow-md border border-primary/20">
                <div className="bg-background p-3 rounded-full">
                  <HiLocationMarker className="w-7 h-7 text-[#4285F4]" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold heading-glow text-lg">Location</h3>
                  <p className="text-muted-foreground text-md">TX, USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};