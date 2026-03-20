"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useInView(threshold = 0.05) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const features = [
  {
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    title: "Log Workouts",
    desc: "Track every set, rep and weight. Build your training history with detailed exercise logging.",
    bg: "#eef2ff", iconBg: "#c7d2fe", iconColor: "#4338ca",
  },
  {
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    title: "Track Progress",
    desc: "Visualise your gains with beautiful charts. See weekly volume, streaks and personal records.",
    bg: "#d1fae5", iconBg: "#6ee7b7", iconColor: "#065f46",
  },
  {
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    title: "Follow Athletes",
    desc: "Stay connected with friends and coaches. Get live updates when people you follow hit PRs.",
    bg: "#fef3c7", iconBg: "#fcd34d", iconColor: "#92400e",
  },
  {
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
    title: "Coach Plans",
    desc: "Coaches can create structured multi-week programs. Athletes subscribe and follow along.",
    bg: "#ede9fe", iconBg: "#c4b5fd", iconColor: "#5b21b6",
  },
  {
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: "Live Feed",
    desc: "Real-time activity feed powered by Socket.io. Know the moment your network trains.",
    bg: "#ccfbf1", iconBg: "#5eead4", iconColor: "#0f766e",
  },
  {
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    title: "Photo Uploads",
    desc: "Add photos to your workouts and profile. Powered by Cloudinary for fast delivery.",
    bg: "#ffe4e6", iconBg: "#fda4af", iconColor: "#9f1239",
  },
];

const steps = [
  { number: "01", title: "Create your account", desc: "Sign up as an athlete or coach in under 60 seconds. No credit card needed." },
  { number: "02", title: "Log your first workout", desc: "Record exercises, sets, reps and weight. Add photos to document your sessions." },
  { number: "03", title: "Connect with others", desc: "Follow athletes and coaches. Get real-time updates from your network." },
  { number: "04", title: "Track your growth", desc: "Watch your progress charts grow. Stay consistent and hit your goals." },
];

