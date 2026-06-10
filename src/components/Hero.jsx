import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail, FiMapPin, FiCalendar, FiEdit2 } from "react-icons/fi";
import AnimatedCounter from "./AnimatedCounter";
import EditModal from "./EditModal";
import { useApp } from "../context/AppContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero() {
  const { data, admin } = useApp();
  const hero = data.hero;
  const [editOpen, setEditOpen] = useState(false);

const profileImg = hero.profileImage;
  return (
    <section id="hero" className="relative min-h-dvh flex items-center overflow-hidden pt-14">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] animate-float-slow" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-[150px] animate-pulse-glow" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
        

        <motion.div variants={containerVariants} initial="hidden" animate="visible"
className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-10 lg:gap-20">          <div className="flex-1 text-center lg:text-left">
            <motion.p variants={itemVariants}
              className="text-primary font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">
              {hero.tagline}
            </motion.p>

            <motion.h1
  variants={itemVariants}
  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900"
>
Hi, I'm
<br />
<span className="gradient-text">{hero.name}</span></motion.h1>

<motion.h2
  variants={itemVariants}
  className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-500 mt-3 mb-6"
>
  {hero.subtitle}
</motion.h2>

            <motion.p variants={itemVariants}
              className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              {hero.bio}
            </motion.p>

            <motion.div variants={itemVariants}
              className="flex flex-wrap items-center gap-3 sm:gap-4 justify-center lg:justify-start mb-8">
              <a href="#projects" className="btn-primary text-sm sm:text-base">View Projects <FiArrowRight /></a>
              <a href="#contact" className="btn-outline text-sm sm:text-base">Contact Me</a>
<a
  href={hero.resumeUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="btn-outline text-sm sm:text-base"
>
  <FiDownload /> Resume
</a>            </motion.div>

            <motion.div variants={itemVariants}
              className="flex flex-wrap items-center gap-4 sm:gap-6 justify-center lg:justify-start text-xs sm:text-sm text-slate-500 mb-6">
              <span className="flex items-center gap-1.5"><FiMapPin className="text-primary" size={14} /> Bangalore, India</span>
              <span className="flex items-center gap-1.5"><FiCalendar className="text-primary" size={14} /> B.E CSE · 2024-2028</span>
            </motion.div>

            

            <motion.div variants={itemVariants}
              className="flex flex-wrap items-center gap-6 sm:gap-10 mt-8 justify-center lg:justify-start">
              {hero.highlights.map((h) => (
                <div key={h.label} className="text-center">
                  <div className="block mt-6 text-xl sm:text-2xl font-semibold text-slate-500">
                    <AnimatedCounter end={h.value} suffix={h.suffix} />
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 uppercase tracking-wider">{h.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex-shrink-0">
            <div className="relative group">
              <div className="w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full gradient-bg p-1 animate-breathe">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  {profileImg ? (
                    <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <span className="text-5xl sm:text-6xl lg:text-7xl font-bold gradient-text">{hero.name.charAt(0)}</span>
                    </div>
                  )}
                  {admin && (
                    <label className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-all duration-300 cursor-pointer rounded-full">
                      <input type="file" accept="image/*" className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              const url = ev.target.result;
                              localStorage.setItem("profileImage", url);
                              window.location.reload();
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-3 py-1.5 rounded-lg pointer-events-none">
                        Change Photo
                      </span>
                    </label>
                  )}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl gradient-bg-alt flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg shadow-accent/25 animate-float">
                Tech Enthusiast
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <EditModal section="hero" open={editOpen} onClose={() => setEditOpen(false)} />
    </section>
  );
}
