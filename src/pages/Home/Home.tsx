import Navbar from '../../components/Navbar/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex flex-1 flex-col items-center justify-center text-center px-6 py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-900 mb-6">
          TaskFlow
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed">
          Streamline your team’s workflow with TaskFlow — a simple and efficient
          project management dashboard where you can create projects, assign
          tasks, and track progress all in one place.
        </p>

        <button
          className="mt-8 bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition font-medium"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Get Started
        </button>
      </main>

      <footer className="text-center py-4 text-gray-600 text-sm border-t border-gray-200">
        © 2025 TaskFlow. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
