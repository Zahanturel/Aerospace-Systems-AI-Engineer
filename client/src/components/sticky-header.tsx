import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "./theme-toggle";

interface StickyHeaderProps {
  progress: number;
  onEnroll: () => void;
}

export function StickyHeader({ progress, onEnroll }: StickyHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Roadmap", href: "#roadmap" },
    { label: "Free Trial", href: "#free-trial" },
    { label: "Day in Life", href: "#day-in-life" },
    { label: "AI Impact", href: "#ai-impact" },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-background/95 backdrop-blur-md border-b shadow-sm" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className={`font-display font-bold text-lg ${
                isScrolled ? "text-foreground" : "text-white"
              }`}>
                memebu
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${
                    isScrolled 
                      ? "text-muted-foreground hover:text-foreground" 
                      : "text-white/80 hover:text-white"
                  }`}
                  data-testid={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              
              <Button
                onClick={onEnroll}
                size="sm"
                className={isScrolled ? "" : "bg-white text-primary"}
                data-testid="button-enroll-header"
              >
                Enroll <ChevronRight className="w-4 h-4 ml-1" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden ${isScrolled ? "" : "text-white"}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {progress > 0 && (
          <div className="h-1 bg-muted">
            <Progress value={progress} className="h-1 rounded-none" />
          </div>
        )}
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-40 bg-background border-b shadow-lg md:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-foreground rounded-lg hover-elevate"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
