// import { useNavigate } from "react-router-dom";

// const LandingPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center justify-center h-screen gap-6">
//       <h1 className="text-3xl font-bold">Welcome to PCOS Care</h1>

//       <div className="flex gap-4">
//         <button
//           onClick={() => navigate("/doctor/login")}
//           className="px-6 py-2 bg-blue-500 text-white rounded"
//         >
//           Login as Doctor
//         </button>

//         <button
//           onClick={() => navigate("/onboarding")}
//           className="px-6 py-2 bg-pink-500 text-white rounded"
//         >
//           Continue as Patient
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Nunito:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);

    const reveals = document.querySelectorAll(".lp-reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("lp-visible"), i * 80);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));

    const handleScroll = () => {
      const nav = document.querySelector(".lp-nav") as HTMLElement | null;
      if (nav) nav.style.boxShadow = window.scrollY > 50 ? "0 4px 30px rgba(232,160,191,0.15)" : "none";
    };
    window.addEventListener("scroll", handleScroll);

    const timer = setTimeout(() => {
      const ring = document.querySelector(".lp-ring-fill") as SVGCircleElement | null;
      if (ring) ring.style.strokeDashoffset = "170";
    }, 600);

    return () => {
      document.head.removeChild(link);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const goPatient = () => navigate("/onboarding");
  const goDoctor = () => navigate("/doctor/login");

  return (
    <div style={{ fontFamily: "'Nunito',sans-serif", background: "hsl(30,60%,97%)", color: "hsl(10,10%,27%)", overflowX: "hidden" }}>
      <style>{`
        :root {
          --lp-primary: hsl(330,60%,77%);
          --lp-primary-dark: hsl(330,55%,60%);
          --lp-accent: hsl(43,76%,52%);
          --lp-accent-light: hsl(43,90%,70%);
          --lp-sage: hsl(145,25%,70%);
          --lp-sage-dark: hsl(145,30%,45%);
          --lp-bg: hsl(30,60%,97%);
          --lp-text: hsl(10,10%,27%);
          --lp-text-light: hsl(10,5%,50%);
          --lp-glass-bg: rgba(255,255,255,0.45);
          --lp-glass-border: rgba(255,255,255,0.7);
          --lp-rose-grad: linear-gradient(135deg,hsl(330,60%,77%),hsl(300,15%,71%));
          --lp-gold-grad: linear-gradient(135deg,hsl(43,76%,52%),hsl(43,90%,70%));
        }
        .lp-reveal { opacity:0; transform:translateY(30px); transition:opacity 0.6s ease,transform 0.6s ease; }
        .lp-visible { opacity:1; transform:translateY(0); }

        /* NAV */
        .lp-nav { position:fixed;top:0;width:100%;z-index:100;padding:1rem 5%;display:flex;align-items:center;justify-content:space-between;background:rgba(255,245,240,0.85);backdrop-filter:blur(20px);border-bottom:1px solid rgba(232,160,191,0.2);transition:all 0.3s; }
        .lp-logo { display:flex;align-items:center;gap:0.6rem;font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:var(--lp-primary-dark);text-decoration:none; }
        .lp-logo span { color:var(--lp-accent); }
        .lp-logo-icon { width:40px;height:40px;background:var(--lp-rose-grad);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;box-shadow:0 4px 15px rgba(232,160,191,0.4); }
        .lp-nav-links { display:flex;gap:2rem;list-style:none; }
        .lp-nav-links a { text-decoration:none;color:var(--lp-text-light);font-weight:600;font-size:0.9rem;transition:color 0.2s; }
        .lp-nav-links a:hover { color:var(--lp-primary-dark); }
        .lp-nav-cta { display:flex;gap:0.8rem; }

        /* BUTTONS */
        .lp-btn { padding:0.6rem 1.4rem;border-radius:50px;font-family:'Nunito',sans-serif;font-weight:700;font-size:0.88rem;cursor:pointer;transition:all 0.3s;text-decoration:none;display:inline-block;border:none; }
        .lp-btn-outline { background:transparent;border:2px solid var(--lp-primary);color:var(--lp-primary-dark); }
        .lp-btn-outline:hover { background:var(--lp-primary);color:white;transform:translateY(-2px);box-shadow:0 6px 20px rgba(232,160,191,0.4); }
        .lp-btn-primary { background:var(--lp-rose-grad);color:white;box-shadow:0 4px 15px rgba(232,160,191,0.4); }
        .lp-btn-primary:hover { transform:translateY(-3px);box-shadow:0 8px 25px rgba(232,160,191,0.55); }
        .lp-btn-lg { padding:0.9rem 2.2rem;font-size:1rem; }
        .lp-btn-white { background:white;color:var(--lp-primary-dark);border:none; }
        .lp-btn-white:hover { transform:translateY(-3px);box-shadow:0 10px 30px rgba(0,0,0,0.15); }
        .lp-btn-outline-white { background:transparent;border:2px solid rgba(255,255,255,0.6);color:white;font-weight:700; }
        .lp-btn-outline-white:hover { background:rgba(255,255,255,0.15);transform:translateY(-3px); }

        /* HERO */
        .lp-hero { min-height:100vh;position:relative;display:flex;align-items:center;padding:7rem 5% 4rem;overflow:hidden; }
        .lp-hero-bg { position:absolute;inset:0;z-index:0;background:radial-gradient(ellipse 60% 60% at 80% 30%,rgba(232,160,191,0.25) 0%,transparent 70%),radial-gradient(ellipse 50% 50% at 10% 80%,rgba(160,232,180,0.15) 0%,transparent 70%),radial-gradient(ellipse 40% 40% at 50% 10%,rgba(230,195,120,0.12) 0%,transparent 70%),var(--lp-bg); }
        .lp-blob { position:absolute;border-radius:50%;filter:blur(60px);opacity:0.35;z-index:0;animation:lpFloat 8s ease-in-out infinite; }
        .lp-blob-1 { width:400px;height:400px;background:var(--lp-primary);top:-100px;right:5%;animation-delay:0s; }
        .lp-blob-2 { width:300px;height:300px;background:var(--lp-sage);bottom:0;right:25%;animation-delay:3s; }
        .lp-blob-3 { width:200px;height:200px;background:var(--lp-accent-light);top:30%;left:0;animation-delay:5s; }
        @keyframes lpFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-30px) scale(1.05)} }
        .lp-hero-content { position:relative;z-index:1;max-width:620px;animation:lpSlideUp 0.8s ease-out both; }
        @keyframes lpSlideUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        .lp-hero-badge { display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.7);backdrop-filter:blur(12px);border:1px solid rgba(232,160,191,0.4);border-radius:50px;padding:0.4rem 1rem;font-size:0.82rem;font-weight:700;color:var(--lp-primary-dark);letter-spacing:0.05em;text-transform:uppercase;margin-bottom:1.5rem;animation:lpSlideUp 0.8s 0.1s ease-out both; }
        .lp-badge-dot { width:8px;height:8px;border-radius:50%;background:var(--lp-primary);animation:lpPulse 2s infinite; }
        @keyframes lpPulse { 0%,100%{box-shadow:0 0 0 0 rgba(232,160,191,0.7)} 50%{box-shadow:0 0 0 8px rgba(232,160,191,0)} }
        .lp-hero h1 { font-family:'Playfair Display',serif;font-size:clamp(2.4rem,5vw,3.8rem);line-height:1.1;color:var(--lp-text);margin-bottom:1.2rem;animation:lpSlideUp 0.8s 0.2s ease-out both; }
        .lp-highlight { background:var(--lp-rose-grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .lp-hero-sub { font-size:1.05rem;line-height:1.7;color:var(--lp-text-light);max-width:520px;margin-bottom:2rem;animation:lpSlideUp 0.8s 0.3s ease-out both; }
        .lp-hero-actions { display:flex;gap:1rem;flex-wrap:wrap;animation:lpSlideUp 0.8s 0.4s ease-out both; }
        .lp-hero-stats { display:flex;gap:2.5rem;margin-top:3rem;animation:lpSlideUp 0.8s 0.5s ease-out both; }
        .lp-stat-num { font-family:'Playfair Display',serif;font-size:1.9rem;font-weight:700;background:var(--lp-rose-grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .lp-stat-label { font-size:0.82rem;color:var(--lp-text-light);font-weight:600; }

        /* HERO VISUAL */
        .lp-hero-visual { position:absolute;right:5%;top:50%;transform:translateY(-50%);z-index:1;animation:lpSlideUp 0.8s 0.3s ease-out both; }
        .lp-hero-card { background:var(--lp-glass-bg);backdrop-filter:blur(20px);border:1px solid var(--lp-glass-border);border-radius:24px;padding:2rem;width:340px;box-shadow:0 20px 60px rgba(232,160,191,0.2); }
        .lp-hc-header { display:flex;align-items:center;gap:0.8rem;margin-bottom:1.5rem; }
        .lp-hc-avatar { width:48px;height:48px;border-radius:50%;background:var(--lp-rose-grad);display:flex;align-items:center;justify-content:center;font-size:1.4rem; }
        .lp-hc-title { font-family:'Playfair Display',serif;font-size:1rem;color:var(--lp-text);font-weight:600; }
        .lp-hc-sub { font-size:0.78rem;color:var(--lp-text-light); }
        .lp-ring-wrap { position:relative;width:110px;height:110px;margin:0.5rem auto; }
        .lp-ring-wrap svg { transform:rotate(-90deg); }
        .lp-ring-bg { fill:none;stroke:hsl(330,30%,92%);stroke-width:10; }
        .lp-ring-fill { fill:none;stroke:url(#lpRg);stroke-width:10;stroke-linecap:round;stroke-dasharray:283;stroke-dashoffset:283;transition:stroke-dashoffset 1s ease; }
        .lp-ring-text { position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center; }
        .lp-ring-num { font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:700;color:var(--lp-primary-dark); }
        .lp-ring-pct { font-size:0.72rem;color:var(--lp-text-light); }
        .lp-factors { display:flex;flex-direction:column;gap:0.6rem;margin-top:1rem; }
        .lp-frow { display:flex;align-items:center;gap:0.5rem; }
        .lp-fname { font-size:0.78rem;color:var(--lp-text-light);min-width:100px; }
        .lp-fbar-wrap { flex:1;height:6px;background:hsl(330,30%,92%);border-radius:3px;overflow:hidden; }
        .lp-fbar { height:100%;border-radius:3px;background:var(--lp-rose-grad); }
        .lp-fpct { font-size:0.75rem;font-weight:700;color:var(--lp-primary-dark);min-width:32px;text-align:right; }
        .lp-floating-pill { position:absolute;background:white;border-radius:50px;padding:0.5rem 1rem;box-shadow:0 8px 25px rgba(0,0,0,0.1);font-size:0.8rem;font-weight:700;display:flex;align-items:center;gap:0.5rem;white-space:nowrap; }
        .lp-pill-1 { bottom:-20px;left:-60px;color:var(--lp-sage-dark);animation:lpFloatY 4s 0.5s ease-in-out infinite; }
        .lp-pill-2 { top:30px;left:-80px;color:var(--lp-accent);animation:lpFloatY 4s 2s ease-in-out infinite; }
        @keyframes lpFloatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        /* SECTIONS */
        .lp-section { padding:6rem 5%; }
        .lp-section-tag { display:inline-block;background:rgba(232,160,191,0.15);color:var(--lp-primary-dark);border-radius:50px;padding:0.3rem 1rem;font-size:0.8rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:1rem; }
        .lp-section-tag.sage { background:rgba(100,180,130,0.15);color:var(--lp-sage-dark); }
        .lp-section-tag.gold { background:rgba(200,160,60,0.12);color:hsl(43,55%,35%); }
        .lp-section-title { font-family:'Playfair Display',serif;font-size:clamp(1.9rem,4vw,2.8rem);line-height:1.15;color:var(--lp-text);margin-bottom:1rem; }
        .lp-section-sub { font-size:1rem;color:var(--lp-text-light);line-height:1.7;max-width:520px; }
        .lp-center { text-align:center; }
        .lp-center .lp-section-sub { margin:0 auto 3rem; }

        /* HOW IT WORKS */
        .lp-how-bg { background:radial-gradient(ellipse 50% 70% at 0% 50%,rgba(232,160,191,0.12) 0%,transparent 60%),white; }
        .lp-steps-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem;margin-top:3.5rem; }
        .lp-step-card { background:var(--lp-glass-bg);backdrop-filter:blur(16px);border:1px solid rgba(232,160,191,0.25);border-radius:20px;padding:2rem 1.6rem;text-align:center;position:relative;transition:transform 0.3s,box-shadow 0.3s;overflow:hidden; }
        .lp-step-card::before { content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--lp-rose-grad);border-radius:20px 20px 0 0; }
        .lp-step-card:hover { transform:translateY(-8px);box-shadow:0 20px 50px rgba(232,160,191,0.2); }
        .lp-step-num { position:absolute;top:1rem;right:1.2rem;font-family:'Playfair Display',serif;font-size:3rem;font-weight:700;color:rgba(232,160,191,0.18);line-height:1; }
        .lp-step-icon { width:60px;height:60px;border-radius:50%;background:var(--lp-rose-grad);display:flex;align-items:center;justify-content:center;font-size:1.6rem;margin:0 auto 1.2rem;box-shadow:0 6px 20px rgba(232,160,191,0.35); }
        .lp-step-title { font-family:'Playfair Display',serif;font-size:1.05rem;color:var(--lp-text);margin-bottom:0.5rem;font-weight:600; }
        .lp-step-desc { font-size:0.87rem;color:var(--lp-text-light);line-height:1.6; }

        /* FEATURES */
        .lp-features-wrap { display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center; }
        .lp-features-left { display:flex;flex-direction:column;gap:2rem; }
        .lp-feature-item { display:flex;gap:1.2rem;align-items:flex-start;padding:1.5rem;border-radius:16px;background:rgba(255,255,255,0.5);border:1px solid rgba(232,160,191,0.2);transition:all 0.3s; }
        .lp-feature-item:hover { background:white;box-shadow:0 10px 35px rgba(232,160,191,0.18);transform:translateX(5px); }
        .lp-feature-icon { width:50px;height:50px;border-radius:14px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:1.4rem; }
        .lp-fi-rose { background:linear-gradient(135deg,rgba(232,160,191,0.25),rgba(232,160,191,0.1)); }
        .lp-fi-gold { background:linear-gradient(135deg,rgba(200,165,60,0.25),rgba(200,165,60,0.08)); }
        .lp-fi-sage { background:linear-gradient(135deg,rgba(100,180,130,0.25),rgba(100,180,130,0.08)); }
        .lp-fi-purple { background:linear-gradient(135deg,rgba(180,120,220,0.2),rgba(180,120,220,0.05)); }
        .lp-feature-text h4 { font-family:'Nunito',sans-serif;font-size:1rem;margin-bottom:0.3rem;color:var(--lp-text);font-weight:700; }
        .lp-feature-text p { font-size:0.86rem;color:var(--lp-text-light);line-height:1.6; }
        .lp-mockup { background:white;border-radius:28px;padding:1.5rem;box-shadow:0 30px 80px rgba(0,0,0,0.12);border:1px solid rgba(232,160,191,0.2);max-width:300px;margin:0 auto; }
        .lp-mockup-header { display:flex;align-items:center;justify-content:space-between;margin-bottom:1.2rem; }
        .lp-mockup-title { font-family:'Playfair Display',serif;font-size:1rem;color:var(--lp-text); }
        .lp-mockup-badge { background:var(--lp-rose-grad);color:white;border-radius:50px;padding:0.2rem 0.7rem;font-size:0.7rem;font-weight:700; }
        .lp-chart-bars { display:flex;gap:0.5rem;align-items:flex-end;height:90px;margin-bottom:0.5rem; }
        .lp-cbar { flex:1;border-radius:6px 6px 0 0; }
        .lp-cbar:nth-child(1){height:55%;background:hsl(330,50%,85%)}
        .lp-cbar:nth-child(2){height:78%;background:var(--lp-primary)}
        .lp-cbar:nth-child(3){height:42%;background:hsl(330,50%,85%)}
        .lp-cbar:nth-child(4){height:90%;background:var(--lp-rose-grad)}
        .lp-cbar:nth-child(5){height:64%;background:hsl(330,50%,85%)}
        .lp-cbar:nth-child(6){height:35%;background:hsl(330,50%,85%)}
        .lp-chart-labels { display:flex;gap:0.5rem; }
        .lp-chart-labels span { flex:1;text-align:center;font-size:0.65rem;color:var(--lp-text-light); }
        .lp-mockup-insight { background:linear-gradient(135deg,rgba(232,160,191,0.12),rgba(232,160,191,0.05));border:1px solid rgba(232,160,191,0.25);border-radius:12px;padding:1rem;margin-top:1rem; }
        .lp-insight-row { display:flex;align-items:center;justify-content:space-between;margin-bottom:0.4rem; }
        .lp-insight-label { font-size:0.78rem;color:var(--lp-text-light); }
        .lp-insight-val { font-size:0.78rem;font-weight:700;color:var(--lp-primary-dark); }
        .lp-insight-desc { font-size:0.74rem;color:var(--lp-text-light);line-height:1.5; }

        /* EDUCATION */
        .lp-edu-bg { background:linear-gradient(180deg,rgba(100,180,130,0.06) 0%,rgba(232,160,191,0.06) 100%); }
        .lp-edu-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.5rem;margin-top:3rem; }
        .lp-edu-card { border-radius:20px;overflow:hidden;background:white;border:1px solid rgba(232,160,191,0.2);box-shadow:0 4px 20px rgba(0,0,0,0.05);transition:all 0.35s; }
        .lp-edu-card:hover { transform:translateY(-8px);box-shadow:0 20px 50px rgba(0,0,0,0.1); }
        .lp-edu-card-top { padding:1.8rem 1.6rem 1.2rem;position:relative; }
        .lp-edu-card-top.rose { background:linear-gradient(135deg,hsl(330,70%,95%),hsl(330,60%,92%)); }
        .lp-edu-card-top.sage { background:linear-gradient(135deg,hsl(145,35%,93%),hsl(145,25%,90%)); }
        .lp-edu-card-top.gold { background:linear-gradient(135deg,hsl(43,80%,94%),hsl(43,76%,91%)); }
        .lp-edu-card-top.purple { background:linear-gradient(135deg,hsl(285,40%,94%),hsl(285,30%,90%)); }
        .lp-edu-card-tag { position:absolute;top:1.2rem;right:1.2rem;background:rgba(255,255,255,0.7);border-radius:50px;padding:0.2rem 0.7rem;font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em; }
        .lp-edu-card-body { padding:1.2rem 1.6rem 1.6rem; }
        .lp-edu-card-title { font-family:'Playfair Display',serif;font-size:1.05rem;color:var(--lp-text);margin-bottom:0.5rem; }
        .lp-edu-card-desc { font-size:0.83rem;color:var(--lp-text-light);line-height:1.6;margin-bottom:1rem; }
        .lp-edu-tags { display:flex;flex-wrap:wrap;gap:0.4rem; }
        .lp-edu-tag { border-radius:50px;padding:0.15rem 0.7rem;font-size:0.72rem;font-weight:600;background:rgba(232,160,191,0.12);color:var(--lp-primary-dark); }
        .lp-pcos-facts { display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1.5rem;margin-top:4rem;padding:2.5rem;background:var(--lp-rose-grad);border-radius:24px;color:white; }
        .lp-fact-num { font-family:'Playfair Display',serif;font-size:2.5rem;font-weight:700;margin-bottom:0.2rem; }
        .lp-fact-txt { font-size:0.88rem;opacity:0.88; }

        /* DOCTOR-PATIENT */
        .lp-doctor-section { background:white; }
        .lp-dp-wrap { display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center; }
        .lp-dp-visual { display:flex;flex-direction:column;gap:1.2rem; }
        .lp-dp-card { background:linear-gradient(135deg,hsl(330,60%,97%),hsl(300,15%,95%));border:1px solid rgba(232,160,191,0.25);border-radius:20px;padding:1.5rem;box-shadow:0 4px 20px rgba(232,160,191,0.15);transition:all 0.3s; }
        .lp-dp-card:hover { transform:scale(1.02);box-shadow:0 10px 35px rgba(232,160,191,0.25); }
        .lp-dp-card-header { display:flex;align-items:center;gap:1rem;margin-bottom:1rem; }
        .lp-dp-avatar { width:50px;height:50px;border-radius:50%;background:var(--lp-rose-grad);display:flex;align-items:center;justify-content:center;font-size:1.3rem;box-shadow:0 4px 12px rgba(232,160,191,0.4);flex-shrink:0; }
        .lp-dp-avatar.doc { background:linear-gradient(135deg,hsl(220,60%,65%),hsl(220,70%,50%)); }
        .lp-dp-name { font-weight:700;color:var(--lp-text);font-size:0.95rem; }
        .lp-dp-role { font-size:0.78rem;color:var(--lp-text-light); }
        .lp-dp-report-row { display:flex;align-items:center;gap:0.8rem;margin-bottom:0.6rem; }
        .lp-dp-report-icon { font-size:1.1rem; }
        .lp-dp-report-label { font-size:0.82rem;color:var(--lp-text-light); }
        .lp-dp-report-val { font-size:0.82rem;font-weight:700;color:var(--lp-primary-dark);margin-left:auto; }
        .lp-dp-status-pill { display:inline-flex;align-items:center;gap:0.4rem;background:rgba(100,180,130,0.15);color:var(--lp-sage-dark);border-radius:50px;padding:0.3rem 0.9rem;font-size:0.78rem;font-weight:700;margin-left:auto; }
        .lp-dp-status-dot { width:7px;height:7px;border-radius:50%;background:var(--lp-sage-dark);animation:lpPulse 2s infinite; }
        .lp-dp-ul { list-style:none;margin-top:1.5rem;display:flex;flex-direction:column;gap:1rem; }
        .lp-dp-ul li { display:flex;align-items:flex-start;gap:0.8rem;font-size:0.9rem;color:var(--lp-text-light);line-height:1.6; }
        .lp-check-icon { width:24px;height:24px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,rgba(100,180,130,0.3),rgba(100,180,130,0.1));display:flex;align-items:center;justify-content:center;font-size:0.75rem;color:var(--lp-sage-dark);margin-top:2px; }

        /* TESTIMONIALS */
        .lp-testi-bg { background:linear-gradient(135deg,hsl(30,60%,97%),hsl(330,40%,97%)); }
        .lp-testi-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin-top:3rem; }
        .lp-testi-card { background:white;border-radius:20px;padding:2rem;border:1px solid rgba(232,160,191,0.18);box-shadow:0 4px 20px rgba(0,0,0,0.05);position:relative;transition:all 0.3s; }
        .lp-testi-card:hover { transform:translateY(-5px);box-shadow:0 15px 40px rgba(232,160,191,0.2); }
        .lp-quote-mark { font-family:'Playfair Display',serif;font-size:4rem;color:rgba(232,160,191,0.25);position:absolute;top:0.5rem;left:1.2rem;line-height:1; }
        .lp-testi-stars { color:var(--lp-accent);font-size:0.9rem;margin-bottom:1rem; }
        .lp-testi-text { font-size:0.9rem;color:var(--lp-text-light);line-height:1.7;margin-bottom:1.5rem;font-style:italic; }
        .lp-testi-author { display:flex;align-items:center;gap:0.8rem; }
        .lp-testi-avatar { width:42px;height:42px;border-radius:50%;font-size:1.2rem;display:flex;align-items:center;justify-content:center; }
        .lp-testi-name { font-weight:700;font-size:0.88rem;color:var(--lp-text); }
        .lp-testi-loc { font-size:0.76rem;color:var(--lp-text-light); }

        /* CTA */
        .lp-cta-section { padding:7rem 5%;background:var(--lp-rose-grad);text-align:center;position:relative;overflow:hidden; }
        .lp-cta-section h2 { font-family:'Playfair Display',serif;color:white;font-size:clamp(2rem,4vw,3rem);margin-bottom:1rem; }
        .lp-cta-section p { color:rgba(255,255,255,0.85);font-size:1.05rem;margin-bottom:2.5rem;max-width:500px;margin-left:auto;margin-right:auto; }
        .lp-cta-buttons { display:flex;gap:1rem;justify-content:center;flex-wrap:wrap; }

        /* FOOTER */
        .lp-footer { background:hsl(10,10%,20%);color:rgba(255,255,255,0.75);padding:4rem 5% 2rem; }
        .lp-disclaimer { background:rgba(255,255,255,0.05);border-radius:10px;padding:1rem 1.2rem;font-size:0.78rem;margin-bottom:2rem;border-left:3px solid var(--lp-primary);line-height:1.5; }
        .lp-footer-top { display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem; }
        .lp-footer-logo { font-family:'Playfair Display',serif;font-size:1.4rem;color:white;margin-bottom:0.8rem; }
        .lp-footer-logo span { color:var(--lp-primary); }
        .lp-footer-brand-desc { font-size:0.85rem;line-height:1.7;opacity:0.7;max-width:270px; }
        .lp-footer-col h5 { color:white;font-size:0.88rem;font-weight:700;margin-bottom:1rem;letter-spacing:0.05em;text-transform:uppercase; }
        .lp-footer-col ul { list-style:none;display:flex;flex-direction:column;gap:0.5rem; }
        .lp-footer-col ul a { color:rgba(255,255,255,0.6);font-size:0.85rem;text-decoration:none;transition:color 0.2s; }
        .lp-footer-col ul a:hover { color:var(--lp-primary); }
        .lp-footer-bottom { border-top:1px solid rgba(255,255,255,0.08);padding-top:1.5rem;display:flex;align-items:center;justify-content:space-between;font-size:0.8rem;opacity:0.55; }

        /* RESPONSIVE */
        @media(max-width:900px){.lp-hero-visual{display:none}.lp-features-wrap,.lp-dp-wrap{grid-template-columns:1fr}.lp-footer-top{grid-template-columns:1fr 1fr}.lp-hero-stats{gap:1.5rem}}
        @media(max-width:600px){.lp-nav-links{display:none}.lp-pcos-facts{grid-template-columns:1fr 1fr}.lp-footer-top{grid-template-columns:1fr}.lp-hero-actions{flex-direction:column}}
      `}</style>

      {/* ── NAV ── */}
      <nav className="lp-nav">
        <a className="lp-logo" href="#">
          <div className="lp-logo-icon">🌸</div>
          Nari<span>Care</span>AI
        </a>
        <ul className="lp-nav-links">
          <li><a href="#lp-how">How It Works</a></li>
          <li><a href="#lp-features">Features</a></li>
          <li><a href="#lp-education">Learn</a></li>
          <li><a href="#lp-doctors">Doctors</a></li>
        </ul>
        <div className="lp-nav-cta">
          <button className="lp-btn lp-btn-outline" onClick={goDoctor}>Doctor Portal</button>
          <button className="lp-btn lp-btn-primary" onClick={goPatient}>Start Screening</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="lp-hero-bg" />
        <div className="lp-blob lp-blob-1" />
        <div className="lp-blob lp-blob-2" />
        <div className="lp-blob lp-blob-3" />

        <div className="lp-hero-content">
          <div className="lp-hero-badge"><div className="lp-badge-dot" /> AI-Powered Women's Health</div>
          <h1>Detect PCOS Risk<br /><span className="lp-highlight">Before It Detects You</span></h1>
          <p className="lp-hero-sub">NariCareAI uses advanced machine learning to screen your PCOS risk in minutes — with explainable AI insights, personalized lifestyle plans, and direct doctor consultation.</p>
          <div className="lp-hero-actions">
            <button className="lp-btn lp-btn-primary lp-btn-lg" onClick={goPatient}>🔍 Free PCOS Screening</button>
            <a href="#lp-how" className="lp-btn lp-btn-outline lp-btn-lg">See How It Works</a>
          </div>
          <div className="lp-hero-stats">
            <div><div className="lp-stat-num">1 in 5</div><div className="lp-stat-label">Women affected by PCOS</div></div>
            <div><div className="lp-stat-num">94%</div><div className="lp-stat-label">Model accuracy</div></div>
            <div><div className="lp-stat-num">3 min</div><div className="lp-stat-label">To get your risk score</div></div>
          </div>
        </div>

        <div className="lp-hero-visual">
          <div style={{ position: "relative" }}>
            <div className="lp-floating-pill lp-pill-2">🧪 SHAP Analysis Ready</div>
            <div className="lp-hero-card">
              <div className="lp-hc-header">
                <div className="lp-hc-avatar">👩</div>
                <div>
                  <div className="lp-hc-title">PCOS Risk Report</div>
                  <div className="lp-hc-sub">Priya Sharma • Just now</div>
                </div>
              </div>
              <div style={{ textAlign: "center", margin: "0.5rem 0" }}>
                <div style={{ fontSize: "0.8rem", color: "var(--lp-text-light)", marginBottom: "0.4rem" }}>Risk Score</div>
                <div className="lp-ring-wrap">
                  <svg width="110" height="110" viewBox="0 0 110 110">
                    <defs>
                      <linearGradient id="lpRg" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(330,60%,77%)" />
                        <stop offset="100%" stopColor="hsl(300,15%,71%)" />
                      </linearGradient>
                    </defs>
                    <circle className="lp-ring-bg" cx="55" cy="55" r="45" />
                    <circle className="lp-ring-fill" cx="55" cy="55" r="45" />
                  </svg>
                  <div className="lp-ring-text">
                    <div className="lp-ring-num">40</div>
                    <div className="lp-ring-pct">Moderate</div>
                  </div>
                </div>
              </div>
              <div className="lp-factors">
                {[["Irregular cycles","72%"],["BMI","55%"],["Hormones","38%"]].map(([n,w])=>(
                  <div key={n} className="lp-frow">
                    <div className="lp-fname">{n}</div>
                    <div className="lp-fbar-wrap"><div className="lp-fbar" style={{ width: w }} /></div>
                    <div className="lp-fpct">{w}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lp-floating-pill lp-pill-1">✅ Diet Plan Generated</div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="lp-how" className="lp-section lp-how-bg">
        <div className="lp-center lp-reveal">
          <div className="lp-section-tag">Simple Process</div>
          <h2 className="lp-section-title">From Symptoms to <em>Clarity</em></h2>
          <p className="lp-section-sub">Our AI-powered screening takes just minutes and gives you medically-informed insights you can act on.</p>
        </div>
        <div className="lp-steps-grid">
          {[
            { n:"01", i:"📋", t:"Complete Your Profile", d:"Answer questions about your cycle, symptoms, and lifestyle. Basic or advanced clinical screening — you choose." },
            { n:"02", i:"🤖", t:"AI Analyses Your Data", d:"Our XGBoost & Random Forest models evaluate your inputs with SHAP explainability — showing exactly what affects your risk." },
            { n:"03", i:"📊", t:"Get Your Risk Score", d:"Receive a detailed risk report with contributing factors, personalized diet plans, yoga guidance, and lifestyle tips." },
            { n:"04", i:"🩺", t:"Connect with a Doctor", d:"Share your AI-generated report directly with a specialist. Doctors access your full health dashboard for informed consultations." },
          ].map(({ n,i,t,d }) => (
            <div key={n} className="lp-step-card lp-reveal">
              <div className="lp-step-num">{n}</div>
              <div className="lp-step-icon">{i}</div>
              <div className="lp-step-title">{t}</div>
              <div className="lp-step-desc">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="lp-features" className="lp-section">
        <div className="lp-features-wrap">
          <div className="lp-features-left lp-reveal">
            <div>
              <div className="lp-section-tag">Why NariCareAI</div>
              <h2 className="lp-section-title">Everything You Need,<br /><em>In One Platform</em></h2>
              <p className="lp-section-sub">Comprehensive PCOS management — from detection to doctor — all powered by transparent AI.</p>
            </div>
            {[
              { cls:"lp-fi-rose", i:"🔍", t:"Dual Screening System", d:"Basic lifestyle screening or advanced clinical indicators — both powered by ensemble ML models with 94% accuracy." },
              { cls:"lp-fi-gold", i:"🧠", t:"Explainable AI (SHAP)", d:"Never a black box. SHAP analysis shows exactly which factors contribute to your risk — empowering informed decisions." },
              { cls:"lp-fi-sage", i:"🥗", t:"AI-Generated Diet Plans", d:"LLM-powered personalized diet generation considering PCOS-friendly foods based on your unique health profile." },
              { cls:"lp-fi-purple", i:"🧘", t:"Yoga & Lifestyle Guidance", d:"Curated yoga routines, cycle tracking, and daily care tips tailored to your PCOS risk level and symptoms." },
            ].map(({ cls,i,t,d }) => (
              <div key={t} className="lp-feature-item">
                <div className={`lp-feature-icon ${cls}`}>{i}</div>
                <div className="lp-feature-text"><h4>{t}</h4><p>{d}</p></div>
              </div>
            ))}
          </div>
          <div className="lp-reveal">
            <div className="lp-mockup">
              <div className="lp-mockup-header">
                <div className="lp-mockup-title">Health Dashboard</div>
                <div className="lp-mockup-badge">Live</div>
              </div>
              <div style={{ fontSize:"0.75rem", color:"var(--lp-text-light)", marginBottom:"0.5rem" }}>Cycle Regularity (6 months)</div>
              <div className="lp-chart-bars">{[1,2,3,4,5,6].map(n=><div key={n} className="lp-cbar"/>)}</div>
              <div className="lp-chart-labels">{["Nov","Dec","Jan","Feb","Mar","Apr"].map(m=><span key={m}>{m}</span>)}</div>
              <div className="lp-mockup-insight">
                <div className="lp-insight-row"><span className="lp-insight-label">Risk Score</span><span className="lp-insight-val">Moderate (40%)</span></div>
                <div className="lp-insight-row"><span className="lp-insight-label">Last Screening</span><span className="lp-insight-val">Today</span></div>
                <div className="lp-insight-row" style={{ marginBottom:"0.6rem" }}><span className="lp-insight-label">Diet Plan</span><span className="lp-insight-val" style={{ color:"var(--lp-sage-dark)" }}>✓ Generated</span></div>
                <div className="lp-insight-desc">Your AI report is ready to share with your doctor. Key factor: irregular cycles (72% influence).</div>
              </div>
              <div style={{ marginTop:"1rem", display:"flex", gap:"0.6rem" }}>
                <button onClick={goPatient} style={{ flex:1, padding:"0.6rem", borderRadius:"10px", border:"none", background:"var(--lp-rose-grad)", color:"white", fontWeight:700, fontSize:"0.8rem", cursor:"pointer", fontFamily:"'Nunito',sans-serif" }}>View Report</button>
                <button onClick={goDoctor} style={{ flex:1, padding:"0.6rem", borderRadius:"10px", border:"1px solid rgba(232,160,191,0.35)", background:"transparent", color:"var(--lp-primary-dark)", fontWeight:700, fontSize:"0.8rem", cursor:"pointer", fontFamily:"'Nunito',sans-serif" }}>Book Doctor</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="lp-education" className="lp-section lp-edu-bg">
        <div className="lp-center lp-reveal">
          <div className="lp-section-tag sage">Know Your Health</div>
          <h2 className="lp-section-title">PCOS Education Centre</h2>
          <p className="lp-section-sub">Understanding PCOS is the first step to managing it. Science-backed resources on symptoms, hormones, diet, and lifestyle — in easy language.</p>
        </div>
        <div className="lp-edu-grid">
          {[
            { color:"rose", tagColor:"var(--lp-primary-dark)", icon:"🌸", title:"What is PCOS?", desc:"A hormonal disorder affecting ovaries. Learn the root causes, how it develops, and why early detection matters more than ever.", tags:["Hormones","Ovaries","Beginner"] },
            { color:"sage", tagColor:"var(--lp-sage-dark)", icon:"🩺", title:"Recognising the Signs", desc:"Irregular periods, weight gain, acne, hair thinning — understand each symptom and how they connect to PCOS risk.", tags:["Cycle","Symptoms","Early Detection"], tagBg:"rgba(100,180,130,0.12)" },
            { color:"gold", tagColor:"hsl(43,55%,35%)", icon:"🥗", title:"PCOS-Friendly Diet", desc:"Anti-inflammatory foods, low-GI meals, and hormone-balancing nutrients — discover what to eat to manage PCOS naturally.", tags:["Anti-inflammatory","Low-GI","Recipes"], tagBg:"rgba(200,165,60,0.12)" },
            { color:"purple", tagColor:"hsl(285,40%,40%)", icon:"🧘", title:"Yoga & Movement", desc:"Specific yoga poses and exercise protocols clinically shown to reduce PCOS symptoms and improve insulin sensitivity.", tags:["Yoga","Exercise","Insulin"], tagBg:"rgba(180,120,220,0.1)" },
          ].map(({ color, tagColor, icon, title, desc, tags, tagBg }) => (
            <div key={title} className="lp-edu-card lp-reveal">
              <div className={`lp-edu-card-top ${color}`}>
                <div className="lp-edu-card-tag" style={{ color: tagColor }}>{color.charAt(0).toUpperCase()+color.slice(1)}</div>
                <div style={{ fontSize:"2.2rem", marginBottom:"0.8rem" }}>{icon}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.1rem", color:"hsl(10,10%,27%)" }}>{title}</div>
              </div>
              <div className="lp-edu-card-body">
                <p className="lp-edu-card-desc">{desc}</p>
                <div className="lp-edu-tags">
                  {tags.map(tag=>(
                    <span key={tag} className="lp-edu-tag" style={tagBg ? { background: tagBg, color: tagColor } : {}}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lp-pcos-facts lp-reveal">
          {[["1 in 5","Women worldwide have PCOS"],["70%","Cases go undiagnosed for years"],["5–10%","Of women of reproductive age affected"],["Early","Detection dramatically improves outcomes"]].map(([n,t])=>(
            <div key={n} style={{ textAlign:"center" }}><div className="lp-fact-num">{n}</div><div className="lp-fact-txt">{t}</div></div>
          ))}
        </div>
      </section>

      {/* ── DOCTOR-PATIENT ── */}
      <section id="lp-doctors" className="lp-section lp-doctor-section">
        <div className="lp-dp-wrap">
          <div className="lp-dp-visual lp-reveal">
            {/* Patient card */}
            <div className="lp-dp-card">
              <div className="lp-dp-card-header">
                <div className="lp-dp-avatar">👩</div>
                <div>
                  <div className="lp-dp-name">Priya Sharma</div>
                  <div className="lp-dp-role">Patient — AI Screening Complete</div>
                </div>
                <div className="lp-dp-status-pill"><div className="lp-dp-status-dot" /> Live Report</div>
              </div>
              {[
                { ic:"📊", l:"Risk Score", v:"Moderate (40%)", s:{} },
                { ic:"🔬", l:"SHAP Top Factor", v:"Irregular cycles", s:{} },
                { ic:"🥗", l:"Diet Plan", v:"Generated ✓", s:{ color:"var(--lp-sage-dark)" } },
              ].map(({ ic,l,v,s })=>(
                <div key={l} className="lp-dp-report-row">
                  <div className="lp-dp-report-icon">{ic}</div>
                  <div className="lp-dp-report-label">{l}</div>
                  <div className="lp-dp-report-val" style={s}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ textAlign:"center", fontSize:"1.5rem", color:"var(--lp-primary)", fontWeight:700 }}>⬇ Report Shared</div>

            {/* Doctor card */}
            <div className="lp-dp-card" style={{ background:"linear-gradient(135deg,hsl(220,50%,97%),hsl(220,40%,95%))", borderColor:"rgba(100,130,220,0.2)" }}>
              <div className="lp-dp-card-header">
                <div className="lp-dp-avatar doc">👨‍⚕️</div>
                <div>
                  <div className="lp-dp-name">Dr. Anjali Mehta</div>
                  <div className="lp-dp-role">Gynaecologist — Reviewing Report</div>
                </div>
              </div>
              {[
                { ic:"📋", l:"Patient Dashboard", v:"Full Access" },
                { ic:"📝", l:"Clinical Notes", v:"In Progress" },
              ].map(({ ic,l,v })=>(
                <div key={l} className="lp-dp-report-row">
                  <div className="lp-dp-report-icon">{ic}</div>
                  <div className="lp-dp-report-label">{l}</div>
                  <div className="lp-dp-report-val" style={{ color:"hsl(220,60%,50%)" }}>{v}</div>
                </div>
              ))}
              <div style={{ marginTop:"0.5rem" }}>
                <button onClick={goDoctor} style={{ width:"100%", padding:"0.65rem", borderRadius:"12px", border:"none", background:"linear-gradient(135deg,hsl(220,60%,65%),hsl(220,70%,50%))", color:"white", fontWeight:700, fontSize:"0.85rem", cursor:"pointer", fontFamily:"'Nunito',sans-serif" }}>
                  Start Teleconsultation →
                </button>
              </div>
            </div>
          </div>

          <div className="lp-reveal">
            <div className="lp-section-tag">Seamless Care</div>
            <h2 className="lp-section-title">Bridging Patients<br />& <em>Specialists</em></h2>
            <p className="lp-section-sub">NariCareAI closes the gap between AI insights and real medical care. Patients share AI-generated reports; doctors get a complete clinical dashboard — enabling faster, better consultations.</p>
            <ul className="lp-dp-ul">
              {[
                ["Smart Report Sharing","Patients share their full AI health report (risk score, SHAP analysis, diet plan) directly with their doctor before the appointment."],
                ["Doctor Dashboard","Doctors access patient profiles, past screenings, health indicators, and notes in one organised portal."],
                ["Teleconsultation Ready","Seamless video consultations with full health context visible to the doctor during the session."],
                ["Follow-Up Tracking","Doctors can add notes and track patient progress across multiple screenings over time."],
              ].map(([t,d])=>(
                <li key={t}><div className="lp-check-icon">✓</div><span><strong>{t}</strong> — {d}</span></li>
              ))}
            </ul>
            <div style={{ marginTop:"2rem", display:"flex", gap:"1rem", flexWrap:"wrap" }}>
              <button className="lp-btn lp-btn-primary lp-btn-lg" onClick={goPatient}>Start as Patient</button>
              <button className="lp-btn lp-btn-outline lp-btn-lg" onClick={goDoctor}>Join as Doctor</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="lp-section lp-testi-bg">
        <div className="lp-center lp-reveal">
          <div className="lp-section-tag">Real Voices</div>
          <h2 className="lp-section-title">Women Who Found <em>Answers</em></h2>
          <p className="lp-section-sub">Early screening changed how these women manage their health. Their stories matter.</p>
        </div>
        <div className="lp-testi-grid">
          {[
            { bg:"linear-gradient(135deg,hsl(330,60%,88%),hsl(330,50%,80%))", av:"👩", q:"I had no idea irregular periods could signal something serious. NariCareAI flagged my moderate risk within minutes and helped me understand my own body like never before.", name:"Ananya R.", loc:"Mumbai, Maharashtra" },
            { bg:"linear-gradient(135deg,hsl(145,35%,85%),hsl(145,25%,75%))", av:"👩‍💼", q:"The SHAP explanation was a game-changer. My doctor could instantly see which factors were most concerning and we had the most productive consultation I've ever had.", name:"Kavya M.", loc:"Bengaluru, Karnataka" },
            { bg:"linear-gradient(135deg,hsl(220,50%,85%),hsl(220,40%,75%))", av:"👨‍⚕️", q:"As a doctor, I love how prepared my patients are when they come with NariCareAI reports. The dashboard gives me everything I need before the consultation even begins.", name:"Dr. Suresh P.", loc:"Gynaecologist, Delhi" },
          ].map(({ bg,av,q,name,loc })=>(
            <div key={name} className="lp-testi-card lp-reveal">
              <div className="lp-quote-mark">"</div>
              <div className="lp-testi-stars">★★★★★</div>
              <p className="lp-testi-text">{q}</p>
              <div className="lp-testi-author">
                <div className="lp-testi-avatar" style={{ background:bg }}>{av}</div>
                <div><div className="lp-testi-name">{name}</div><div className="lp-testi-loc">{loc}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lp-cta-section">
        <div className="lp-section-tag" style={{ background:"rgba(255,255,255,0.2)", color:"white", marginBottom:"1.2rem" }}>Take Control Today</div>
        <h2>Your Health Journey<br />Starts in 3 Minutes</h2>
        <p>Free AI-powered PCOS screening with no medical tests needed. Just your symptoms, your story — and our AI's honest assessment.</p>
        <div className="lp-cta-buttons">
          <button className="lp-btn lp-btn-white lp-btn-lg" onClick={goPatient}>🌸 Start Free Screening</button>
          <button className="lp-btn lp-btn-outline-white lp-btn-lg" onClick={goDoctor}>🩺 Doctor Portal</button>
        </div>
        <p style={{ marginTop:"1.5rem", fontSize:"0.8rem", opacity:0.7 }}>⚠️ For educational & early screening purposes only. Not a medical diagnosis. Consult your doctor for medical advice.</p>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-disclaimer">
          ⚠️ <strong>Disclaimer:</strong> NariCareAI is intended for educational and preliminary screening purposes only. It does not provide medical diagnosis and should not replace consultation with qualified healthcare professionals.
        </div>
        <div className="lp-footer-top">
          <div>
            <div className="lp-footer-logo">Nari<span>Care</span>AI 🌸</div>
            <p className="lp-footer-brand-desc">AI-powered early PCOS risk screening platform. Helping women detect risk and take preventive action through lifestyle guidance and doctor connectivity.</p>
          </div>
          <div className="lp-footer-col"><h5>Platform</h5><ul>{["PCOS Screening","Health Dashboard","Diet Plans","Yoga & Lifestyle","Cycle Tracker"].map(i=><li key={i}><a href="#">{i}</a></li>)}</ul></div>
          <div className="lp-footer-col"><h5>Learn</h5><ul>{["What is PCOS?","Symptoms Guide","PCOS Diet","Research & AI"].map(i=><li key={i}><a href="#">{i}</a></li>)}</ul></div>
          <div className="lp-footer-col"><h5>Doctors</h5><ul>{["Doctor Portal","Patient Reports","Teleconsultation","Join as Doctor"].map(i=><li key={i}><a href="#">{i}</a></li>)}</ul></div>
        </div>
        <div className="lp-footer-bottom">
          <span>© 2025 NariCareAI by Pragya Chauhan — Women in Tech Hackathon</span>
          <span>Built with ❤️ for women's health 🌸</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;