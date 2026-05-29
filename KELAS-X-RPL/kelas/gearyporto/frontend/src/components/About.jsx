import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code2, Cpu, Rocket, GraduationCap, Sparkles } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Award className="text-neon-blue" size={24} />, value: "X", label: "Kelas" },
    { icon: <Rocket className="text-neon-purple" size={24} />, value: "RPL", label: "Jurusan" },
    { icon: <Cpu className="text-neon-cyan" size={24} />, value: "100%", label: "Semangat Belajar" },
  ];

  const skillCategories = [
    {
      title: "Frontend Engineering",
      color: "border-neon-blue/30 hover:border-neon-blue text-neon-blue",
      skills: ["React", "JavaScript (ES6+)", "Tailwind CSS", "Framer Motion", "HTML/CSS"]
    },
    {
      title: "Backend & Systems",
      color: "border-neon-purple/30 hover:border-neon-purple text-neon-purple",
      skills: ["Node.js", "Express.js", "PHP", "Laravel", "MySQL", "SQLite"]
    },
    {
      title: "Tools & Soft Skills",
      color: "border-neon-cyan/30 hover:border-neon-cyan text-neon-cyan",
      skills: ["Git & GitHub", "Problem Solving", "Desain UI/UX", "Kerja Tim", "AI Prompting"]
    }
  ];

  const educations = [
    {
      school: "Sekolah Menengah Kejuruan (SMK)",
      major: "Rekayasa Perangkat Lunak (RPL)",
      period: "Saat ini (Kelas X)",
      description: "Sedang mempelajari dasar-dasar pemrograman, pengembangan web modern (Frontend & Backend), desain UI/UX, dan basis data SQL.",
      color: "bg-neon-blue",
      borderColor: "border-neon-blue",
      textColor: "text-neon-blue"
    },
    {
      school: "Sekolah Menengah Pertama (SMP)",
      major: "Siswa",
      period: "Lulus",
      description: "Menyelesaikan pendidikan dasar dengan baik dan mulai mengeksplorasi minat dalam bidang teknologi dan komputer.",
      color: "bg-gray-600",
      borderColor: "border-gray-600",
      textColor: "text-gray-400"
    }
  ];

  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden border-t border-white/5">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-neon-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            BIODATA <span className="text-gradient">GEARY</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Bio & Education Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-7 space-y-10"
          >
            {/* Bio Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Hai, Saya Geary (X-RPL)
              </h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Saya adalah pelajar jurusan Rekayasa Perangkat Lunak (RPL) kelas X yang sangat antusias dalam mempelajari web development dan desain website modern.
                Website ini dibuat sebagai sebuah portofolio, tempat saya bereksperimen, media belajar, serta bentuk nyata dari eksplorasi teknologi frontend maupun backend saya.
              </p>
              
              {/* Statistics */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all text-center">
                    <div className="flex justify-center mb-2">{stat.icon}</div>
                    <div className="text-2xl md:text-3xl font-black text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400 mt-1 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education History */}
            <div className="space-y-6 pt-4">
              <h3 className="text-xl font-extrabold text-white uppercase tracking-wider flex items-center gap-2 mb-6">
                <GraduationCap className="text-neon-purple" size={24} />
                Riwayat Pendidikan
              </h3>
              
              <div className="relative border-l-2 border-white/10 pl-8 ml-3 space-y-8">
                {educations.map((edu, idx) => (
                  <div key={idx} className="relative">
                    {/* Timeline Dot */}
                    <div className={`absolute -left-[41px] top-1.5 w-4 h-4 rounded-full border-4 border-[#0a0a0a] ${edu.color}`} />
                    
                    <h4 className="text-lg font-bold text-white">{edu.school}</h4>
                    <p className={`text-sm font-mono mb-2 ${edu.textColor}`}>{edu.major} • {edu.period}</p>
                    <p className="text-sm text-gray-400 leading-relaxed font-light">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills Grid Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-5 space-y-6 sticky top-24"
          >
            <h3 className="text-xl font-extrabold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
              <Sparkles className="text-neon-cyan" size={20} />
              Keterampilan & Skill
            </h3>

            <div className="space-y-4">
              {skillCategories.map((category, catIdx) => (
                <div
                  key={catIdx}
                  className={`glass-panel p-5 rounded-2xl border transition-all duration-300 ${category.color}`}
                >
                  <h4 className="text-md font-bold mb-3 text-white">{category.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIdx) => (
                      <span
                        key={skillIdx}
                        className="text-xs bg-white/5 border border-white/10 hover:border-white/20 text-gray-300 px-3 py-1.5 rounded-full font-mono transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
