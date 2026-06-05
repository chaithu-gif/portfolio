import { useState } from "react";
import { FiDownload, FiEye, FiFileText, FiUpload, FiEdit2 } from "react-icons/fi";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import AnimatedCounter from "./AnimatedCounter";
import EditModal from "./EditModal";
import { useApp } from "../context/AppContext";

export default function Resume() {
  const { data, admin } = useApp();
  const resumeData = data.resume;
  const [editOpen, setEditOpen] = useState(false);

  const [resumeUrl, setResumeUrl] = useState(
    localStorage.getItem("resumeUrl") || "/resume.pdf"
  );

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target.result;
        setResumeUrl(dataUrl);
        localStorage.setItem("resumeUrl", dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <SectionWrapper id="resume" className="py-16 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 relative">
          {admin && (
            <button onClick={() => setEditOpen(true)}
              className="absolute -top-4 right-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-all">
              <FiEdit2 size={12} /> Edit Stats
            </button>
          )}
          <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-3">Resume</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Download My <span className="gradient-text">Resume</span></h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card p-6 sm:p-8 lg:p-10">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl gradient-bg text-white">
                    <FiFileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Ready to collaborate?</h3>
                    <p className="text-xs text-slate-500">Chaithanya D K · Full Stack Developer</p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-500 mb-6 leading-relaxed">
                  I'm currently looking for internship and placement opportunities where I can
                  contribute my skills in full-stack development, build impactful products, and
                  grow as an engineer. Let's connect!
                </p>

                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${resumeUrl !== "/resume.pdf" ? "bg-green-500" : "bg-yellow-500"}`} />
                  <span className="text-[11px] text-slate-400">
                    {resumeUrl !== "/resume.pdf" ? "Resume uploaded" : "Default resume — upload yours above"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 mb-8">
                  <a href={resumeUrl} download="Chaithanya_DK_Resume.pdf" className="btn-primary text-sm">
                    <FiDownload /> Download Resume
                  </a>
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">
                    <FiEye /> Preview Resume
                  </a>
                  <label className="btn-outline text-sm cursor-pointer">
                    <FiUpload /> Upload Resume
                    <input type="file" accept=".pdf" onChange={handleResumeUpload} className="hidden" />
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {resumeData.stats.map((stat) => (
                    <motion.div key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-center p-3 rounded-xl bg-slate-50">
                      <div className="text-xl sm:text-2xl font-bold gradient-text">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="relative">
                  <div className="w-full aspect-[7/10] rounded-xl overflow-hidden gradient-bg p-1 shadow-xl shadow-primary/10">
                    <div className="w-full h-full rounded-lg bg-white flex items-center justify-center">
                      <div className="text-center px-4 sm:px-6">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-primary/20">
                          <span className="text-2xl sm:text-3xl font-bold text-white">C</span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-base sm:text-lg">Chaithanya D K</h3>
                        <p className="text-[11px] sm:text-xs text-slate-500 mb-3 sm:mb-4">CSE Student · Full Stack Developer</p>
                        <div className="space-y-1.5 sm:space-y-2 text-left">
                          {[["Education", "B.E CSE"], ["University", "BMS College"], ["Year", "2024 - 2028"], ["Projects", "3+"]].map(([l, v]) => (
                            <div key={l} className="flex justify-between text-[11px] sm:text-xs py-1 border-b border-slate-200 last:border-0">
                              <span className="text-slate-500">{l}</span>
                              <span className="text-slate-700 font-medium">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditModal section="resume" open={editOpen} onClose={() => setEditOpen(false)} />
    </SectionWrapper>
  );
}
