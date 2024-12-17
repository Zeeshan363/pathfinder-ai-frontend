import React, { useEffect } from "react";
import {
  ArrowRight,
  Brain,
  Users,
  Award,
  ChevronRight,
  Sparkles,
  Star,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const LandingPage = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 100) {
          element.classList.add("animate-fade-in");
        }
      });
    };

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();
    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);

  const features = [
    {
      title: "AI-Powered Insights",
      description:
        "Get personalized career recommendations using advanced AI algorithms",
      icon: (
        <Brain className="w-8 h-8 text-primary-500 dark:text-primary-400" />
      ),
    },
    {
      title: "Expert Guidance",
      description:
        "Connect with professional career counselors for personalized advice",
      icon: (
        <Users className="w-8 h-8 text-primary-500 dark:text-primary-400" />
      ),
    },
    {
      title: "Career Growth",
      description:
        "Track your progress and get recommendations for skill development",
      icon: (
        <Award className="w-8 h-8 text-primary-500 dark:text-primary-400" />
      ),
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Career Paths" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "AI Support" },
  ];

  return (
    <div className="min-h-screen section-light overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <div className="relative gradient-primary text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute animate-float-slow transform -rotate-12 -top-40 -left-40 w-96 h-96 bg-primary-500 dark:bg-primary-400 rounded-full opacity-10"></div>
          <div className="absolute animate-float transform rotate-12 top-20 right-20 w-64 h-64 bg-primary-400 dark:bg-primary-300 rounded-full opacity-10"></div>
        </div>
        <div className="container-padding py-32 relative">
          <div className="text-center animate-on-scroll">
            <h1 className="heading-1 mb-6">
              <span className="inline-block animate-slide-up">Path</span>
              <span className="inline-block animate-slide-up delay-200 text-primary-300">
                finder
              </span>
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-10 animate-fade-in delay-500">
              Discover your ideal career path with AI-powered guidance and
              expert counselors. Your journey to success starts here.
            </p>
            <Link
              to="/signin"
              className="animate-bounce-soft bg-white text-purple-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-100 transition-colors flex items-center gap-2 mx-auto dark:bg-gray-900 dark:text-white w-fit"
            >
              Start Your Journey <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 w-full">
          <svg
            className="fill-current dark:text-gray-900 text-white"
            viewBox="0 0 1440 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0,0 C240,95 480,95 720,95 C960,95 1200,95 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="section-light py-20">
        <div className="container-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="animate-on-scroll">
                <div className="heading-2 heading-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-body">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="section-accent py-24">
        <div className="container-padding">
          <h2 className="heading-2 text-center heading-primary mb-16 animate-on-scroll">
            Why Choose Pathfinder?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="heading-3 heading-primary mb-4">
                  {feature.title}
                </h3>
                <p className="text-body">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Types */}
      <div className="section-light py-24">
        <div className="container-padding">
          <h2 className="heading-2 text-center heading-primary mb-16 animate-on-scroll">
            Who We Serve
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors animate-on-scroll">
              <GraduationCap className="w-12 h-12 text-primary-500 dark:text-primary-400 mb-4" />
              <h3 className="heading-3 mb-4 dark:text-text-dark">Students</h3>
              <p className="text-body mb-4">
                Start your career journey with confidence. Get AI-powered
                guidance for your educational and career decisions.
              </p>
            </div>
            <div className="p-6 rounded-xl hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors animate-on-scroll">
              <Briefcase className="w-12 h-12 text-primary-500 dark:text-primary-400 mb-4" />
              <h3 className="heading-3 mb-4 dark:text-text-dark">
                Professionals
              </h3>
              <p className="text-body mb-4">
                Take your career to the next level with data-driven insights and
                expert advice.
              </p>
            </div>
            <div className="p-6 rounded-xl hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors animate-on-scroll">
              <Star className="w-12 h-12 text-primary-500 dark:text-primary-400 mb-4" />
              <h3 className="heading-3 mb-4 dark:text-text-dark">Counselors</h3>
              <p className="text-body mb-4">
                Empower your guidance with AI insights. Connect with students
                and professionals who need your expertise.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="gradient-primary text-white py-24">
        <div className="container-padding text-center">
          <h2 className="heading-2 mb-6 animate-on-scroll">
            Ready to Find Your Path?
          </h2>
          <p className="text-primary-100 mb-10 max-w-2xl mx-auto animate-on-scroll">
            Join thousands of others who have discovered their ideal career path
            with Pathfinder's AI-powered guidance.
          </p>
          <div className="flex gap-4 justify-center animate-on-scroll">
            <button className="bg-white dark:bg-gray-900 text-primary-900 dark:text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors">
              Get Started
            </button>
            <button className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-primary-800 dark:hover:bg-primary-900 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
