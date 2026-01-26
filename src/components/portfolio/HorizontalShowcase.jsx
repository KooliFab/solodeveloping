import React, { useEffect, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import gsap from 'gsap';

/**
 * Horizontal scrolling project showcase
 * Inspired by The Brink Agency's horizontal scroll sections
 */
const HorizontalShowcase = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  // Ensure track starts at x:0 immediately on mount
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = 'translate3d(0px, 0px, 0px)';
    }
  }, []);

  const projects = [
    {
      id: 1,
      title: 'AI Document Processor',
      category: 'AI/Automation',
      year: '2024',
      description: 'Reduced manual review from 4 hours to 15 minutes with 98% accuracy using advanced AI processing',
      tags: ['React', 'Python', 'OpenAI', 'FastAPI'],
      color: 'from-blue-500 to-cyan-500',
      link: '#',
      github: '#'
    },
    {
      id: 2,
      title: 'Mobile E-Commerce Platform',
      category: 'Mobile',
      year: '2024',
      description: 'Increased conversions 40% with streamlined checkout and custom dashboard',
      tags: ['React Native', 'Node.js', 'Stripe', 'MongoDB'],
      color: 'from-purple-500 to-pink-500',
      link: '#',
      github: '#'
    },
    {
      id: 3,
      title: 'Real-Time Analytics',
      category: 'Web App',
      year: '2023',
      description: 'Enterprise platform processing 1M+ events/day with sub-100ms latency',
      tags: ['React', 'WebSocket', 'D3.js', 'PostgreSQL'],
      color: 'from-orange-500 to-red-500',
      link: '#',
      github: '#'
    },
    {
      id: 4,
      title: 'Fitness Tracking App',
      category: 'Mobile',
      year: '2023',
      description: 'Cross-platform fitness app with AI-powered workout recommendations',
      tags: ['React Native', 'TensorFlow', 'Firebase', 'Redux'],
      color: 'from-green-500 to-emerald-500',
      link: '#',
      github: '#'
    },
    {
      id: 5,
      title: 'SaaS Marketing Platform',
      category: 'Web App',
      year: '2024',
      description: 'All-in-one marketing automation platform for SMBs',
      tags: ['Next.js', 'Prisma', 'Tailwind', 'Vercel'],
      color: 'from-yellow-500 to-orange-500',
      link: '#',
      github: '#'
    }
  ];

  useEffect(() => {
    let ctx;
    let lenisReadyListener;

    const initAnimation = async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const track = trackRef.current;

      if (!section || !track) return;

      // Wait for Lenis to be ready (simplified)
      if (!window.lenis) {
        await new Promise((resolve) => {
          lenisReadyListener = () => resolve();
          window.addEventListener('lenis:ready', lenisReadyListener, { once: true });
          setTimeout(resolve, 500); // Reduced fallback timeout
        });
      }

      // Use GSAP context for better cleanup
      ctx = gsap.context(() => {
        // Calculate total scroll width
        const getScrollDistance = () => {
          const trackWidth = track.scrollWidth;
          const viewportWidth = window.innerWidth;
          return trackWidth - viewportWidth;
        };

        const scrollDistance = getScrollDistance();

        // Kill any existing tweens on track first
        gsap.killTweensOf(track);

        // Set initial position explicitly
        gsap.set(track, {
          x: 0,
          force3D: true,
          clearProps: 'all' // Clear any previous GSAP properties
        });

        // Re-apply the x:0 after clearing
        gsap.set(track, { x: 0, force3D: true });

        // Create horizontal scroll animation with timeline
        gsap.to(track, {
          x: -scrollDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${scrollDistance}`,
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            markers: false, // Disable markers
            scroller: document.body,
            onRefresh: () => {
              // Reset position on refresh
              gsap.set(track, { x: 0, force3D: true });
            }
          }
        });

        // Simplified parallax - only on odd cards for better performance
        const cards = track.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
          if (index % 2 === 0) {
            gsap.to(card, {
              y: -30,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: `+=${scrollDistance}`,
                scrub: 0.5
              }
            });
          }
        });

        // Debounced resize handler
        let resizeTimer;
        const handleResize = () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
          }, 250);
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          if (resizeTimer) clearTimeout(resizeTimer);
        };
      }, section);

      // Single refresh after a brief delay
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    initAnimation();

    return () => {
      if (ctx) ctx.revert();
      if (lenisReadyListener) {
        window.removeEventListener('lenis:ready', lenisReadyListener);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background/50"
      style={{ minHeight: '100vh' }}
    >
      {/* Section header - fixed */}
      <div className="absolute top-8 left-8 z-20">
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold font-display text-foreground/10">
          Projects
        </h2>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex items-center gap-12 px-[5vw] py-20"
        style={{
          width: 'max-content',
          height: '100vh',
          transform: 'translate3d(0px, 0px, 0px)',
          willChange: 'transform'
        }}
      >
        {/* Intro card */}
        <div className="flex-shrink-0 w-[85vw] md:w-[40vw] md:min-w-[400px] h-[75vh] md:h-[60vh] flex flex-col justify-center">
          <h3 className="text-5xl md:text-6xl font-bold font-display mb-6 leading-tight">
            Featured
            <br />
            <span className="bg-gradient-to-r from-electric-400 to-electric-600 bg-clip-text text-transparent">
              Work
            </span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
            A curated selection of projects that showcase technical excellence and business impact.
          </p>
        </div>

        {/* Project cards */}
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-card flex-shrink-0 w-[85vw] md:w-[45vw] md:min-w-[500px] h-[75vh] md:h-[60vh] group cursor-pointer"
          >
            <div className="relative h-full rounded-3xl overflow-hidden border border-electric-500/20 bg-card/50 backdrop-blur-sm hover:border-electric-500/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]">
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
              />

              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:4rem_4rem]" />

              {/* Content */}
              <div className="relative h-full p-12 flex flex-col justify-between">
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-sm font-mono text-electric-500 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-sm font-mono text-muted-foreground">
                      {project.year}
                    </span>
                  </div>

                  <h4 className="text-4xl font-bold font-display mb-6 group-hover:text-electric-500 transition-colors duration-300">
                    {project.title}
                  </h4>

                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 text-sm bg-electric-500/10 text-electric-500 rounded-full font-mono border border-electric-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-6">
                  {project.github && (
                    <a
                      href={project.github}
                      className="flex items-center gap-2 text-foreground hover:text-electric-500 transition-colors group/link"
                    >
                      <Github className="w-5 h-5" />
                      <span className="text-sm font-medium">View Code</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                  )}
                  <a
                    href={project.link}
                    className="flex items-center gap-2 text-foreground hover:text-electric-500 transition-colors group/link"
                  >
                    <span className="text-sm font-medium">Live Demo</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Number indicator */}
                <div className="absolute top-12 right-12 text-8xl font-bold text-electric-500/10 font-display">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-electric-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>
        ))}

        {/* End card - CTA */}
        <div className="flex-shrink-0 w-[85vw] md:w-[40vw] md:min-w-[400px] h-[85vh] md:h-[70vh] flex flex-col justify-center items-center text-center px-8">
          <h3 className="text-5xl md:text-6xl font-bold font-display mb-6">
            Want to see
            <br />
            <span className="text-electric-500">more?</span>
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-md">
            These are just highlights. Let's discuss your project.
          </p>
          <button className="px-8 py-4 bg-electric-500 hover:bg-electric-600 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Get in Touch
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-8 text-muted-foreground font-mono text-sm flex items-center gap-3">
        <span>DRAG TO SCROLL</span>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </section>
  );
};

export default HorizontalShowcase;
