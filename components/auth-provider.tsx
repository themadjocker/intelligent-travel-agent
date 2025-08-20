"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      // Simple auth check - in a real app, this would validate a token
      const userName = localStorage.getItem("user_name")
      const isLoggedIn = !!userName
      setIsAuthenticated(isLoggedIn)
      setIsLoading(false)

      // Protected routes that require authentication
      const protectedRoutes = ["/dashboard", "/planner"]
      const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

      if (isProtectedRoute && !isLoggedIn) {
        // Store the intended destination for redirect after login
        localStorage.setItem("redirect_after_login", pathname)
        router.push("/auth")
      }
    }

    checkAuth()
  }, [pathname, router])

  const login = () => {
    setIsAuthenticated(true)
    // Check if there's a redirect URL stored
    const redirectUrl = localStorage.getItem("redirect_after_login")
    if (redirectUrl) {
      localStorage.removeItem("redirect_after_login")
      router.push(redirectUrl)
    } else {
      router.push("/dashboard")
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("user_name")
    localStorage.removeItem("redirect_after_login")
    router.push("/")
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}
