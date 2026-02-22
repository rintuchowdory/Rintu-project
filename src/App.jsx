import { useEffect, useRef, useState } from "react";
import "./App.css";
export default function App() {
  const canvasRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const playingRef = useRef(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, particles = [], animId;
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener("resize", resize);
    class Particle {
      reset() { this.x=Math.random()*W; this.y=Math.random()*H; this.size=Math.random()*1.5+0.3; this.speedX=(Math.random()-0.5)*0.3; this.speedY=-Math.random()*0.4-0.1; this.opacity=Math.random()*0.4+0.1; this.life=0; this.maxLife=Math.random()*300+200; this.color=Math.random()>0.7?"212,168,83":"79,195,247"; }
      constructor() { this.reset(); this.life=Math.random()*this.maxLife; }
      update() { this.x+=this.speedX; this.y+=this.speedY; this.life++; if(this.life>this.maxLife||this.y<0) this.reset(); }
      draw() { const a=this.opacity*(1-this.life/this.maxLife); ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fillStyle=`rgba(${this.color},${a})`; ctx.fill(); }
    }
    for(let i=0;i<120;i++) particles.push(new Particle());
    function loop() { ctx.clearRect(0,0,W,H); particles.forEach(p=>{p.update();p.draw();}); animId=requestAnimationFrame(loop); }
    loop();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize",resize); };
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      function animCount(id,target,suffix) { const el=document.getElementById(id); if(!el)return; let v=0,step=target/120; const t=setInterval(()=>{v=Math.min(v+step,target);el.textContent=Math.floor(v)+suffix;if(v>=target)clearInterval(t);},16); }
      animCount("count1",50,"+"); animCount("count2",100,"%");
    }, 1200);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const obs = new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible");});},{threshold:0.1});
    document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    const cursor=document.getElementById("cursor"); const ring=document.getElementById("cursor-ring");
    let mx=0,my=0,rx=0,ry=0,animId;
    const move=e=>{mx=e.clientX;my=e.clientY;if(cursor)cursor.style.transform=`translate(${mx-6}px,${my-6}px)`;};
    document.addEventListener("mousemove",move);
    function animRing(){rx+=(mx-rx-18)*0.12;ry+=(my-ry-18)*0.12;if(ring)ring.style.transform=`translate(${rx}px,${ry}px)`;animId=requestAnimationFrame(animRing);}
    animRing();
    return ()=>{document.removeEventListener("mousemove",move);cancelAnimationFrame(animId);};
  }, []);
  useEffect(() => {
    const onScroll=()=>{const nav=document.querySelector("nav");if(nav)nav.style.background=window.scrollY>50?"rgba(5,8,16,0.95)":"rgba(5,8,16,0.6)";};
    window.addEventListener("scroll",onScroll);
    return ()=>window.removeEventListener("scroll",onScroll);
  }, []);
  function toggleAudio() {
    const next=!playing; setPlaying(next); playingRef.current=next;
    if(next){
      if(!audioCtxRef.current) audioCtxRef.current=new(window.AudioContext||window.webkitAudioContext)();
      const actx=audioCtxRef.current; const notes=[110,138.6,165,220,261.6];
      function playNote(freq,delay,dur){const osc=actx.createOscillator();const gain=actx.createGain();const filter=actx.createBiquadFilter();filter.type="lowpass";filter.frequency.value=800;osc.type="sine";osc.frequency.value=freq;osc.connect(filter);filter.connect(gain);gain.connect(actx.destination);const t=actx.currentTime+delay;gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(0.04,t+0.5);gain.gain.linearRampToValueAtTime(0,t+dur);osc.start(t);osc.stop(t+dur+0.1);}
      function loop(){if(!playingRef.current)return;notes.forEach((n,i)=>playNote(n,i*1.5,4));setTimeout(loop,notes.length*1500+2000);}
      loop();
    }
  }
  const skills=["React","TypeScript","Node.js","Python","Docker","Kubernetes","PostgreSQL","Redis","GitHub Actions","AWS","Nginx","Linux"];
  const techs=["React","Node.js","Docker","GitHub Actions","PostgreSQL","Tailwind CSS","TypeScript","AWS","Redis","Nginx"];
  const projects=[{num:"02",title:"Current Weather App",desc:"Real-time weather dashboard with geolocation and 7-day forecast.",tags:["React","REST API","Vite"]},{num:"03",title:"Openclow Platform",desc:"Full-stack Next.js app with SSR, auth, and database integration.",tags:["Next.js","PostgreSQL","Tailwind"]},{num:"04",title:"Fullstack Linux App",desc:"Production app with containerized microservices and Redis caching.",tags:["Node.js","Redis","Docker"]}];
  const services=[{icon:"⬡",title:"Frontend Development",desc:"Pixel-perfect React apps with smooth animations and exceptional UX."},{icon:"◈",title:"Backend & APIs",desc:"Robust Node.js services, RESTful APIs, and authentication systems built for scale."},{icon:"⬡",title:"DevOps & CI/CD",desc:"Docker, GitHub Actions pipelines, cloud deployments, and automation."}];
  return (
    <>
      <div className="cursor" id="cursor"></div>
      <div className="cursor-ring" id="cursor-ring"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      <canvas ref={canvasRef} id="bg-canvas"></canvas>
      <div className={`audio-btn${playing?" active":""}`} onClick={toggleAudio}>{playing?"♬":"♪"}</div>
      <div className="page">
        <nav>
          <div className="nav-logo">RC.</div>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href="#contact" className="nav-cta">Hire Me</a>
        </nav>
        <section className="hero" id="home">
          <div className="version-badge">Version 2.0 Released</div>
          <div className="hero-eyebrow"><span></span>Full Stack Developer</div>
          <h1 className="hero-name">Rintu<br/><em>Chowdory</em></h1>
          <p className="hero-title">React · Node.js · Docker · CI/CD · Cloud Architecture</p>
          <p className="hero-desc">Building digital experiences that drive results. Professional full-stack development with modern tooling and scalable architecture.</p>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="https://gitlab.com/rintu-group" target="_blank" rel="noreferrer" className="btn-secondary">GitLab Repo</a>
          </div>
          <div className="hero-stats">
            <div className="stat-item"><span className="stat-num" id="count1">0</span><span className="stat-label">Projects</span></div>
            <div className="stat-item"><span className="stat-num" id="count2">0</span><span className="stat-label">Satisfaction</span></div>
            <div className="stat-item"><span className="stat-num">24/7</span><span className="stat-label">Support</span></div>
          </div>
          <div className="hero-scroll"><div className="scroll-line"></div><span className="scroll-text">Scroll</span></div>
        </section>
        <div className="marquee-wrap"><div className="marquee-track">{[...techs,...techs].map((t,i)=><span key={i} className="marquee-item">{t} <span>✦</span></span>)}</div></div>
        <section id="about">
          <div className="section-label">About Me</div>
          <h2 className="section-title reveal">Crafting <em>solutions</em><br/>with precision</h2>
          <div className="about-grid">
            <div className="about-text reveal reveal-delay-1">
              <p>I am a passionate full-stack developer specializing in building scalable, high-performance web applications with expertise spanning elegant frontends to robust backend systems and DevOps pipelines.</p>
              <p>My approach combines technical excellence with creative problem-solving, delivering solutions that are not just functional but truly impactful for businesses worldwide.</p>
              <div className="skills-cloud">{skills.map(s=><span key={s} className="skill-tag">{s}</span>)}</div>
            </div>
            <div className="about-visual reveal reveal-delay-2">
              <div className="about-card card-float-1"><div className="card-num">50+</div><div className="card-desc">Projects Shipped</div></div>
              <div className="about-card card-main"><div className="card-name">Rintu Chowdory</div><div className="card-role">Full Stack Developer</div></div>
              <div className="about-card card-float-2"><div className="card-num">100%</div><div className="card-desc">Client Satisfaction</div></div>
            </div>
          </div>
        </section>
        <div className="divider"></div>
        <section id="projects">
          <div className="section-label">Selected Work</div>
          <h2 className="section-title reveal">Recent <em>projects</em></h2>
          <div className="projects-grid">
            <div className="project-card project-featured reveal">
              <div className="project-info">
                <div className="project-num">01 — Featured</div>
                <h3 className="project-title">GitHub Actions CI/CD Pipeline</h3>
                <p className="project-desc">Automated deployment workflow with Docker containerization, multi-environment staging, and zero-downtime deployments.</p>
                <div className="project-tags">{["GitHub Actions","Docker","Nginx","React"].map(t=><span key={t} className="project-tag">{t}</span>)}</div>
                <span className="project-arrow">→</span>
              </div>
              <div className="project-visual"><div className="project-visual-text">CI/CD</div></div>
            </div>
            {projects.map((p,i)=>(
              <div key={p.num} className={`project-card reveal reveal-delay-${i+1}`}>
                <div className="project-num">{p.num}</div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">{p.tags.map(t=><span key={t} className="project-tag">{t}</span>)}</div>
                <span className="project-arrow">→</span>
              </div>
            ))}
          </div>
        </section>
        <section id="services" style={{background:"var(--surface)"}}>
          <div className="section-label">What I Do</div>
          <h2 className="section-title reveal">Areas of <em>expertise</em></h2>
          <div className="services-grid">{services.map((s,i)=><div key={i} className={`service-card reveal reveal-delay-${i+1}`}><span className="service-icon">{s.icon}</span><h3 className="service-title">{s.title}</h3><p className="service-desc">{s.desc}</p></div>)}</div>
        </section>
        <section id="contact">
          <div className="section-label">Get In Touch</div>
          <h1 className="contact-heading reveal">Let us build<br/>something <em>great</em></h1>
          <p className="contact-sub reveal reveal-delay-1">Available for freelance projects and collaborations</p>
          <a href="mailto:Chowdoryrintu@yahoo.com" className="contact-email reveal reveal-delay-2">Chowdoryrintu@yahoo.com</a>
          <div className="social-links reveal reveal-delay-3">
            {[["GitHub","https://github.com"],["GitLab","https://gitlab.com/rintu-group"],["LinkedIn","https://linkedin.com"],["Twitter","https://twitter.com"]].map(([n,u])=><a key={n} href={u} target="_blank" rel="noreferrer" className="social-link">{n}</a>)}
          </div>
        </section>
        <footer>
          <div className="footer-name">Rintu Chowdory</div>
          <div className="footer-copy">2026 Built with React</div>
          <div className="footer-copy">All rights reserved</div>
        </footer>
      </div>
    </>
  );
}
