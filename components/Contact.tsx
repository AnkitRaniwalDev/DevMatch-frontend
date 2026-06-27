"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ContactPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white py-16 px-6 relative">
      {/* --- Close Button --- */}
      <button 
        onClick={() => router.back()} 
        className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 transition-all text-gray-500 hover:text-gray-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="max-w-3xl mx-auto border border-gray-100 p-10 rounded-2xl shadow-sm mt-10">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 font-sans">Contact Support</h1>
        <p className="text-gray-500 mb-8">
          Any issues? Send us a message and we'll get back to you soon.
        </p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Enter your name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="example@gmail.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">How can we help?</label>
            <textarea rows={4} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Describe your issue..."></textarea>
          </div>
          <button type="button" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;