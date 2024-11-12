"use client"
import { useRouter } from "next/navigation"; 
export default function Home() {
    const router = useRouter();
    return (
      <>
        <head>
          <title>Task Management</title>
          <meta name="description" content="Effortlessly manage tasks and track team progress." />
        </head>
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Stay on Track, Stay in Control</h1>
            <p className="text-lg mb-8">Effortlessly manage tasks, track progress, and collaborate with your team.</p>
            <div className="flex justify-center gap-4">
              <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow-lg" onClick={() => {
                router.push("/Routes/login");
              }}>
                Get Started Free
              </button>
              <button className="bg-transparent border border-white text-white font-semibold py-2 px-4 rounded-lg">
                See How It Works
              </button>
            </div>
          </div>
        </section>
  
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Stay Organized</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="font-bold text-xl mb-2">Customizable Workflows</h3>
                <p>Tailor workflows to match how your team works.</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Real-Time Collaboration</h3>
                <p>Assign tasks, add comments, and stay connected with real-time updates.</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Detailed Issue Tracking</h3>
                <p>Easily track and manage issues with priority levels, due dates, and tags.</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Insights and Analytics</h3>
                <p>Gain valuable insights into team progress and productivity with in-depth reports.</p>
              </div>
            </div>
          </div>
        </section>
  
        {/* How It Works Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="font-bold text-xl mb-2">1. Create Projects</h3>
                <p>Add a project, set goals, and invite your team.</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">2. Customize Workflows</h3>
                <p>Adapt workflows to your unique processes.</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">3. Manage Tasks</h3>
                <p>Add tasks, set priorities, and assign team members.</p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">4. Track Progress</h3>
                <p>Use real-time updates and reporting to stay on track.</p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <blockquote className="bg-gray-100 p-6 rounded-lg">
                <p className="italic">"This platform transformed the way our team collaborates and tracks progress!"</p>
                <cite className="block mt-4 font-semibold">- User A</cite>
              </blockquote>
              <blockquote className="bg-gray-100 p-6 rounded-lg">
                <p className="italic">"An intuitive tool that saves us time and keeps our tasks organized."</p>
                <cite className="block mt-4 font-semibold">- User B</cite>
              </blockquote>
            </div>
          </div>
        </section>
  
        {/* Pricing Section */}
        <section className="bg-indigo-600 text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">Flexible Plans for Every Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white text-indigo-600 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Free</h3>
                <p>Basic features for small teams.</p>
              </div>
              <div className="bg-white text-indigo-600 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Pro</h3>
                <p>Advanced features for growing teams.</p>
              </div>
              <div className="bg-white text-indigo-600 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                <p>Custom solutions for large organizations.</p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Footer */}
        <footer className="bg-gray-800 text-gray-400 py-6 text-center">
          <p>© {new Date().getFullYear()} Task Management. All rights reserved.</p>
        </footer>
      </>
    );
  }
  
