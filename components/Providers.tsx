"use client"; // ye line isliye add kiya hai taki ye component client side pe render ho, kyunki isme hum next-auth ka use kar rahe hain jo client side pe hi kaam karta hai.
import { SessionProvider } from "next-auth/react"; // SessionProvider ko import kiya hai taki hum apne app me session management ke liye next-auth ka use kar sake, aur users ke session ko manage kar sake.

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

// ye component h  is liye banaya hai taki hame navbar me retun mr  google auth proider ko navbar ke return ke ander  wrap na karna pade, aur hum isse apne layout.tsx me wrap kar denge taki pura app me session available ho jaye.