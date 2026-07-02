"use client";
import DevCard from "@/components/DevCard";
import { Search } from "lucide-react"; // Search icon ke liye lucide-react se import kiya, taki search bar me use kar sake
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar"; // Navbar component import kiya taaki usko home page pe use kar sake matlb routing taki search ko pros ke raste navbar me sand ker ske
import { set } from "mongoose";


export default function Home() {


  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // search query ke liye state banayi, taki jab user search bar me kuch type kare to usko track kar sake

  useEffect(() => {
  const getUsers= async (search ="") => {
    try {
      const response = await fetch(`https://devmatch-backend-72iu.onrender.com/api/all?search=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUsers(data.allBios);
      } else {
        console.error("Server responded with an error:", data);
      }

    } catch (error) {
      console.error("Network Error (Backend off?):", error);
    }
  };

  getUsers(searchQuery);
}, [searchQuery]); // component mount hote hi ye useEffect chalega,


  return (
    
    // स्क्रीन को साफ़ बैकग्राउंड और सही मार्जिन दिया
    <div className="bg-gray-50 min-h-screen">
      <Navbar onSearchChange ={setSearchQuery}/> 

      <div className="p-6 md:p-12 lg:p-16 max-w-[90rem] mx-auto">
        <div className="mb-12 border-b border-gray-200 pb-6">
          <h1 className="text-4xl font-extrabold text-gray-950 tracking-tighter">
            Developers Feed
          </h1>
          <p className="text-gray-600 mt-2.5 text-lg">
            Find your perfect coding partner based on skills and learning goals.
          </p>
        </div>
        
        {/* ग्रिड को ३x३ किया (lg:grid-cols-3) और बीच में सही जगह (gap-8) दी */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
          {users.map((user:any) => (
            <DevCard key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}