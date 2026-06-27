import { Code2, GraduationCap,  ExternalLink, MessageSquare } from "lucide-react";

// १. इंटरफ़ेस - जो सीधा तुम्हारे MongoDB Model से मैच करता है
interface DevCardProps {
  user: {
    _id:string;
    bio: string;
    skills: string[];
    learning: string[];
    portfolio: string;
    github: string;
    linkedin: string;
    user: { // Populate होने के बाद जो डेटा आता है
      _id:string;
      name: string;
      email: string;
      image: string;
    };
  };
}

const DevCard = ({ user }: DevCardProps) => {



  const  ConnectToChat= async (receiverId: string) => {
    console.log("Connecting to chat with user ID:", receiverId);
  try {
    const res = await fetch(`http://localhost:8000/api/request/${receiverId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // cookie se token bhejne ke liye
    });
    const data = await res.json();
    if(data.success) {
      alert("Request bhej di gayi hai!");
    }
  } catch (error) {
    console.log("Request fail ho gayi", error);
  }
};
  
 




  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">

      {/* २. प्रोफाइल सेक्शन (Header) */}
      <div className="p-5 flex-grow">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={user.user?.image || "/default-avatar.png"}
            alt={user.user?.name}
            className="w-14 h-14 rounded-full border-2 border-blue-100 p-0.5 object-cover shadow-inner"
          />
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-lg text-gray-900 truncate tracking-tight">
              {user.user?.name}
            </h2>
            <p className="text-xs text-gray-500 truncate -mt-0.5">
              {user.user?.email}
            </p>
          </div>
        </div>

        {/* ३. बायो (Headline) */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-2 italic">
            "{user.bio}"
          </p>
        </div>

        {/* ४. स्किल्स सेक्शन */}
        <div className="mb-4">
          <h3 className="text-[10px] font-semibold text-gray-400 uppercase mb-2 flex items-center gap-1.5 tracking-wider">
            <Code2 size={14} className="text-gray-400" /> My Skills
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {user.skills.map((skill, index) => (
              <span key={index} className="bg-blue-50 text-blue-700 text-[10px] px-2.5 py-1 rounded-full font-semibold border border-blue-100">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* ५. लर्निंग सेक्शन */}
        <div className="mb-4">
          <h3 className="text-[10px] font-semibold text-gray-400 uppercase mb-2 flex items-center gap-1.5 tracking-wider">
            <GraduationCap size={14} className="text-gray-400" /> Want to Learn
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {user.learning.map((learn, index) => (
              <span key={index} className="bg-orange-50 text-orange-700 text-[10px] px-2.5 py-1 rounded-full font-semibold border border-orange-100">
                {learn}
              </span>
            ))}
          </div>
        </div>

        {/* ६. सोशल लिंक्स (नया सेक्शन) */}
        <div className="flex items-center gap-4 pt-3 border-t border-gray-100 mt-3">
          {/* GitHub Link */}
          {user.github && (
            <a href={user.github} target="_blank" className="text-gray-400 hover:text-black transition-colors ">
            Github
            </a>
          )}

          {/* LinkedIn Link */}
          {user.linkedin && (
            <a href={user.linkedin} target="_blank" className="text-gray-400 hover:text-blue-600 transition-colors">
            LinkedIn
            </a>
          )}

          {/* Portfolio Link */}
          {user.portfolio && (
            <a href={user.portfolio} target="_blank" className="text-gray-400 hover:text-green-600 transition-colors">
            Portfolio
            </a>
          )}
        </div>

        {/* ७. एक्शन बटन (हमेशा नीचे रहेगा) */}
        <div className="p-5 pt-0 mt-3">
          <button onClick={()=>ConnectToChat(user.user._id)}  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <MessageSquare size={19} />
            <span className="text-sm">Connect to Chat</span>
          </button>
        </div>
      </div>
      </div>
      );
}



      export default DevCard;