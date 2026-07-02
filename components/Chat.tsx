"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


const ChatPage = () => {

  const router = useRouter();

  const { data: session } = useSession();
  const [friends, setFriends] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [myActualId, setMyActualId] = useState(null);

  // backend se frind list ko lana 
  useEffect(() => {
    const fetchFriends = async () => {
      const res = await fetch("https://devmatch-backend-72iu.onrender.com/api/chat/friends", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success && data.friends.length > 0) {
        setFriends(data.friends);
        setMyActualId(data.friends[0].myId); // बैकएंड से मिली पक्की ID
      }
    };
    if (session) fetchFriends();
  }, [session]);

  // purane chat messages ko lana jab koi chat select kare
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;
      const res = await fetch(`https://devmatch-backend-72iu.onrender.com/api/chat/get/${selectedChat.otherUser._id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setMessages(data.messages);
    };
    fetchMessages();
  }, [selectedChat]);

  // massage bhejne ka function
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    const res = await fetch("https://devmatch-backend-72iu.onrender.com/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverId: selectedChat.otherUser._id, message: newMessage }),
      credentials: "include",
    });

    const data = await res.json();
    if (data.success) {
      setMessages((prev) => [...prev, data.newMessage]); // new message ko chat mein add karo
      setNewMessage(""); // input field ko clear karo
    }
  };

  if (!session) return <p className="p-10 text-center">Loading session...</p>;

  return (
    <div className="flex h-screen bg-[#f0f2f5] font-sans">
      <button
        onClick={() => router.back()}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-all text-gray-600 z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {/* SIDEBAR */}
      <div className="w-1/4 bg-white border-r border-gray-300">
        <div className="p-4 bg-[#00a884] text-white font-bold text-xl uppercase tracking-wider shadow-md">My Chats</div>
        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          {friends.map((item) => (
            <div
              key={item._id}
              onClick={() => setSelectedChat(item)}
              className={`p-4 border-b cursor-pointer flex items-center gap-3 transition-all ${selectedChat?._id === item._id ? "bg-gray-200 border-l-4 border-blue-600" : "hover:bg-gray-50"}`}
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold uppercase shadow-sm">
                {item.otherUser.name.charAt(0)}
              </div>
              <p className="font-bold text-gray-700">{item.otherUser.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT WINDOW */}
      <div className="flex-1 flex flex-col bg-[#e5ddd5]">
        {selectedChat ? (
          <>
            <div className="p-3 bg-[#ededed] border-b shadow-sm font-bold text-gray-700 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold uppercase">
                {selectedChat.otherUser.name.charAt(0)}
              </div>
              {selectedChat.otherUser.name}
            </div>

            <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-2">
              {messages.map((msg) => {

                const amISender = String(msg.senderId) === String(myActualId);
                return (
                  <div
                    key={msg._id}
                    className={`max-w-xs p-2 rounded-lg text-sm shadow-sm ${amISender ? "bg-[#dcf8c6] self-end rounded-tr-none" : "bg-white self-start rounded-tl-none"}`}
                  >
                    {msg.message}
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-[#f0f2f5] flex gap-2 border-t border-gray-300">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 p-3 rounded-full outline-none px-5 shadow-inner"
                placeholder="Type a message..."
              />
              <button onClick={handleSendMessage} className="bg-[#00a884] text-white px-6 py-2 rounded-full font-bold hover:bg-[#008f72] shadow-md transition-all">
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 italic">
            <p className="text-lg">Select a friend to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;