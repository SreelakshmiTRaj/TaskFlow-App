import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex flex-1 flex-col items-center justify-center text-center px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6">
          About TaskFlow
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl leading-relaxed">
          TaskFlow is a modern project management platform designed to help
          teams stay organized, collaborate efficiently, and deliver projects
          on time. Whether you're managing a small team or a large organization,
          TaskFlow gives you the tools to plan, assign, and track every task
          with ease.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-8 max-w-4xl">
          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Easy Collaboration
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Connect your team members, assign roles, and track project
              progress seamlessly.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Smart Insights
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Get real-time analytics and performance insights to make informed
              decisions.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Secure & Reliable
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Built with modern technologies to ensure your data stays private
              and protected.
            </p>
          </div>
        </div>
      </main>

      <footer className="text-center py-4 text-gray-600 text-sm border-t border-gray-200">
        © 2025 TaskFlow. Built for teams that get things done.
      </footer>
    </div>
  );
};

export default About;
