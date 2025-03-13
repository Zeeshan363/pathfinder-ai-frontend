import React, { useState } from "react";
import { SignupFormData, UserRole } from "../types/user";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signupApi } from "../api/auth/signup";
import toast from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: UserRole.STUDENT,
  });

  const signUpMutation = useMutation({
    mutationFn: (body: SignupFormData) => signupApi({username: formData?.name, ...formData}),
    onSuccess: (data) => {
      toast.success("Registration successful.");
      navigate('/signin')
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const res = signUpMutation.mutateAsync(formData);
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
              <h1 className="heading-2 heading-primary mb-2">Create Account</h1>
              <p className="text-body">
                Start your journey with Pathfinder today
              </p>
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

              <div>
                <label htmlFor="name" className="text-body block mb-2">
                  Name (Optional)
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label htmlFor="role" className="text-body block mb-2">
                  I am a
                </label>
                <select
                  id="role"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value as UserRole,
                    })
                  }
                >
                  <option value={UserRole.STUDENT}>Student</option>
                  <option value={UserRole.PROFESSIONAL}>Professional</option>
                  <option value={UserRole.COUNSELOR}>Counselor</option>
                </select>
              </div>

              <button type="submit" className="btn-primary w-full py-3">
                Sign Up
              </button>

              <p className="text-center text-body mt-4">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
