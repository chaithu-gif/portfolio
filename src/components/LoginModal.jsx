import { useState } from "react";
import { FiLock, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";

export default function LoginModal({ open, onClose }) {
  const { login } = useApp();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password");
      return;
    }
    if (login(username, password)) {
      setUsername("");
      setPassword("");
      setError("");
      onClose();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 p-6"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600">
              <FiX size={16} />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-3">
                <FiLock className="text-white" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Admin Login</h3>
              <p className="text-xs text-slate-500 mt-1">Sign in to manage portfolio content</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(""); }}
                placeholder="Username"
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button type="submit" className="w-full py-3 gradient-bg text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all text-sm">
                Sign In
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
