"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Bio = () => {

  const router = useRouter();

  const [formData, setFormData] = useState({
    bio: "",
    skills: "",
    learning: "",
    portfolio: "",
    github: "",
    linkedin: "",
  });


  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Dynamic key mapping
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log("Saving Data:", formData);
    try {
      const response = await fetch("https://devmatch-backend-72iu.onrender.com/api/bio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", //  cookie se tooken bhejne ke liye
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {

        alert("Bio saved successfully!");
      } else {
        console.error("Server responded with an error:", data);
        alert("Error saving bio: " + (data.message || "Unknown error"));
      }
    } catch (error:any) {
      console.error("Network Error (Backend off?):", error);
      alert("Network error: " + error.message);

    }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">

      <button
        onClick={() => router.back()}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-all text-gray-600 z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Setup Your Bio</h2>

        <div className="space-y-4">
          {/* हर इनपुट में 'name' एट्रिब्यूट होना ज़रूरी है */}
          <input
            name="bio" // यही 'name' handleChange में यूज़ होगा
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Headline (e.g. MERN Developer)"
          />

          <input
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Skills (React, Node, etc.)"
          />

          <input
            name="learning"
            value={formData.learning}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Want to Learn (Docker, AWS, etc.)"
          />

          <div className="flex gap-4">
            <input
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-1/2 p-4 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="GitHub User"
            />
            <input
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="w-1/2 p-4 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="portfolio User"
            />
            <input
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-1/2 p-4 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="LinkedIn User"
            />
          </div>
        </div>

        <button type="submit" className="w-full mt-10 bg-blue-600 text-white font-bold py-4 rounded-2xl">
          Save Bio
        </button>
      </form>
    </div>
  );
};

export default Bio;