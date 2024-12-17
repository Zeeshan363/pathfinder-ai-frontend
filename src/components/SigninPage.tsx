// src/components/SigninPage.tsx
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoginFormData } from "../types/user";
import { signinApi } from "../api/auth/signin";
import toast from "react-hot-toast";

const SigninPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const signinMutation = useMutation({
    mutationFn: (body: LoginFormData) => signinApi(formData),
    onSuccess: (data) => {
      toast.success("Log in successful.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const res = signinMutation.mutateAsync(formData);
    if (res) {
      console.log("response...", res);
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
                <label htmlFor="email" className="text-body block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                />
              </div>

              <button type="submit" className="btn-primary w-full py-3">
                Login
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
