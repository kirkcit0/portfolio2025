import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Github, Linkedin, FileText, Code } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [photoIndex, setPhotoIndex] = useState(0);
  const [ripples, setRipples] = useState([]);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);
  const [nameTyped, setNameTyped] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const Resume = "Resume.pdf"
  
  const photos = [
    { icon: "kirks/kirk1.png", label: "Photo 1" },
    { icon: "kirks/kirk2.png", label: "Photo 2" },
    { icon: "kirks/kirk3.png", label: "Photo 3" },
    { icon: "kirks/BENJI.png", label: "Photo 4" },
    { icon: "kirks/silly1.JPEG", label: "Photo 5" },
    { icon: "kirks/silly2.png", label: "Photo 6" },
    { icon: "kirks/silly3.png", label: "Photo 7" },
  ];

  const titles = [
    "AI Engineer",
    "ML Engineer",
    "Software Engineer",
    "Problem Solver",
    "Home-Labber",
    "Liflong Learner",
    "Chess Enjoyer",
    "Tennis Player",
    "Star Wars Lover",
    "Piano Learner",
    "Aspiring Polymath",
    "Big Reader",
    "LEGO Builder",
    "Gamer",
    "Silly Goober",
  ];

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Show navbar when mouse near top
      if (e.clientY < 100) {
        setNavVisible(true);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typing animation for name
  useEffect(() => {
    const timer = setTimeout(() => {
      setNameTyped(true);
      // Show rest of content after name finishes typing
      setTimeout(() => setShowContent(true), 100);
    }, 2000); // Adjust timing for typing speed
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll for navbar visibility and active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Detect active section
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = currentScrollY + 200; // offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Create ripple effect on click
  const createRipple = (e) => {
    const newRipple = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now()
    };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
  };

  useEffect(() => {
    const handleClick = (e) => createRipple(e);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const cyclePhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const cycleTitle = () => {
    setTitleIndex((prev) => (prev + 1) % titles.length);
  };

  const projects = [
    {
      title: "HTTX: HoloTableTop Exercise",
      description: "Developed an immersive Unity holographic training simulation for emergency responders. Engineered a dynamic phase system for instructor-led scenario control, developed NPC pathfinding, ported to Android tablets, and integrated multiplayer networking to train 6+ participants in coordinated crisis response.",
      tech: ["Unity", "C#", "Mirror", "Android SDK"],
      link: "https://github.com/HagenFarrell/HospitalScenario"
    },
    {
      title: "ShelfSense AI",
      description: "Designed a smart pantry app using Gemini & Llama LLMs to generate recipes from ingredients with perfect accuracy. Engineered the full-stack architecture with Next.js and Firebase, automated Vercel deployments, and collaborated with experts to significantly boost UX and satisfaction.",
      tech: ["Next.JS", "Firebase", "Gemini", "Llama", "Material-UI"],
      link: "https://github.com/kirkcit0/Pantry-Tracker"
    },
    {
      title: "Beca María Mercedes Pagán Scholarship Website",
      description: "Led end-to-end design and development of a responsive, brand-aligned scholarship portal for Puerto Rican students. Built a performant frontend with HTML/CSS/JS and a secure PHP backend to streamline application submission and eligibility verification.",
      tech: ["HTML/CSS", "JavaScript", "PHP", "Stripe", "Paypal"],
      link: "https://github.com/kirkcit0/Pagan"
    },
    {
      title: "Bucc-ee-Buddy (Mobile App)",
      description: "Developed a cross-platform Flutter mobile app integrated with a MERN backend. Empowered users to track visits, log purchases, and explore locations on an interactive map, complementing the existing web application.",
      tech: ["MongoDB", "Flutter", "Google Maps API"],
      link: "https://github.com/kirkcit0/BucceeBuddy"
    },
    {
      title: "Bucc-ee-Buddy (Web App)",
      description: "Co-developed a full-stack MERN web application for users to track their visits and spending at Buc-ee’s locations across the US, featuring an interactive map and purchase logging.",
      tech: ["MongoDB", "Express.JS", "React.JS", "Node.JS"],
      link: "https://github.com/Forrest-Gillette/Large-Project-COP4331"
    },
    {
      title: "Virtual Machine Project",
      description: "Co-Engineered a C-based virtual stack machine ecosystem, including a lexer for command tokenization and a code generator that translated high-level logic into executable PL/0 instructions, demonstrating mastery of system architecture and low-level programming.",
      tech: ["C"],
      link: "https://github.com/kirkcit0/Stack-VM"
    }
  ];

  const experiences = [
    {
      role: "AI/ML Engineer",
      company: "Southern Glazer's Wine & Spirits",
      period: "July 2025 - Present",
      description: "Developing & maintaining several AI Agents to ease workload of key stakeholders, maximizing delivered value. Maintaining key Forecasting ML Model pipelines.",
      logo: "logos/sgws.png",
      rounded: true,
      skills: ["Python", "LangChain", "Streamlit", "Databricks", "AWS Bedrock", "Git"]
    },
    {
      role: "Enterprise Quality Intern",
      company: "Johnson & Johnson",
      period: "May 2024 - Aug 2024",
      description: "Designed & began development of all-in-one platform for the team's collection of flagship products. Conducted comprehensive data analysis to determine the impact of a newly developed supplier technical assement technique. Integrated AI tooling to enhance the primary data management system. for users.",
      logo: "logos/jnj.png",
      rounded: true,
      skills: ["MySQL", "Azure DataBricks", "Tableau", "PowerBI", "React", "Figma"]
    },
    {
      role: "Software Engineering Intern",
      company: "Limbitless Solutions",
      period: "May 2023 - Dec 2023",
      description: "Led website design, Flutter app overhauls, and cross-platform AI integrations. Boosted AR mapping and robotic arm app performance with 3D features, and drove agile, cross-functional projects to enhance both technical outcomes and team workflows.",
      logo: "logos/limbitless.png",
      rounded: true,
      skills: [ "TensorFLow", "Flutter", "HTML/CSS", "JavaScript", "Apple Vision", "Swift"]
    }
  ];

  const FloatingOrb = ({ delay, duration, size, left, top }) => (
    <div
      className="absolute rounded-full opacity-20 blur-3xl pointer-events-none"
      style={{
        width: size,
        height: size,
        background: 'radial-gradient(circle, rgba(251,191,36,0.4) 0%, rgba(245,158,11,0.1) 100%)',
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        left: left,
        top: top,
      }}
    />
  );

  const CurrentPhoto = photos[photoIndex].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden relative">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -30px) rotate(90deg); }
          50% { transform: translate(-20px, 20px) rotate(180deg); }
          75% { transform: translate(40px, 10px) rotate(270deg); }
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink {
          50% {
            border-color: transparent;
          }
        }

        @keyframes fadeInSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideRight {
          from {
            transform: scaleX(0);
            transform-origin: left;
          }
          to {
            transform: scaleX(1);
            transform-origin: left;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .typing-container {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 3px solid #fbbf24;
          animation: typing 1.5s steps(13) forwards, blink 0.75s step-end infinite;
          transition: transform 0.8s ease-out;
        }

        .typing-container.done {
          border-right: none;
          animation: none;
        }

        .name-shift {
          transform: translateX(-50%);
        }

        .fade-in-slide-up {
          animation: fadeInSlideUp 0.8s ease-out forwards;
        }

        .fade-in-slide-up-delay-1 {
          animation: fadeInSlideUp 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }

        .fade-in-slide-up-delay-2 {
          animation: fadeInSlideUp 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }

        .title-clickable {
          position: relative;
          cursor: pointer;
        }

        .title-clickable::after {
          content: '↻';
          position: absolute;
          right: -1.5rem;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
          font-size: 0.8em;
        }

        .title-clickable:hover::after {
          opacity: 0.7;
          transform: translateY(-50%) rotate(180deg);
        }

        .nav-item {
          position: relative;
          padding: 0.5rem 1rem;
        }

        .nav-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #fbbf24;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease-out;
          z-index: -1;
        }

        .nav-item:hover::before {
          transform: scaleX(1);
        }

        .nav-item:hover {
          color: black;
        }

        .custom-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
        }

        .cursor-dot {
          width: 8px;
          height: 8px;
          background: #fbbf24;
          border-radius: 50%;
          transition: transform 0.15s ease;
        }

        .cursor-outline {
          width: 40px;
          height: 40px;
          background: #fbbf24;
          opacity: 0.3;
          border-radius: 50%;
          transition: all 0.15s ease;
        }

        .cursor-hover .cursor-outline {
          width: 60px;
          height: 60px;
          opacity: 0.5;
        }

        .cursor-click .cursor-dot {
          transform: scale(1.5);
        }

        .click-shrink:active {
          transform: scale(0.95) !important;
        }

        * {
          cursor: none !important;
        }

        .ripple {
          position: fixed;
          border: 2px solid #fbbf24;
          border-radius: 50%;
          pointer-events: none;
          animation: ripple 1s ease-out;
          z-index: 9998;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
          .custom-cursor {
            display: none;
          }
        }
      `}</style>

      {/* Custom Cursor */}
      <div className="custom-cursor hidden md:block">
        <div
          className={`cursor-outline ${cursorVariant === 'hover' ? 'cursor-hover' : ''}`}
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            position: 'fixed'
          }}
        />
        <div
          className="cursor-dot cursor-click"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            position: 'fixed'
          }}
        />
      </div>

      {/* Click Ripples */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="ripple"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Floating Orbs */}
      <FloatingOrb delay={0} duration={40} size="400px" left="10%" top="20%" />
      <FloatingOrb delay={5} duration={45} size="300px" left="70%" top="60%" />
      <FloatingOrb delay={10} duration={50} size="500px" left="40%" top="80%" />
      <FloatingOrb delay={15} duration={55} size="350px" left="80%" top="10%" />

      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full bg-black/80 backdrop-blur-sm z-50 border-b border-amber-500/20 transition-transform duration-300 ${
          navVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent hover:scale-110 transition-transform cursor-pointer"
              onClick={() => scrollToSection('home')}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              Kirk
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-2">
              {['home', 'about', 'experience', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className={`nav-item capitalize transition-all ${
                    activeSection === section ? 'text-amber-400 font-bold' : ''
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-amber-400 hover:scale-110 transition-transform"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-amber-500/20">
            <div className="px-4 py-4 space-y-4">
              {['home', 'about', 'experience', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left capitalize hover:text-amber-400 transition-colors py-2 ${
                    activeSection === section ? 'text-amber-400 font-bold' : ''
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 flex flex-col items-center md:items-start animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-center md:text-left w-full">
              <span className={`text-white inline-block ${nameTyped ? 'typing-container done' : 'typing-container'}`}>
                Kirk Lefevre
              </span>
              <br />
              {showContent && (
                <button
                  onClick={cycleTitle}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="title-clickable bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 bg-clip-text text-transparent hover:from-amber-300 hover:via-yellow-300 hover:to-amber-200 hover:scale-105 inline-block text-center md:text-left whitespace-nowrap opacity-0 animate-[fadeIn_0.5s_ease-out_0.1s_forwards] active:scale-95 transition-transform duration-200"
                >
                  {titles[titleIndex]}
                </button>
              )}
            </h1>
            {showContent && (
              <>
                <p className="text-xl text-gray-300 text-center md:text-left fade-in-slide-up-delay-1">
                  Recent CS Grad developing lightweight AI tools to increase efficiency, accuracy, and value.
                </p>
                <div className="flex space-x-4 fade-in-slide-up-delay-2">
                  <button
                    onClick={() => scrollToSection('contact')}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="click-shrink bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:from-amber-400 hover:to-yellow-400 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50"
                  >
                    Get in Touch
                  </button>
                  <button
                    onClick={() => scrollToSection('projects')}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="click-shrink border-2 border-amber-500 text-amber-400 px-8 py-3 rounded-lg font-semibold hover:bg-amber-500 hover:text-black transition-all hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50"
                  >
                    View Work
                  </button>
                </div>
              </>
            )}
          </div>
          {showContent && (
            <div className="flex justify-center fade-in-slide-up">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full blur-2xl opacity-30 transition-opacity"></div>
                <button
                  onClick={cyclePhoto}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="click-shrink relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-amber-500/50 hover:border-amber-400 transition-all hover:scale-105 hover:rotate-3"
                >
                  <div className="w-full h-full bg-gradient-to-br from-amber-900 to-gray-800 flex items-center justify-center transition-all">
                  <img 
                    src={CurrentPhoto} 
                    alt="Kirk Lefevre"
                    className="w-full h-full object-cover"
                  />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="bg-gradient-to-br from-gray-800/50 to-black/50 p-8 md:p-12 rounded-2xl border border-amber-500/20 backdrop-blur-sm">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              A lifelong enthusiast of technological innovation, my family has known me as the "computer guy" since before I could form proper sentences. Now, I spend my time teaching machines how to learn!
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Naturally, this took me to the University of Central Florida, where I obtained my Bachelor's degree in Computer Science with a minor in Math, as well as some great experiences from several amazing clubs and hackathons!
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Forever a fan of anything that challenges me, I've built software in full-stack, AI/ML, operating systems, networking, game dev, and more. While I've found love in AI & Data, I'm eager to see where my passion & curiosity takes me.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {['Python', 'Langchain', 'PyTorch', 'Pandas', 
              'TypeScript', 'MongoDB/SQL', 'Git', 'React', 
              'Unity', 'C#', 'Java', 'HTML/CSS'].map((skill, i) => (
                <div 
                  key={skill} 
                  className="bg-black/40 px-4 py-3 rounded-lg text-center border border-amber-500/20"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span className="text-amber-400">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/50 to-black/50 p-6 md:p-8 rounded-2xl border border-amber-500/20 backdrop-blur-sm hover:border-amber-500/40 transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Company Logo */}
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 md:w-24 md:h-24 overflow-hidden flex items-center justify-center p-3 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 bg-black/30 ${
                      exp.rounded ? 'rounded-full' : 'rounded-xl'
                    }`}>
                      <img 
                        src={exp.logo} 
                        alt={`${exp.company} logo`}
                        className={`w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity ${
                          exp.rounded ? 'rounded-full' : 'rounded-xl'
                        }`}
                        // onError={(e) => {
                        //   e.target.onerror = null;
                        //   e.target.src = "https://via.placeholder.com/100/374151/ffffff?text=" + exp.company.charAt(0);
                        //   e.target.className = "w-full h-full object-contain opacity-70";
                        // }}
                      />
                    </div>
                  </div>
                  
                  {/* Experience Details */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-amber-400 mb-1 group-hover:text-amber-300 transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2">
                          <p className="text-lg text-gray-300 font-medium">{exp.company}</p>
                          <span className="text-amber-500/60 hidden md:inline">•</span>
                          <span className="text-gray-400 text-sm md:text-base bg-black/30 px-2 py-1 rounded">
                            {exp.period}
                          </span>
                        </div>
                      </div>
                      <span className="text-gray-400 mt-2 md:mt-0 md:text-right hidden md:block bg-black/30 px-3 py-1 rounded-lg border border-amber-500/10">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-6">{exp.description}</p>
                    
                    {/* Skills used at this role */}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-amber-500/10">
                        {exp.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="bg-black/40 px-3 py-1 rounded-full text-sm text-amber-400 border border-amber-500/20 hover:border-amber-500/40 hover:bg-black/60 transition-all"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/50 to-black/50 p-6 rounded-2xl border border-amber-500/20 backdrop-blur-sm group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Code className="text-amber-400 transition-transform" size={32} />
                  <a
                    href={project.link}
                    target="_blank"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="click-shrink text-amber-400 hover:text-yellow-400 transition-all hover:scale-125 hover:rotate-12 inline-block"
                  >
                    <Github size={24} />
                  </a>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-black/40 px-3 py-1 rounded-full text-sm text-amber-400 border border-amber-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            I'm always open to new opportunities and interesting projects. Feel free to reach out!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
            <a
              href="mailto:lefevrekirk@gmail.com"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="click-shrink flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-8 py-4 rounded-lg font-semibold hover:from-amber-400 hover:to-yellow-400 transition-all w-full sm:w-auto justify-center hover:scale-110 hover:shadow-2xl hover:shadow-amber-500/50"
            >
              <Mail size={20} />
              <span>Email Me</span>
            </a>
            <a
              href={Resume}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="click-shrink flex items-center space-x-2 border-2 border-amber-500 text-amber-400 px-8 py-4 rounded-lg font-semibold hover:bg-amber-500 hover:text-black transition-all w-full sm:w-auto justify-center hover:scale-110 hover:shadow-2xl hover:shadow-amber-500/50"
            >
              <FileText size={20} />
              <span>View Resume</span>
            </a>
          </div>
          <div className="flex justify-center space-x-8">
            <a 
              href="https://github.com/kirkcit0" 
              target="_blank"
              className="click-shrink text-amber-400 hover:text-yellow-400 transition-all hover:scale-125 hover:rotate-12 inline-block"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <Github size={32} />
            </a>
            <a 
              href="https://www.linkedin.com/in/kirklefevre/" 
              target="_blank"
              className="click-shrink text-amber-400 hover:text-yellow-400 transition-all hover:scale-125 hover:rotate-12 inline-block"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <Linkedin size={32} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-500/20 py-8 text-center text-gray-400">
        <p>© 2026 Kirk Lefevre. Built with React and Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default Portfolio;