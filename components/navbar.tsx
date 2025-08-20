"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleFeaturesClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const featuresSection = document.getElementById("features")
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={handleFeaturesClick}
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Features
            </button>
            <Link href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
              How It Works
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/auth" className="text-foreground hover:text-primary transition-colors">
              Login
            </Link>
            <Button asChild>
              <Link href="/auth">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
