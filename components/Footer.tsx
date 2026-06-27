import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* 1. Brand Section - Navbar से मैच करता हुआ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-600 tracking-tight">
            DevMatch
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            A professional platform for developers to connect, collaborate, and build projects based on their skills and goals.
          </p>
        </div>

        {/* 2. Platform Section - सिर्फ वही जो आपके पास है */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Platform</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition flex items-center gap-2">
                <span className="h-1 w-1 bg-gray-400 rounded-full"></span> Developers Feed
              </Link>
            </li>
            {/* भविष्य के लिए अगर आप Chat Page बनाना चाहें तो इसे रहने दे सकते हैं */}
            <li>
              <Link href="/Chat.Routing" className="hover:text-blue-600 transition flex items-center gap-2">
                <span className="h-1 w-1 bg-gray-400 rounded-full"></span> My Conversations
              </Link>
            </li>
          </ul>
        </div>

        {/* 3. Support Section - ज़रूरी लिंक्स */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Support</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <a href="mailto:ankit@devmatch.com" className="hover:text-blue-600 transition flex items-center gap-2">
                📧 Contact Support
              </a>
            </li>
            <li>
              <Link href="/Condision.Routing" className="hover:text-blue-600 transition flex items-center gap-2">
                📜 Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 border-t border-gray-100 pt-6 text-center">
        <p className="text-gray-400 text-xs">
          © {currentYear} <span className="font-semibold text-gray-600">DevMatch</span>. All rights reserved. 
          <span className="block md:inline mt-2 md:mt-0"> | Built with ❤️ by Ankit Raniwal</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;