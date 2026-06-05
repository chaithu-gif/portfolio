import { useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiCode, FiEdit2 } from "react-icons/fi";
import SectionWrapper from "./SectionWrapper";
import EditModal from "./EditModal";
import { useApp } from "../context/AppContext";

export default function CodingProfiles() {
  const { data, admin } = useApp();
  const coding = data.coding;
  const [editOpen, setEditOpen] = useState(false);

  return (
    <SectionWrapper id="coding" className="py-16 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 relative">
          {admin && (
            <button onClick={() => setEditOpen(true)}
              className="absolute -top-4 right-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-all">
              <FiEdit2 size={12} /> Edit Profiles
            </button>
          )}
          <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-3">Competitive Programming</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Coding <span className="gradient-text">Profiles</span></h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {coding.map((profile, i) => (
            <motion.a key={i} href={profile.link} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card p-5 sm:p-6 group block">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl gradient-bg text-white">
                  <FiCode size={24} />
                </div>
                <FiExternalLink className="text-slate-400 group-hover:text-primary transition-colors" size={16} />
              </div>
              <p className="font-semibold text-slate-900">{profile.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">{profile.handle}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <FiCode size={12} />
                <span>{profile.solved} problems solved</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <EditModal section="coding" open={editOpen} onClose={() => setEditOpen(false)} />
    </SectionWrapper>
  );
}
