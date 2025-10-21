import Navbar from '../../components/Navbar/Navbar';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex flex-col items-center justify-center flex-1 px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-700 text-lg mb-8 max-w-2xl">
          Have questions, feedback, or collaboration ideas? We’d love to hear from you.
          Fill out the form below or reach out directly.
        </p>

        <form className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
          <div className="mb-4">
            <label className="block text-gray-700 text-left mb-2 font-semibold">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-left mb-2 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-left mb-2 font-semibold">Message</label>
            <textarea
              placeholder="Write your message..."
              className="w-full px-4 py-2 border rounded-lg h-28 resize-none focus:ring-2 focus:ring-blue-900 outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition-all"
          >
            Send Message
          </button>
        </form>
      </main>

      <footer className="text-center py-4 text-gray-600 text-sm border-t border-gray-200">
        © 2025 TaskFlow. We’re here to help you get things done.
      </footer>
    </div>
  );
};

export default Contact;
