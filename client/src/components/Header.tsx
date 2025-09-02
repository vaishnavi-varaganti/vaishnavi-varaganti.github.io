import { useState, useEffect } from "react";
import { Link } from "wouter";
import { X, Menu } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 px-5 py-3 flex justify-between items-center transition-all duration-300 ${
      scrolled ? "bg-background/80 backdrop-blur-lg shadow-md" : "bg-transparent"
    }`}>
      
      {/* Logo/Brand - we're using LinkedIn icon on mobile and desktop */}
      <div className="flex-1 flex justify-start">
        <a 
          href="https://www.linkedin.com/in/vaishnavivaraganti/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover-target p-1 rounded-full transition-all duration-300 hover:shadow-[0_0_10px_rgba(10,102,194,0.5)] transform hover:-translate-y-1"
          aria-label="LinkedIn Profile"
        >
          <FaLinkedin className="w-6 h-6 text-[#0A66C2]" />
        </a>
      </div>

      {/* Desktop Navigation - hidden on mobile */}
      <nav className="hidden md:flex items-center justify-end flex-1 gap-6">
        <a href="#home" className="nav-link font-medium hover-target relative group">
          <span className="inline-block">Home</span>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </a>
        <a href="#about" className="nav-link font-medium hover-target relative group">
          <span className="inline-block">About</span>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </a>
        <a href="#projects" className="nav-link font-medium hover-target relative group">
          <span className="inline-block">Projects</span>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </a>
        <a href="#skills" className="nav-link font-medium hover-target relative group">
          <span className="inline-block">Skills</span>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </a>
        <a href="#contact" className="nav-link font-medium hover-target relative group">
          <span className="inline-block">Contact</span>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </a>
      </nav>
      
      {/* Mobile menu button - properly positioned on the right */}
      <div className="flex-1 flex justify-end md:hidden">
        <button 
          className="p-1 hover-target" 
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      {/* Mobile menu panel */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-muted/90 backdrop-blur-md p-8 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex justify-end mb-8">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="hover-target"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <a 
            href="#home" 
            className="text-lg hover-target"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
          <a 
            href="#about" 
            className="text-lg hover-target"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <a 
            href="#projects" 
            className="text-lg hover-target"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </a>
          <a 
            href="#skills" 
            className="text-lg hover-target"
            onClick={() => setIsMenuOpen(false)}
          >
            Skills
          </a>
          <a 
            href="#contact" 
            className="text-lg hover-target"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
          
          <div className="pt-4 mt-4 border-t border-gray-700">
            <a 
              href="https://www.linkedin.com/in/vaishnavivaraganti/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-lg hover-target"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaLinkedin className="w-5 h-5 text-[#0A66C2]" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
