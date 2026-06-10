import { useState } from "react";
import { motion } from "framer-motion";
import { FiEdit2 } from "react-icons/fi";
import SectionWrapper from "./SectionWrapper";
import EditModal from "./EditModal";
import { useApp } from "../context/AppContext";

export default function Skills() {
  const { data, admin } = useApp();
  const skills = data.skills;
  const [editOpen, setEditOpen] = useState(false);

  return (
    <SectionWrapper id="skills" className="py-16 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 relative">
          {admin && (
            <button onClick={() => setEditOpen(true)}
              className="absolute -top-4 right-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-all">
              <FiEdit2 size={12} /> Edit Skills
            </button>
          )}
          <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-3">Skills & Expertise</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">My <span className="gradient-text">Tech Stack</span></h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {skills.map((category, ci) => (
            <motion.div key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
              className="card p-5 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-5 sm:mb-6 flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full gradient-bg inline-block" />
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, si) => (
                  <div
  key={skill.name}
  className="px-3 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium"
>
  {skill.name}
</div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <EditModal section="skills" open={editOpen} onClose={() => setEditOpen(false)} />
    </SectionWrapper>
  );
}
