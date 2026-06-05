import { useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiSearch, FiEdit2 } from "react-icons/fi";
import SectionWrapper from "./SectionWrapper";
import ProjectModal from "./ProjectModal";
import EditModal from "./EditModal";
import { useApp } from "../context/AppContext";

const categories = ["all", "frontend", "fullstack"];

export default function Projects() {
  const { data, admin } = useApp();
  const projects = data.projects;
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <SectionWrapper id="projects" className="py-16 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 relative">
          {admin && (
            <button onClick={() => setEditOpen(true)}
              className="absolute -top-4 right-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-all">
              <FiEdit2 size={12} /> Edit Projects
            </button>
          )}
          <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-3">My Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Featured <span className="gradient-text">Projects</span></h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-xl capitalize transition-all duration-300 ${
                activeFilter === cat
                  ? "gradient-bg text-white shadow-lg shadow-primary/20"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary/30"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <FiSearch size={40} className="mx-auto text-slate-300 mb-4" />
            <p className="text-sm text-slate-400">No projects in this category yet.</p>
          </div>
        ) : (
          <motion.div key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((project, i) => (
              <motion.div key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="card overflow-hidden group cursor-pointer"
                onClick={() => setSelectedProject(project)}>
                <div className="h-36 sm:h-44 gradient-bg flex items-center justify-center relative overflow-hidden">
                  <span className="text-5xl font-bold text-white/20 select-none">{project.image}</span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                      className="p-2.5 bg-white/90 rounded-full text-slate-800 hover:bg-white transition-all">
                      <FiGithub size={18} />
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                      className="p-2.5 bg-white/90 rounded-full text-slate-800 hover:bg-white transition-all">
                      <FiExternalLink size={18} />
                    </a>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1.5">{project.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mb-3 line-clamp-2 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary">{t}</span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-slate-100 text-slate-400">+{project.tech.length - 4}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <EditModal section="projects" open={editOpen} onClose={() => setEditOpen(false)} />
    </SectionWrapper>
  );
}
