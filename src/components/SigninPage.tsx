// src/components/SigninPage.tsx
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginFormData } from "../types/user";
import { signinApi } from "../api/auth/signin";
import toast from "react-hot-toast";

const SigninPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const signinMutation = useMutation({
    mutationFn: (body: LoginFormData) => signinApi(formData),
    onSuccess: (data: any) => {
      console.log("data to be here", data)
      if(data?.data?.access_token){
        localStorage.setItem("token", data?.data.access_token);
        toast.success("Log in successful.");
        
        if (data?.data.user && data?.data.user.isProfileComplete) {
          navigate("/dashboard");
        } else {
          navigate("/profile/create");
        }
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signinMutation.mutateAsync(formData);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="section-light min-h-screen">
      <div className="container-padding py-16 flex justify-center items-center">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="heading-2 heading-primary mb-2">Login</h1>
              <p className="text-body">Explore with pathfinder</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="text-body block mb-2">
                  Username
                </label>
                <input
                  type="username"
                  id="username"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="text-body block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  disabled={isLoading}
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary w-full py-3"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-body mt-4">
                Create an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;