"use client";


import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";


import { useEffect, useState } from "react";

export default function Navbar() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky nav after scrolling past 80px (navbar height)
      setShowSticky(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="w-full p-4 bg-background/50 backdrop-blur-md border-b border-border flex justify-between items-center">
        <div className="text-lg font-bold">RK</div>
        <div className="flex items-center space-x-4 relative">
          <div className="inline-block">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-4 py-2 flex items-center gap-2 min-w-[120px]"
                  tabIndex={0}
                  aria-label="Navigation menu"
                >
                  Navigation
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[180px]"
                sideOffset={8}
                forceMount
              >
                  <DropdownMenuItem asChild>
                    <Link href="#feature" className="block w-full px-4 py-2 rounded transition-colors duration-200 hover:bg-accent/30 focus:bg-accent/30">Feature</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="#experience" className="block w-full px-4 py-2 rounded transition-colors duration-200 hover:bg-accent/30 focus:bg-accent/30">Experience</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="#contact" className="block w-full px-4 py-2 rounded transition-colors duration-200 hover:bg-accent/30 focus:bg-accent/30">Contact</Link>
                  </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button asChild variant="ghost" className="px-4 py-2 min-w-[120px]">
            <a href="#projects">Projects</a>
          </Button>
        </div>
      </nav>
      <div
        className={`fixed top-4 right-4 z-50 bg-background/90 border border-border shadow-lg rounded-full px-2 py-1 flex items-center gap-2 backdrop-blur-md transition-opacity duration-300 ${showSticky ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ transitionProperty: 'opacity' }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="px-4 py-2 flex items-center gap-2 min-w-[100px]"
              tabIndex={0}
              aria-label="Navigation menu"
            >
              Navigation
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-[160px]"
            sideOffset={8}
            forceMount
          >
              <DropdownMenuItem asChild>
                <Link href="#feature" className="block w-full px-4 py-2 rounded transition-colors duration-200 hover:bg-accent/30 focus:bg-accent/30">Feature</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#experience" className="block w-full px-4 py-2 rounded transition-colors duration-200 hover:bg-accent/30 focus:bg-accent/30">Experience</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#contact" className="block w-full px-4 py-2 rounded transition-colors duration-200 hover:bg-accent/30 focus:bg-accent/30">Contact</Link>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button asChild variant="ghost" className="px-4 py-2 min-w-[100px]">
          <a href="#projects">Projects</a>
        </Button>
      </div>
    </>
  );
}