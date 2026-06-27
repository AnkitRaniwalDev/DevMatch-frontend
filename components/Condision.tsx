"use client";
import React from "react";
import { useRouter } from "next/navigation";

const TermsPage = () => {
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

      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 font-sans tracking-tight border-b pb-4 text-center">
          Terms of Service
        </h1>
        
        <div className="space-y-12 text-gray-600 leading-relaxed">
          <section className="bg-gray-50 p-6 rounded-2xl border-l-4 border-blue-500">
            <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide">1. Acceptance</h2>
            <p>By joining DevMatch, you agree to treat every developer with respect and collaborate professionally.</p>
          </section>

          <section className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide">2. Privacy</h2>
            <p>We value your privacy. Your data and chat history are secure and never shared with third parties.</p>
          </section>

          <section className="bg-gray-50 p-6 rounded-2xl border-l-4 border-blue-500">
            <h2 className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide">3. Rules</h2>
            <p>Spamming or inappropriate behavior will lead to an immediate ban from the platform.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;