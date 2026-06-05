import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart, FiArrowUp } from "react-icons/fi";

const socialLinks = [
  { icon: FiGithub, href: "https://github.com/chaithu-gif", label: "GitHub" },
  { icon: FiLinkedin, href: "https://linkedin.com/in/chaithanyadk", label: "LinkedIn" },
  { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FiMail, href: "mailto:chaithanyadk.07@gmail.com", label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="text-center sm:text-left">
            <a href="#hero" className="text-lg font-bold gradient-text">
              Chaithanya<span className="text-slate-300">DK</span>
            </a>
            <p className="text-xs text-slate-500 mt-1">CSE Student & Full Stack Developer</p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                aria-label={link.label}>
                <link.icon size={14} />
              </a>
            ))}
            <a href="#hero"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg gradient-bg flex items-center justify-center text-white hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 ml-1"
              aria-label="Scroll to top">
              <FiArrowUp size={14} />
            </a>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-200 text-center">
          <p className="text-[11px] sm:text-xs text-slate-500 flex items-center justify-center gap-1 flex-wrap">
            &copy; {year} Chaithanya D K. Crafted with <FiHeart className="text-red-500" /> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
