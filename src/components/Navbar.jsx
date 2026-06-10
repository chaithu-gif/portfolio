import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FiLock, FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import LoginModal from "./LoginModal";
import { useApp } from "../context/AppContext";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { admin, logout } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = navLinks.map((l) => l.href.slice(1));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActive(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-900/5" : "bg-transparent"
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <a href="#hero" className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              <span className="gradient-text">Chaithanya</span>
              <span className="text-slate-300">DK</span>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <a key={link.name} href={link.href}
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive ? "text-primary" : "text-slate-500 hover:text-primary"
                    }`}>
                    {link.name}
                    {isActive && <motion.div layoutId="navIndicator" className="absolute bottom-0 left-3 right-3 h-0.5 gradient-bg rounded-full" />}
                  </a>
                );
              })}
              {admin ? (
                <button onClick={logout} type="button"
                  className="ml-3 flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all">
                  <FiLogOut size={15} /> Logout
                </button>
              ) : (
                <button onClick={() => setLoginOpen(true)} type="button" aria-label="Admin login"
                  className="ml-3 p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-all">
                  <FiLock size={16} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 md:hidden">
              {admin ? (
                <button onClick={logout} type="button" aria-label="Logout" className="p-2 rounded-lg text-slate-400 hover:text-red-500">
                  <FiLogOut size={18} />
                </button>
              ) : (
                <button onClick={() => setLoginOpen(true)} type="button" aria-label="Admin login" className="p-2 rounded-lg text-slate-400">
                  <FiLock size={18} />
                </button>
              )}
              <button onClick={() => setMenuOpen(!menuOpen)} type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} className="p-2 rounded-lg text-slate-400">
                {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-72 max-w-[80vw] bg-white shadow-2xl border-l border-slate-200 p-6 pt-20">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-base font-medium rounded-xl text-slate-600 hover:text-primary hover:bg-primary/5 transition-all">
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
