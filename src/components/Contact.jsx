import { useState } from "react";
import { FiSend, FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiLoader, FiCheckCircle, FiEdit2 } from "react-icons/fi";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import EditModal from "./EditModal";
import { useApp } from "../context/AppContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const socialIconMap = { GitHub: FiGithub, LinkedIn: FiLinkedin, Twitter: FiTwitter };

export default function Contact() {
  const { data, admin } = useApp();
  const contactData = data.contact;
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", text: "" });
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const rd = await res.json();
      if (res.ok) {
        setStatus({ type: "success", text: "Message sent successfully! I'll get back to you soon." });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", text: rd.error || "Failed to send message." });
      }
    } catch {
      setStatus({ type: "error", text: "Could not reach the server. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper id="contact" className="py-16 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 relative">
          {admin && (
            <button onClick={() => setEditOpen(true)}
              className="absolute -top-4 right-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-all">
              <FiEdit2 size={12} /> Edit Contact
            </button>
          )}
          <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-3">Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Contact <span className="gradient-text">Me</span></h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="card p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Available for opportunities</p>
                  <p className="text-xs text-slate-400">Reply within 24 hours</p>
                </div>
              </div>

              {[
                { icon: FiMail, label: "Email", value: contactData.email, href: `mailto:${contactData.email}` },
                { icon: FiPhone, label: "Phone", value: contactData.phone, href: `tel:${contactData.phone}` },
                { icon: FiMapPin, label: "Location", value: contactData.location },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 py-3 border-b border-slate-100 last:border-0">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white flex-shrink-0">
                    <item.icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-medium text-slate-900 hover:text-primary transition-colors break-all">{item.value}</a>
                    ) : (
                      <p className="text-sm font-medium text-slate-900">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="card p-5 sm:p-6">
              <p className="text-sm font-medium text-slate-900 mb-4">Connect on Social</p>
              <div className="space-y-3">
                {contactData.social.map((link) => {
                  const Icon = socialIconMap[link.platform] || FiGithub;
                  return (
                    <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-primary/5 transition-all group">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">{link.platform}</p>
                        <p className="text-[11px] text-slate-400 truncate">{link.handle}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="card p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Send a Message</h3>
              <p className="text-sm text-slate-400 mb-6">Have a question, opportunity, or just want to say hi? Fill out the form below.</p>

              {status.text && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 px-4 py-3 rounded-xl text-sm border flex items-center gap-2 ${
                    status.type === "success"
                      ? "bg-green-50 border-green-200 text-green-700"
                      : "bg-red-50 border-red-200 text-red-700"
                  }`}>
                  <FiCheckCircle size={16} className={status.type === "success" ? "text-green-500" : "text-red-500"} />
                  {status.text}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Your Name" required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="Your Email" required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                </div>
                <input type="text" name="subject" value={form.subject} onChange={handleChange}
                  placeholder="Subject (optional)"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                <textarea name="message" value={form.message} onChange={handleChange}
                  placeholder="Your Message" rows={5} required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none" />
                <button type="submit" disabled={loading}
                  className="w-full sm:w-auto btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? <FiLoader className="animate-spin" /> : <FiSend />}
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      <EditModal section="contact" open={editOpen} onClose={() => setEditOpen(false)} />
    </SectionWrapper>
  );
}
