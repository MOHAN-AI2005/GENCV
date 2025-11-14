import { useState } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";

// Back button at fixed top-left
function BackButton({ to = "/login" }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push(to)}
      style={{
        position: "fixed",
        top: "2.4em",
        left: "2.4em",
        background: "#eee",
        color: "#2c387e",
        padding: "0.55em 1.1em",
        borderRadius: "6px",
        border: "none",
        fontWeight: "bold",
        zIndex: 10,
        cursor: "pointer",
        fontSize: "1em",
        boxShadow: "0 1px 6px #ccc",
      }}
    >
      &#8592; Back
    </button>
  );
}

const sectionStyle = {
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 1px 8px #dedcf7",
  padding: "1.2em 2em 1.5em 2em",
  minWidth: "245px",
  flex: "1 1 240px",
  marginBottom: "1em",
};
const headerStyle = {
  color: "#6c3e9c",
  marginBottom: "0.7em",
  fontWeight: "bold",
  fontSize: "1.13em",
};
const inputStyle = {
  width: "100%",
  padding: "0.7em",
  marginBottom: "1em",
  borderRadius: "8px",
  border: "1px solid #b4aad8",
  fontSize: "1em",
};
const buttonStyle = {
  background: "#5e40e9",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1.13em",
  border: "none",
  borderRadius: "10px",
  padding: "1.15em 2.3em",
  boxShadow: "0 2px 6px #b4aad8",
  marginTop: "1.2em",
  cursor: "pointer",
  transition: "background 0.18s",
};

export default function Dashboard() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedIn: "",
    objective: "",
    education: "",
    skills: "",
    experience: "",
    projects: "",
    achievements: "",
    extracurricular: "",
    languages: "",
    references: "",
    jobDescription: "",
  });

  // Certificates block
  const [certFiles, setCertFiles] = useState([]);
  const onDrop = (acceptedFiles) => setCertFiles(acceptedFiles);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const certNames = certFiles.map((f) => f.name).join(", ");
    const apiPayload = { ...form, certifications: certNames };

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiPayload),
    });
    const data = await res.json();
    setLoading(false);
    router.push({
      pathname: "/output",
      query: { cv: encodeURIComponent(data.result) },
    });
  };

  return (
    <main
      style={{
        background: "#f5f6fc",
        minHeight: "100vh",
        fontFamily: "Segoe UI, Arial, sans-serif",
        position: "relative",
      }}
    >
      <BackButton to="/login" />
      <form onSubmit={handleSubmit}>
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "2em",
            justifyContent: "center",
          }}
        >
          {/* Info sections */}
          <section style={sectionStyle}>
            <h3 style={headerStyle}>Personal Information</h3>
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              name="linkedIn"
              placeholder="LinkedIn / Website"
              value={form.linkedIn}
              onChange={handleChange}
              style={inputStyle}
            />
          </section>
          <section style={sectionStyle}>
            <h3 style={headerStyle}>Career Objective</h3>
            <textarea
              name="objective"
              placeholder="Objective Statement"
              value={form.objective}
              onChange={handleChange}
              rows={2}
              style={inputStyle}
            />
          </section>
          <section style={sectionStyle}>
            <h3 style={headerStyle}>Education</h3>
            <input
              name="education"
              placeholder="Education"
              value={form.education}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </section>
          <section style={sectionStyle}>
            <h3 style={headerStyle}>Skills & Languages</h3>
            <input
              name="skills"
              placeholder="Skills (comma separated)"
              value={form.skills}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              name="languages"
              placeholder="Languages"
              value={form.languages}
              onChange={handleChange}
              style={inputStyle}
            />
          </section>
          <section style={sectionStyle}>
            <h3 style={headerStyle}>Experience & Projects</h3>
            <textarea
              name="experience"
              placeholder="Experience"
              value={form.experience}
              onChange={handleChange}
              rows={2}
              style={inputStyle}
            />
            <textarea
              name="projects"
              placeholder="Projects (brief descriptions)"
              value={form.projects}
              onChange={handleChange}
              rows={2}
              style={inputStyle}
            />
          </section>
          <section style={sectionStyle}>
            <h3 style={headerStyle}>Achievements & Activities</h3>
            <input
              name="achievements"
              placeholder="Achievements/Awards"
              value={form.achievements}
              onChange={handleChange}
              style={inputStyle}
            />
            <textarea
              name="extracurricular"
              placeholder="Extracurricular Activities"
              value={form.extracurricular}
              onChange={handleChange}
              rows={2}
              style={inputStyle}
            />
          </section>
          <section style={sectionStyle}>
            <h3 style={headerStyle}>References</h3>
            <input
              name="references"
              placeholder="References"
              value={form.references}
              onChange={handleChange}
              style={inputStyle}
            />
          </section>
          <section style={sectionStyle}>
            <h3 style={headerStyle}>Target Job Description</h3>
            <textarea
              name="jobDescription"
              placeholder="Job Description (for cover letter tailoring)"
              value={form.jobDescription}
              onChange={handleChange}
              rows={3}
              style={inputStyle}
            />
          </section>
          {/* Certificates Upload Block */}
          <section
            style={{
              ...sectionStyle,
              border: "2px dashed #a699ce",
              background: "#f7f8fd",
              minWidth: "325px",
              marginTop: "2em",
            }}
          >
            <h3 style={headerStyle}>Upload Certificates</h3>
            <div
              {...getRootProps()}
              style={{
                padding: "1.2em",
                background: "#eceaff",
                border: "2px dashed #a699ce",
                borderRadius: "10px",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop files here...</p>
              ) : (
                <p>
                  Drag & drop certificates here, or click to select files
                  <br />
                  <small>(PDF, JPG, PNG accepted)</small>
                </p>
              )}
            </div>
            <div style={{ marginTop: "1em", fontSize: "0.98em" }}>
              {certFiles.length > 0 && (
                <div>
                  <b>Selected Files:</b>
                  <ul style={{ textAlign: "left" }}>
                    {certFiles.map((file) => (
                      <li key={file.path || file.name}>
                        {file.name} ({Math.round(file.size / 1024)} KB)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        </div>
        {/* Generate Button at Bottom Center */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2.8em 0 2.2em 0",
          }}
        >
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? (
              <span>
                <span className="loading-dots">⏳ Generating...</span>
              </span>
            ) : (
              "Generate Resume & Cover Letter"
            )}
          </button>
        </div>
      </form>
      <style jsx>{`
        .loading-dots {
          animation: blink 1s infinite alternate;
        }
        @keyframes blink {
          100% {
            opacity: 0.3;
          }
        }
      `}</style>
    </main>
  );
}
