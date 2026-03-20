"use client";

import { createContext, useEffect, useState } from "react";
import api from "@/lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        if (mounted) setUser(res.data.user);
      } catch (error) {
        if (mounted) {
          setUser(null);
          if (typeof window !== "undefined") {
            localStorage.removeItem("accessToken");
          }
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    checkAuth();
    return () => { mounted = false; };
  }, []);

  const register = async (name, email, password, role) => {
    const res = await api.post("/auth/register", {
      name,
      email,
      password,
      role,
    });
    if (res.data.accessToken) {
      localStorage.setItem("accessToken", res.data.accessToken);
    }
    setUser(res.data.user);
    return res.data;
  };

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    if (res.data.accessToken) {
      localStorage.setItem("accessToken", res.data.accessToken);
    }
    setUser(res.data.user);
    return res.data;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
    }
  };

  const updateUser = (updatedUser) => {
    setUser((prev) => ({ ...prev, ...updatedUser }));
  };

  const checkAuth = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch {
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        updateUser,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;