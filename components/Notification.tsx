"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; //use sesstion import kitya taki cookies se token le sake 
import { useRouter } from "next/navigation"; // useRouter import kiya taki user ko login nahi hai to home page pe bhej sake, taki wo login kar sake.


// डेटा का टाइप सेट कर देते हैं ताकि कोडिंग में गलती न हो
interface Request {
  _id: string;
  sender: {
    name: string;
    email: string;
    image?: string;
  };
  status: string;
}

const NotificationPage = () => {

  const router = useRouter(); // useRouter ka instance banaya taki hum user ko redirect kar sake

  const { data: session } = useSession(); //cookies se token liya 

  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);// loading state banayi taki data fetch hone tak user ko pata chale ki kuch ho raha hai

  // notifications dekne ke liye backend se data fetch karne ka function
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/api/notifications`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setRequests(data.requests);
      }

    } catch (error) {
      console.error("Notifications fetch karne mein error:", error);

    } finally {
      setLoading(false);
    }
  };
  // page load hote hi notifications fetch karne ke liye useEffect ka use kiya hai, taki user ko turant apni notifications dikh jaye
  useEffect(() => {
    fetchNotifications();

    if (!session) { // ager token nhi h to notification wala page mat dhiko 
      alert("please login first to see notifications");
      window.location.href = "/"; // agar token nahi hai to user ko home page pe bhej do, taki wo login kar sake.
    }
  }, []);

  // notifications ko accept ya ignor karne ke liye backend me request bhejne ka function, taki wo database me update ho jaye aur user ko apni notifications me sahi status dikhai de
  const handleReview = async (requestId: string, status: "accepted" | "rejected") => {
    try {
      const res = await fetch(`http://localhost:8000/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Credentials 'include' zaroori hai agar tum cookies use kar rahe ho
        credentials: "include",
        body: JSON.stringify({ requestId, status }),
      });

      const data = await res.json();

      if (data.success) {
        alert(`Request ${status === "accepted" ? "Accept" : "Ignore"} ho gayi hai!`);
        setRequests((prevRequests) => prevRequests.filter(req => req._id !== requestId));

      } else {
        alert(data.message || "Kuch galti hui hai");
      }
    } catch (error) {
      console.error("Review error:", error);
      alert("Server se connect nahi ho paa raha");
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <button
        onClick={() => router.back()}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-all text-gray-600 z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>


      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Notifications </h1>

        {loading ? (
          <p className="text-center text-gray-500">Checking for requests...</p>
        ) : requests.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow-sm text-center border border-gray-200">
            <p className="text-gray-500">Notifications</p>
          </div>
        ) : (
          <div className="space-y-4">

            {requests.map((req) => (
              <div key={req._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* प्रोफाइल इमेज (अगर है तो) */}
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    {req.sender.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{req.sender.name}</h3>
                    <p className="text-gray-500 text-sm">Wants to connect with you</p>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full uppercase">
                      {req.status}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => handleReview(req._id, "accepted")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-md"
                  >
                    Accept
                  </button>
                  <button onClick={() => handleReview(req._id, "rejected")} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition">
                    Ignore
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;