export default function HomePage() {
  const [heroRef, heroIn] = useInView(0.05);
  const [featRef, featIn] = useInView(0.05);
  const [stepsRef, stepsIn] = useInView(0.05);
  const [ctaRef, ctaIn] = useInView(0.05);
  const [statsRef, statsIn] = useInView(0.05);

  const s = {
    page: { minHeight: "100vh", backgroundColor: "#ffffff", overflowX: "hidden", fontFamily: "system-ui, -apple-system, sans-serif" },
    nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid #f1f5f9" },
    navInner: { maxWidth: "1152px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" },
    logo: { display: "flex", alignItems: "center", gap: "10px" },
    logoBox: { width: "32px", height: "32px", backgroundColor: "#4f46e5", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" },
    logoText: { color: "white", fontSize: "13px", fontWeight: 700 },
    logoLabel: { fontSize: "18px", fontWeight: 700, color: "#0f172a" },
    navLinks: { display: "flex", alignItems: "center", gap: "12px" },
    signIn: { padding: "8px 16px", fontSize: "14px", fontWeight: 500, color: "#475569", textDecoration: "none", borderRadius: "8px" },
    getStarted: { padding: "8px 18px", fontSize: "14px", fontWeight: 600, color: "white", backgroundColor: "#4f46e5", textDecoration: "none", borderRadius: "8px" },
    hero: { position: "relative", paddingTop: "120px", paddingBottom: "100px", paddingLeft: "24px", paddingRight: "24px", overflow: "hidden" },
    heroCenter: { position: "relative", maxWidth: "800px", margin: "0 auto", textAlign: "center" },
    badge: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", backgroundColor: "#eef2ff", border: "1px solid #c7d2fe", borderRadius: "9999px", marginBottom: "24px" },
    badgeDot: { width: "8px", height: "8px", backgroundColor: "#6366f1", borderRadius: "9999px", display: "inline-block" },
    badgeText: { fontSize: "11px", fontWeight: 700, color: "#4338ca", letterSpacing: "0.08em", textTransform: "uppercase" },
    h1: { fontSize: "clamp(36px, 6vw, 62px)", fontWeight: 800, color: "#0f172a", lineHeight: 1.12, marginBottom: "24px" },
    highlight: { position: "relative", display: "inline-block" },
    highlightText: { position: "relative", zIndex: 1, color: "#4f46e5" },
    highlightBar: { position: "absolute", bottom: "4px", left: 0, right: 0, height: "14px", backgroundColor: "#e0e7ff", borderRadius: "4px", zIndex: 0 },
    sub: { fontSize: "clamp(16px, 2.5vw, 20px)", color: "#64748b", maxWidth: "580px", margin: "0 auto 40px", lineHeight: 1.7 },
    ctaBtns: { display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "36px" },
    btnPrimary: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", backgroundColor: "#4f46e5", color: "white", fontWeight: 700, fontSize: "16px", borderRadius: "12px", textDecoration: "none", boxShadow: "0 4px 14px rgba(79,70,229,0.35)" },
    btnSecondary: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", backgroundColor: "white", color: "#374151", fontWeight: 600, fontSize: "16px", borderRadius: "12px", textDecoration: "none", border: "1px solid #e2e8f0" },
    socialProof: { display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" },
    socialText: { fontSize: "14px", color: "#64748b" },
    mockWrap: { position: "relative", maxWidth: "780px", margin: "64px auto 0" },
    mockCard: { backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "20px", boxShadow: "0 20px 60px rgba(0,0,0,0.1)", overflow: "hidden" },
    mockBar: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid #f1f5f9", backgroundColor: "#f8fafc" },
    mockStats: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", padding: "16px", borderBottom: "1px solid #f1f5f9" },
    mockBody: { display: "grid", gridTemplateColumns: "1fr 1fr" },
    mockFeed: { padding: "16px", borderRight: "1px solid #f1f5f9" },
    mockChart: { padding: "16px" },
    sectionLabel: { fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" },
    chartBars: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "6px", height: "80px" },
    statsSection: { padding: "56px 24px", backgroundColor: "#f8fafc", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9" },
    statsGrid: { maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px", textAlign: "center" },
    featSection: { padding: "88px 24px", backgroundColor: "#ffffff" },
    featInner: { maxWidth: "1100px", margin: "0 auto" },
    featHeader: { textAlign: "center", marginBottom: "56px" },
    featGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" },
    featCard: { padding: "28px", borderRadius: "16px", cursor: "default", transition: "transform 0.3s ease, box-shadow 0.3s ease" },
    featIconBox: { width: "48px", height: "48px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" },
    stepsSection: { padding: "88px 24px", backgroundColor: "#f8fafc", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9" },
    stepsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" },
    stepCard: { backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "28px", transition: "transform 0.3s ease, box-shadow 0.3s ease" },
    rolesSection: { padding: "88px 24px", backgroundColor: "#ffffff" },
    rolesGrid: { maxWidth: "960px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" },
    ctaSection: { padding: "88px 24px" },
    ctaBox: { position: "relative", backgroundColor: "#4f46e5", borderRadius: "24px", padding: "72px 32px", textAlign: "center", overflow: "hidden" },
    footer: { borderTop: "1px solid #f1f5f9", padding: "40px 24px" },
    footerInner: { maxWidth: "1100px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" },
  };

  const fade = (inView, delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  return (
    <div style={s.page}>

      {/* Navbar */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <div style={s.logo}>
            <div style={s.logoBox}>
              <span style={s.logoText}>FS</span>
            </div>
            <span style={s.logoLabel}>FitSync</span>
          </div>
          <div style={s.navLinks}>
            <Link href="/auth/login" style={s.signIn}>Sign In</Link>
            <Link href="/auth/register" style={s.getStarted}>Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} style={s.hero}>
        {/* Blobs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)", width: "700px", height: "500px", backgroundColor: "#eef2ff", borderRadius: "9999px", opacity: 0.7, filter: "blur(80px)" }} />
          <div style={{ position: "absolute", top: "60px", right: "-80px", width: "300px", height: "300px", backgroundColor: "#d1fae5", borderRadius: "9999px", opacity: 0.5, filter: "blur(60px)" }} />
          <div style={{ position: "absolute", bottom: 0, left: "-60px", width: "280px", height: "280px", backgroundColor: "#fef3c7", borderRadius: "9999px", opacity: 0.4, filter: "blur(60px)" }} />
        </div>

        <div style={s.heroCenter}>

          {/* Badge */}
          <div style={{ ...s.badge, ...fade(heroIn, 0) }}>
            <span style={s.badgeDot} />
            <span style={s.badgeText}>Real-time fitness tracking</span>
          </div>

          {/* H1 */}
          <h1 style={{ ...s.h1, ...fade(heroIn, 150) }}>
            Track your fitness.{" "}
            <span style={s.highlight}>
              <span style={s.highlightText}>Stay connected.</span>
              <span style={s.highlightBar} />
            </span>
          </h1>

          {/* Sub */}
          <p style={{ ...s.sub, ...fade(heroIn, 250) }}>
            Log workouts, track progress with charts, follow athletes, and get
            live updates from your training network — all in one place.
          </p>

          {/* Buttons */}
          <div style={{ ...s.ctaBtns, ...fade(heroIn, 350) }}>
            <Link href="/auth/register" style={s.btnPrimary}>
              Start for free
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/auth/login" style={s.btnSecondary}>
              Sign in
            </Link>
          </div>

          {/* Social proof */}
          <div style={{ ...s.socialProof, ...fade(heroIn, 500) }}>
            <div style={{ display: "flex" }}>
              {[
                { l: "A", bg: "#6366f1" }, { l: "B", bg: "#10b981" },
                { l: "C", bg: "#f59e0b" }, { l: "D", bg: "#8b5cf6" },
                { l: "E", bg: "#f43f5e" },
              ].map((a, i) => (
                <div key={i} style={{ width: "32px", height: "32px", borderRadius: "9999px", border: "2px solid white", backgroundColor: a.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "white", marginLeft: i === 0 ? 0 : "-8px" }}>
                  {a.l}
                </div>
              ))}
            </div>
            <p style={s.socialText}>Join athletes already training smarter</p>
          </div>
        </div>

        {/* Mock dashboard */}
        <div style={{ ...s.mockWrap, ...fade(heroIn, 400) }}>
          <div style={s.mockCard}>

            {/* Top bar */}
            <div style={s.mockBar}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "24px", height: "24px", backgroundColor: "#4f46e5", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "white", fontSize: "10px", fontWeight: 700 }}>FS</span>
                </div>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#374151" }}>Dashboard</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "8px", height: "8px", backgroundColor: "#10b981", borderRadius: "9999px", display: "inline-block" }} />
                <span style={{ fontSize: "12px", color: "#94a3b8" }}>Live</span>
              </div>
            </div>

            {/* Stats */}
            <div style={s.mockStats}>
              {[
                { label: "Workouts", value: "48", bg: "#eef2ff" },
                { label: "Plans", value: "3", bg: "#d1fae5" },
                { label: "Followers", value: "126", bg: "#fef3c7" },
                { label: "Following", value: "89", bg: "#ede9fe" },
              ].map((stat) => (
                <div key={stat.label} style={{ backgroundColor: stat.bg, borderRadius: "12px", padding: "12px" }}>
                  <p style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a" }}>{stat.value}</p>
                  <p style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Feed + chart */}
            <div style={s.mockBody}>
              <div style={s.mockFeed}>
                <p style={s.sectionLabel}>Live Feed</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { name: "Alex R.", action: "logged Push Day", bg: "#6366f1", time: "2m ago" },
                    { name: "Sam K.", action: "created 8-Week Plan", bg: "#10b981", time: "15m ago" },
                    { name: "Jordan M.", action: "started following you", bg: "#f59e0b", time: "1h ago" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "9999px", backgroundColor: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "white", flexShrink: 0 }}>
                        {item.name[0]}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "12px", color: "#374151", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          <strong>{item.name}</strong> {item.action}
                        </p>
                        <p style={{ fontSize: "11px", color: "#94a3b8" }}>{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={s.mockChart}>
                <p style={s.sectionLabel}>This Week</p>
                <div style={s.chartBars}>
                  {[30, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%", justifyContent: "flex-end" }}>
                      <div style={{ width: "100%", borderRadius: "4px 4px 0 0", backgroundColor: i === 5 ? "#4f46e5" : "#c7d2fe", height: heroIn ? `${h}%` : "0%", transition: `height 0.7s ease ${0.6 + i * 0.08}s` }} />
                      <span style={{ fontSize: "10px", color: "#cbd5e1" }}>{["S","M","T","W","T","F","S"][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating notif */}
          <div style={{ position: "absolute", top: "-16px", right: "20px", backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "8px 14px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: "8px", ...fade(heroIn, 800) }}>
            <span style={{ width: "8px", height: "8px", backgroundColor: "#10b981", borderRadius: "9999px", display: "inline-block" }} />
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}>Alex logged a new PR!</p>
          </div>

          {/* Floating badge */}
          <div style={{ position: "absolute", bottom: "-16px", left: "20px", backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "8px 14px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: "8px", ...fade(heroIn, 900) }}>
            <div style={{ width: "24px", height: "24px", backgroundColor: "#eef2ff", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#4f46e5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>+12% this week</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} style={s.statsSection}>
        <div style={s.statsGrid}>
          {[
            { value: "10K+", label: "Workouts Logged", color: "#4f46e5" },
            { value: "500+", label: "Active Athletes", color: "#059669" },
            { value: "200+", label: "Coach Plans", color: "#d97706" },
            { value: "Real-time", label: "Live Activity Feed", color: "#7c3aed" },
          ].map((stat, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "4px", ...fade(statsIn, i * 100) }}>
              <p style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, color: stat.color }}>{stat.value}</p>
              <p style={{ fontSize: "13px", color: "#64748b" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section ref={featRef} style={s.featSection}>
        <div style={s.featInner}>
          <div style={{ ...s.featHeader, ...fade(featIn, 0) }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", backgroundColor: "#d1fae5", border: "1px solid #a7f3d0", borderRadius: "9999px", marginBottom: "16px" }}>
              <span style={{ width: "8px", height: "8px", backgroundColor: "#10b981", borderRadius: "9999px", display: "inline-block" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#065f46", letterSpacing: "0.08em", textTransform: "uppercase" }}>Everything you need</span>
            </div>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>Built for serious athletes</h2>
            <p style={{ fontSize: "16px", color: "#64748b", maxWidth: "520px", margin: "0 auto" }}>Every feature is designed around how real athletes and coaches actually train and communicate.</p>
          </div>
          <div style={s.featGrid}>
            {features.map((f, i) => (
              <div
                key={i}
                style={{ ...s.featCard, backgroundColor: f.bg, ...fade(featIn, i * 80) }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ ...s.featIconBox, backgroundColor: f.iconBg, color: f.iconColor }}>{f.icon}</div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>{f.title}</h3>
                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section ref={stepsRef} style={s.stepsSection}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px", ...fade(stepsIn, 0) }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", backgroundColor: "#eef2ff", border: "1px solid #c7d2fe", borderRadius: "9999px", marginBottom: "16px" }}>
              <span style={{ width: "8px", height: "8px", backgroundColor: "#6366f1", borderRadius: "9999px", display: "inline-block" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#4338ca", letterSpacing: "0.08em", textTransform: "uppercase" }}>How it works</span>
            </div>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>Up and running in minutes</h2>
            <p style={{ fontSize: "16px", color: "#64748b", maxWidth: "480px", margin: "0 auto" }}>No complicated setup. Just sign up and start tracking.</p>
          </div>
          <div style={s.stepsGrid}>
            {steps.map((step, i) => (
              <div
                key={i}
                style={{ ...s.stepCard, ...fade(stepsIn, i * 120) }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.07)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <span style={{ display: "block", fontSize: "32px", fontWeight: 800, color: "#f1f5f9", marginBottom: "16px", lineHeight: 1 }}>{step.number}</span>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section style={s.rolesSection}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>For athletes and coaches</h2>
            <p style={{ fontSize: "16px", color: "#64748b", maxWidth: "480px", margin: "0 auto" }}>Whether you're training or coaching, FitSync has the tools you need.</p>
          </div>
          <div style={s.rolesGrid}>
            {[
              {
                border: "#c7d2fe", blobBg: "#eef2ff", iconBg: "#c7d2fe", iconColor: "#4338ca", btnBg: "#4f46e5",
                title: "I'm an Athlete", href: "/auth/register",
                icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
                checkBg: "#c7d2fe", checkColor: "#4338ca", btnLabel: "Join as Athlete",
                items: ["Log every workout with detailed exercises", "Track progress with beautiful charts", "Follow coaches and get structured plans", "Stay motivated with a live activity feed"],
              },
              {
                border: "#a7f3d0", blobBg: "#d1fae5", iconBg: "#6ee7b7", iconColor: "#065f46", btnBg: "#059669",
                title: "I'm a Coach", href: "/auth/register",
                icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
                checkBg: "#6ee7b7", checkColor: "#065f46", btnLabel: "Join as Coach",
                items: ["Create structured multi-week workout plans", "Build a subscriber base of athletes", "Share workouts with your community", "Grow your coaching presence online"],
              },
            ].map((role, i) => (
              <div
                key={i}
                style={{ position: "relative", backgroundColor: "white", border: `1px solid ${role.border}`, borderRadius: "20px", padding: "28px", overflow: "hidden", transition: "box-shadow 0.3s ease, transform 0.3s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ position: "absolute", top: 0, right: 0, width: "120px", height: "120px", backgroundColor: role.blobBg, borderRadius: "9999px", transform: "translate(40%, -40%)" }} />
                <div style={{ position: "relative" }}>
                  <div style={{ width: "48px", height: "48px", backgroundColor: role.iconBg, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", color: role.iconColor }}>{role.icon}</div>
                  <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>{role.title}</h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                    {role.items.map((item, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <div style={{ width: "20px", height: "20px", backgroundColor: role.checkBg, borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke={role.checkColor}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span style={{ fontSize: "14px", color: "#475569" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={role.href} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 20px", backgroundColor: role.btnBg, color: "white", fontSize: "14px", fontWeight: 600, borderRadius: "10px", textDecoration: "none" }}>
                    {role.btnLabel}
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} style={s.ctaSection}>
        <div style={{ maxWidth: "720px", margin: "0 auto", ...fade(ctaIn, 0) }}>
          <div style={s.ctaBox}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "180px", height: "180px", backgroundColor: "#6366f1", borderRadius: "9999px", transform: "translate(-40%, -40%)", opacity: 0.5 }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "220px", height: "220px", backgroundColor: "#4338ca", borderRadius: "9999px", transform: "translate(35%, 35%)", opacity: 0.5 }} />
            <div style={{ position: "relative" }}>
              <h2 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 800, color: "white", marginBottom: "16px" }}>Ready to train smarter?</h2>
              <p style={{ fontSize: "17px", color: "#c7d2fe", maxWidth: "480px", margin: "0 auto 32px", lineHeight: 1.6 }}>Join FitSync today and take your fitness tracking to the next level. It's completely free.</p>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "16px" }}>
                <Link href="/auth/register" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", backgroundColor: "white", color: "#4f46e5", fontWeight: 700, fontSize: "15px", borderRadius: "12px", textDecoration: "none", boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}>
                  Get started free
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/auth/login" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", backgroundColor: "#6366f1", color: "white", fontWeight: 600, fontSize: "15px", borderRadius: "12px", textDecoration: "none", border: "1px solid #818cf8" }}>
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "28px", height: "28px", backgroundColor: "#4f46e5", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: "11px", fontWeight: 700 }}>FS</span>
            </div>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#374151" }}>FitSync</span>
          </div>
          <p style={{ fontSize: "13px", color: "#94a3b8", textAlign: "center" }}>Built with Next.js, Express.js and MongoDB Atlas</p>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link href="/auth/login" style={{ fontSize: "13px", color: "#64748b", textDecoration: "none" }}>Sign In</Link>
            <Link href="/auth/register" style={{ fontSize: "13px", color: "#64748b", textDecoration: "none" }}>Register</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media (max-width: 640px) {
          .mock-stats { grid-template-columns: repeat(2,1fr) !important; }
          .mock-body { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}