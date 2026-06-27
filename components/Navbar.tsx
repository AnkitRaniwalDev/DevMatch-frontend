"use client";
import { useEffect } from "react";
import Link from 'next/link';
import { Search, MessageSquare, UserCircle, Bell } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react'; // use session se ham session ki information le sakte hain, signIn aur signOut se login aur logout kar sakte hain.

interface NavbarProps{
  onSearchChange: (query: string) => void; // Navbar se search query ko receive karne ke liye function type define kiya
  }

const Navbar = ({onSearchChange}:NavbarProps) => {
 const { data: session } = useSession();
  
   useEffect(() => {
    // ager session hai to backend ko user ka data bhejo taki wo database me save kar sake, aur agar session nahi hai to kuch mat karo.
    if (session) {
      const saveUser = async () => {
        try {
          const response = await fetch("http://localhost:8000/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // cookie se token bhejne ke liye, taki backend us token ko verify kar sake aur user ko authenticate kar sake.
            
            // session se user ka name, email, image leke backend ko bhej rahe hain taki wo database me save kar sake.
            body: JSON.stringify({
               name: session.user?.name,
               email: session.user?.email,
               image: session.user?.image
            }),
          });

          const data = await response.json();
          if (response.ok) {
            console.log("User saved successfully:", data);
          } else {
            console.error("Server responded with an error:", data);
          }

        } catch (error) {
          console.error("Network Error (Backend off?):", error);
        }
      };

      saveUser();
    }
  }, [session]); // jese hi session change hoga ye useEffect chalega, 

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b sticky top-0 z-50">
      {/* logo */}
      <Link href="/" className="text-2xl font-bold text-blue-600 ">
        DevMatch
      </Link>

      {/* search */}
      <div className="flex items-center bg-gray-200 border border-gray-400 px-4 py-2 rounded-full w-1/3">
        <Search className="text-gray-800 mr-2" size={18} />
        <input
          type="text"
          placeholder="Skills search karein..."
          className="bg-transparent outline-none w-full text-sm"
          onChange={(e) => onSearchChange(e.target.value)} // jab user search bar me kuch type kare to onSearchChange function ko call karo aur usme search query bhejo, taki wo home page pe useEffect ke through backend se filtered users ko fetch kar sake.
        />
      </div>

      {/* icon chat profile */}

      <div className="flex items-center gap-5 text-gray-600 s">
        <Link href="/Notification.Routing">
        <Bell size={22} className="cursor-pointer hover:text-blue-700 " />
        </Link>

        <Link href="/Chat.Routing">
          <MessageSquare size={22} className="hover:text-blue-700" />
        </Link>
         
        <Link href="/Bio.Routing"> 
          <UserCircle size={24} className="hover:text-blue-700" />
        </Link>


        {/* profile */}
        {session ? (

          <div className="flex items-center gap-2">
            <img
              src={session?.user?.image || ""}
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <button
              onClick={() => signOut()}
              className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (

          <button className="hover:text-blue-700 " onClick={() => signIn("google")}>
            Login
          </button>
        )}
      </div>



    </nav>
  );
};

export default Navbar;