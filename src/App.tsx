import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import "./App.css";
import LandingPage from "./components/LandingPage";
import SignupPage from "./components/SignupPage";
import SigninPage from "./components/SigninPage";
import { Toaster } from "react-hot-toast";
import StudentProfile from "./pages/student/profile";

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
              <Route path="/student/profile" element={<StudentProfile />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
