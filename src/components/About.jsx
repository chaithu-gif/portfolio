import { useState } from "react";
import { motion } from "framer-motion";
import { FiBook, FiTarget, FiHeart, FiStar, FiAward, FiCode, FiEdit2 } from "react-icons/fi";
import SectionWrapper from "./SectionWrapper";
import EditModal from "./EditModal";
import { useApp } from "../context/AppContext";

const iconMap = { target: FiTarget, heart: FiHeart, star: FiStar };
const timelineIcons = [FiBook, FiCode, FiAward];

export default function About() {
  const { data, admin } = useApp();
  const about = data.about;
  console.log("ABOUT DATA", about);
console.log("EDUCATION", about.education);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <SectionWrapper id="about" className="py-16 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 relative">
          {admin && (
            <button onClick={() => setEditOpen(true)}
              className="absolute -top-4 right-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-all">
              <FiEdit2 size={12} /> Edit Section
            </button>
          )}
          <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-3">About Me</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Know Me <span className="gradient-text">Better</span></h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            {about.highlights.map((item, i) => {
              const Icon = iconMap[item.icon] || FiTarget;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="card p-5 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl gradient-bg flex items-center justify-center text-white flex-shrink-0">
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6 sm:p-8 relative overflow-hidden">
              <h3 className="text-lg font-semibold text-slate-900 mb-8 flex items-center gap-2">
                <FiBook className="text-primary" /> My Journey
              </h3>
              <div className="relative pl-8 space-y-0">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent rounded-full" />
                {about.timeline.map((item, i) => {
                  const Icon = timelineIcons[i % timelineIcons.length];
                  return (
                    <motion.div key={item.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                      className="relative pb-8 last:pb-0">
                      <div className="absolute left-[-19px] w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <Icon size={11} />
                      </div>
                      <span className="text-[11px] font-bold text-primary uppercase tracking-wider">{item.year}</span>
                      <h4 className="font-semibold text-slate-900 text-sm mt-0.5">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="card p-5 sm:p-6">
  <h4 className="text-sm font-semibold text-slate-900 mb-4">
    Education
  </h4>

  <div className="space-y-5">
    {about.education?.map((edu, index) => (
      <div
        key={index}
        className="relative border-l-2 border-primary pl-4"
      >
        <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full gradient-bg"></div>

        <h5 className="font-semibold text-slate-900 text-sm">
          {edu.degree}
        </h5>

        <p className="text-xs text-slate-600 mt-1">
          {edu.university}
        </p>

        <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500">
          <span>{edu.year}</span>

          {edu.cgpa && (
            <span className="font-medium text-primary">
              CGPA: {edu.cgpa}
            </span>
          )}
        </div>
      </div>
    ))}
  </div>
</div>
          </div>
        </div>
      </div>

      <EditModal section="about" open={editOpen} onClose={() => setEditOpen(false)} />
    </SectionWrapper>
  );
}
