import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        textAlign: "center",
        minHeight: "100vh",
        background: "#f5f6fc",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      {/* Top center icon */}
      <header style={{ margin: "7vh 0 2vh 0" }}>
        <img
          src="/cv-icon.png"
          alt="CV Icon"
          style={{ width: "80px", marginBottom: "1em" }}
        />
        <h1
          style={{
            color: "#2c387e",
            marginBottom: "0.25em",
            fontSize: "2.3em",
          }}
        >
          Welcome to GenCV
        </h1>
        <div style={{ color: "#6c3e9c", fontSize: "1.2em" }}>
          AI Resume & Cover Letter Generator for Students
        </div>
      </header>
      {/* Feature cards */}
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2.5em",
          flexWrap: "wrap",
          margin: "4em 0",
        }}
      >
        <FeatureCard
          icon="/cv-templates-icon.png"
          title="CV Templates"
          description="Choose and customize professional resume designs easily."
        />
        <FeatureCard
          icon="/cover-letter-icon.png"
          title="Cover Letter AI"
          description="Instantly generate tailored cover letters for your jobs."
        />
        <FeatureCard
          icon="/learning-hub.png"
          title="Learning Hub"
          description="Tips & tricks for improving your resume and career skills."
        />
        <FeatureCard
          icon="/diagram-guidance-icon.png"
          title="Diagrams & Guidance"
          description="Understand CV structure and best practices visually."
        />
      </section>
      {/* Button and footer stay the same */}
      <Link href="/login">
        <button
          style={{
            fontSize: "1.2em",
            padding: "1em 2em",
            background: "#2c387e",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            marginTop: "3em",
            boxShadow: "0 2px 6px #aaa",
            cursor: "pointer",
          }}
        >
          Login / Get Started
        </button>
      </Link>
      <footer
        style={{
          marginTop: "7em",
          color: "#7e7f94",
          fontSize: "0.98em",
          paddingBottom: "2em",
        }}
      >
        Educational Project - IIIT Dharwad | Free Student Access <br />
        Made using Next.js + React
      </footer>
    </main>
  );
}

// Updated FeatureCard
function FeatureCard({ icon, title, description }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "1.5em",
        width: "230px",
        borderRadius: "14px",
        boxShadow: "0 1px 10px #d9dbe9",
        textAlign: "center",
        marginBottom: "1em",
      }}
    >
      <img
        src={icon}
        alt={title}
        style={{ width: "44px", marginBottom: "0.5em" }}
      />
      <h4 style={{ color: "#2c387e", fontSize: "1.15em" }}>{title}</h4>
      <p style={{ color: "#424242", fontSize: "1em", margin: "0.7em 0 0 0" }}>
        {description}
      </p>
    </div>
  );
}
