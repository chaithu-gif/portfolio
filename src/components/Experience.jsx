import { useState } from "react";
import { motion } from "framer-motion";
import { FiAward, FiCode, FiEdit2 } from "react-icons/fi";
import SectionWrapper from "./SectionWrapper";
import EditModal from "./EditModal";
import { useApp } from "../context/AppContext";

export default function Experience() {
  const { data, admin } = useApp();
  const exp = data.experience;
  const [editOpen, setEditOpen] = useState(false);

  return (
    <SectionWrapper id="experience" className="py-16 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 relative">
          {admin && (
            <button onClick={() => setEditOpen(true)}
              className="absolute -top-4 right-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-all">
              <FiEdit2 size={12} /> Edit Section
            </button>
          )}
          <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-3">Experience & Recognition</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">My <span className="gradient-text">Journey</span></h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <FiAward className="text-primary" /> Certifications
            </h3>
            <div className="relative pl-8 space-y-0">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-accent to-primary rounded-full" />
              {exp.certifications.map((cert, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pb-8 last:pb-0">
                  <div className="absolute left-[-19px] w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-white shadow-lg">
                    <FiAward size={11} />
                  </div>
                  <div className="card p-4 sm:p-5">

  {cert.image && (
    <img
      src={cert.image}
      alt={cert.title}
      className="w-full h-48 object-cover rounded-lg mb-4 border"
    />
  )}

  <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-900 text-sm">{cert.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{cert.issuer}</p>
                      </div>
                      <span className="px-2.5 py-1 text-[10px] font-bold rounded-full gradient-bg text-white flex-shrink-0">CERTIFIED</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <FiCode className="text-primary" /> Hackathons & Events
            </h3>
            <div className="space-y-4">
              {exp.activities.map((act, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 text-sm">{act.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{act.desc}</p>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-full gradient-bg text-white flex-shrink-0">{act.tag}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <EditModal section="experience" open={editOpen} onClose={() => setEditOpen(false)} />
    </SectionWrapper>
  );
}
