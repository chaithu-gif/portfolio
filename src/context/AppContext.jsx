import { doc, getDoc,updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { createContext, useContext, useState, useCallback, useEffect } from "react";
//get doc-read document ,doc()-refernece to the document and db- database connection

const STORAGE_KEY = "portfolio_data";
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

const defaults = {
  hero: {
    name: "Chaithanya",
    tagline: "CSE Student & Full Stack Developer",
    subtitle: "I build things for the web",
    bio: "A passionate Computer Science Engineering student at BMS College of Engineering, dedicated to crafting modern, scalable web applications with clean code and exceptional user experiences.",
    highlights: [
      { label: "Projects", value: 3, suffix: "+" },
      { label: "Certifications", value: 3, suffix: "+" },
      { label: "Technologies", value: 10, suffix: "+" },
    ],
  },
  about: {
    education: [
  {
    degree: "B.E Computer Science and Engineering",
    university: "BMS College of Engineering",
    year: "2024-Present",
    cgpa: "9.52"
  },
  {
    degree: "PUC",
    university: "STG PU College,Chinakurali Mandya -571455",
    year: "2022-2024",
    cgpa: "97.83%"
  },
  {
    degree: "SSLC",
    university: "Sri Cham Sugar School,Bharathinagar, Mandya -571422",
    year: "2021-2022",
    cgpa: "98%"
  }
],
    highlights: [
      { title: "Career Objective", desc: "To leverage my expertise in React.js and Node.js to build innovative web applications that solve real-world problems." },
      { title: "Interests", desc: "Full-Stack Development, UI/UX Design, Open Source, Cloud Computing, and Competitive Programming." },
      { title: "Achievements", desc: "Built 3+ projects, earned multiple certifications, active in hackathons and developer communities." },
    ],
    timeline: [
      { year: "2024", title: "Started B.E in CSE", desc: "BMS College of Engineering, Bangalore" },
      { year: "2025", title: "Full-Stack Development", desc: "Built multiple projects with React, Node.js, MongoDB" },
      { year: "2026", title: "Hackathons & Certifications", desc: "Participated in SIH, earned cloud & web dev certs" },
    ],
  },
  skills: [
    { title: "Languages", skills: [{ name: "Java", level: 90 }, { name: "Python", level: 88 }, { name: "C", level: 80 }, { name: "JavaScript", level: 85 }] },
    { title: "Frontend", skills: [{ name: "React.js", level: 88 }, { name: "HTML5", level: 95 }, { name: "CSS3", level: 90 }, { name: "Tailwind CSS", level: 88 }] },
    { title: "Backend & Tools", skills: [{ name: "Node.js", level: 82 }, { name: "Express.js", level: 80 }, { name: "MongoDB", level: 78 }, { name: "Git", level: 85 }] },
  ],
  projects: [
    { title: "Event Management System", description: "A full-stack Event Management System with user authentication, event catalog, registration, and payment via Razorpay.", image: "EMS", tech: ["HTML","CSS","MongoDB","JavaScript","Razorpay"], github: "https://github.com/chaithu-gif/event-management-system.git", live: "#", category: "fullstack", challenges: "Secure payment gateway integration and real-time registration.", outcome: "100+ event registrations processed during testing." },
    { title: "Clip CREW", description: "A collaborative platform for hiring creative talents with profiles, portfolios, payments, and messaging.", image: "CC", tech: ["React","Firebase","Tailwind CSS","Node.js","TypeScript"], github: "https://github.com/chaithu-gif/Clip_crew.git", live: "https://clipcrew21.netlify.app/", category: "fullstack", challenges: "Real-time messaging and portfolio management.", outcome: "Live platform with active users." },
    { title: "Portfolio Website", description: "A modern responsive portfolio with React, Tailwind CSS, animations, and a contact form backend.", image: "PW", tech: ["React","Tailwind CSS","Vite","Node.js","MongoDB"], github: "#", live: "#", category: "frontend", challenges: "Smooth animations and responsive design.", outcome: "95+ Lighthouse scores." },
  ],
  experience: {
    certifications: [
      { title: "Responsive Web Design", issuer: "freeCodeCamp" },
      { title: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp" },
      { title: "Python for Data Science", issuer: "Infosys Springboard" },
    ],
    activities: [
      { title: "Smart India Hackathon 2025", desc: "Led a team of 6 to build an innovative solution.", tag: "Participant" },
      { title: "Google Developer Groups", desc: "Active member organizing tech talks and workshops.", tag: "Member" },
    ],
  },
  coding: [
    { name: "LeetCode", handle: "chaithanya_dk", solved: "50+", link: "https://leetcode.com" },
    { name: "GeeksforGeeks", handle: "chaithu_gif", solved: "30+", link: "https://geeksforgeeks.org" },
    { name: "HackerRank", handle: "chaithanya_dk", solved: "5★", link: "https://hackerrank.com" },
  ],
  resume: {
    stats: [
      { label: "Projects Built", value: 3, suffix: "+" },
      { label: "Certifications", value: 4, suffix: "+" },
      { label: "Technologies", value: 12, suffix: "+" },
      { label: "Hackathons", value: 2, suffix: "+" },
    ],
  },
  contact: {
    email: "chaithanyadk.07@gmail.com",
    phone: "+91 8050693918",
    location: "Bangalore, India",
    social: [
      { platform: "GitHub", url: "https://github.com/chaithu-gif", handle: "@chaithu-gif" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/chaithanyadk", handle: "in/chaithanyadk" },
      { platform: "Twitter", url: "https://twitter.com", handle: "@chaithanya_dk" },
    ],
  },
};

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      const stored = JSON.parse(raw);

      return {
        ...defaults,
        ...stored,
        about: {
          ...defaults.about,
          ...stored.about,
        },
      };
    }
  } catch (err) {
    console.error(err);
  }

  return defaults;
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
const [data, setData] = useState(defaults);  
const [admin, setAdmin] = useState(() => sessionStorage.getItem("admin_logged_in") === "true");
useEffect(() => {
  async function fetchPortfolio() {
    try {
      const docRef = doc(db, "portfolio", "main");
      const docSnap = await getDoc(docRef);

     if (docSnap.exists()) {
  const firebaseData = docSnap.data();

  setData((prev) => ({
    ...prev,
    hero: {
      ...prev.hero,
      ...firebaseData.hero,
    },
     about: {
    ...prev.about,
    ...firebaseData.about,
  },
  skills: firebaseData.skills || prev.skills,
   projects: firebaseData.projects || prev.projects,
  experience: firebaseData.experience || prev.experience,
  coding: firebaseData.coding || prev.coding,
  contact: firebaseData.contact || prev.contact,
  resume: firebaseData.resume || prev.resume,
  }));
}
    } catch (error) {
      console.error("Firestore Error:", error);
    }
  }

  fetchPortfolio();
}, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const login = useCallback((username, password) => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setAdmin(true);
      sessionStorage.setItem("admin_logged_in", "true");
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setAdmin(false);
    sessionStorage.removeItem("admin_logged_in");
  }, []);

  const updateData = useCallback(async (section, value) => {
  if (!admin) return;

  try {
    const docRef = doc(db, "portfolio", "main");

    await updateDoc(docRef, {
      [section]: value,
    });

    setData((prev) => ({
      ...prev,
      [section]: value,
    }));

  } catch (error) {
    console.error("Update Error:", error);
  }
}, [admin]);
  const resetData = useCallback(() => {
    if (!admin) return;
    setData(defaults);
    localStorage.removeItem(STORAGE_KEY);
  }, [admin]);

  return (
    <AppContext.Provider value={{ data, admin, login, logout, updateData, resetData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
