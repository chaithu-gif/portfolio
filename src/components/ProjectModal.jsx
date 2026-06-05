import { FiX, FiGithub, FiExternalLink, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white dark:bg-dark-2 shadow-2xl border border-slate-200 dark:border-slate-700"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-dark-3/80 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-dark-3 transition-all"
          >
            <FiX size={18} />
          </button>

          <div className={`h-48 sm:h-56 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
            <span className="text-6xl sm:text-7xl font-bold text-white/20 select-none">
              {project.image}
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              {project.description}
            </p>

            {(project.challenges || project.outcome) && (
              <div className="space-y-4 mb-6">
                {project.challenges && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Challenges</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{project.challenges}</p>
                  </div>
                )}
                {project.outcome && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Outcome</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{project.outcome}</p>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                <FiGithub size={16} /> View Code
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-sm"
              >
                <FiExternalLink size={16} /> Live Demo
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
