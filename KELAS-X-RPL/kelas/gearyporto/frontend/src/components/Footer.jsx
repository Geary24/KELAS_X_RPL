import { ArrowUp } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <GithubIcon size={18} />, href: 'https://github.com/Geary24', label: 'GitHub' }
  ];

  return (
    <footer className="relative bg-dark-bg border-t border-white/5 py-12 px-4">
      {/* Decorative accent neon dividing line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">

        {/* Brand logo */}
        <div className="text-center md:text-left">
          <div className="text-lg font-black tracking-tighter mb-1 select-none">
            <span className="text-white">ANTI</span>
            <span className="text-neon-blue">GRAVITY</span>
          </div>
          <p className="text-xs text-gray-500 font-mono">
            &copy; {new Date().getFullYear()} GearyPorto. All rights reserved.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 items-center">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              aria-label={social.label}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300 hover:scale-110"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Scroll back to top */}
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-neon-blue flex items-center justify-center text-gray-400 hover:text-neon-blue transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          title="Kembali ke Atas"
        >
          <ArrowUp size={18} />
        </button>

      </div>
    </footer>
  );
};

export default Footer;
