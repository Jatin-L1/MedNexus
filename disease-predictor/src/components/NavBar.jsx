"use client";
import React, { useEffect,useContext,useState} from "react";
import Link from "next/link";
import gsap from "gsap";
import { AnimateContext } from "../context/context";
import { UserRound } from 'lucide-react';

const Navbar = () => {
  const { animate } = useContext(AnimateContext);
  useEffect(() => {
    if (animate) {
      gsap
        .timeline()
        .from(".logo", { duration: 0.8, opacity: 0, x: -20, ease: "power3.out", stagger: 1 })
        .to(".logo", { opacity: 1, duration: 0.2 })
        .from(
          ".menu-links li",
          {
            duration: 0.8,
            opacity: 0,
            x: -20,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.6"
        )
        .to(".menu-links li", { opacity: 1, duration: 0.2 })
        .from(".sign", { duration: 0.8, opacity: 0, x: -20, ease: "power3.out" }, "-=0.6")
        .to(".sign", { opacity: 1, duration: 0.2 })
        .from(".cart", { duration: 0.6, opacity: 0, x: -20, ease: "power3.out" }, "-=0.6")
        .to(".cart", { opacity: 1, duration: 0.2 })
        .set([".logo", ".menu-links li", ".sign", ".cart"], { clearProps: "all" });
    }
  }, [animate]);

  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });


  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 uppercase">
      {/* Left Section: Patient Bridge Logo */}
      <div className="logo text-[40px] font-semibold">PATIENT BRIDGE</div>

      {/* Center Section for Menu Links */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <ul className="menu-links flex space-x-5 text-xs font-semibold">
          {[
            { name: "Disease Prediction", href: "/predict" },
            { name: "AI Assistance", href: "/ai" },
            { name: "Find a Hospital", href: "/hospital" },
            { name: "Dashboard", href: "/dashboard" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="hover:text-orange-500"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section: Sign Up and Cart */}
      <div className="flex items-center space-x-4">
        <div className="px-5 py-2 rounded-full  cursor-pointer sign capitalize">{user?.name || `Not logined`}</div>
        <div className="text-xl cursor-pointer">
          <UserRound className="w-6 h-6 text-black font-extralight cart"/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
