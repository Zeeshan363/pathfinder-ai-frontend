import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Navigate
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import "./App.css";
import LandingPage from "./components/LandingPage";
import SignupPage from "./components/SignupPage";
import SigninPage from "./components/SigninPage";
import { Toaster } from "react-hot-toast";
import StudentProfile from "./pages/student/profile";
import DashboardPage from "./pages/DashboardPage";
import {CreateProfilePage} from "./pages/CreateProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ChatBot from "./components/ChatBot";
import CareerAIPage from "./pages/CareerAIPage";
import AdminDashboard from "./pages/AdminDashboard";

// Protected route component
const ProtectedRoute = ({ children }: any) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Toaster
            toastOptions={{ duration: 4000, style: { zIndex: 999999 } }}
          />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signin" element={<SigninPage />} />
              
              {/* Protected routes */}
              <Route path="/student/profile" element={
                <ProtectedRoute>
                  <StudentProfile />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/profile/create" element={
                <ProtectedRoute>
                  <CreateProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/profile/edit" element={
                <ProtectedRoute>
                  <EditProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/career-ai" element={
                <ProtectedRoute>
                  <CareerAIPage />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          
          {/* ChatBot component will be visible on all pages */}
          <ChatBot />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;