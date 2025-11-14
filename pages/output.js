import { useRouter } from "next/router";
import { jsPDF } from "jspdf";

// Optionally clean residual placeholders, but good prompt should avoid this
function cleanLLMOutput(raw) {
  return raw
    .replace(/\[.*?\]/g, "") // Remove any bracketed placeholders, if present
    .trim();
}

export default function OutputPage() {
  const router = useRouter();
  const { cv = "" } = router.query;
  const cleanedOutput = cleanLLMOutput(cv ? decodeURIComponent(cv) : "");

  const handleDownload = () => {
    const doc = new jsPDF({
      unit: "pt",
      format: "a4",
      orientation: "portrait",
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(cleanedOutput, 490);
    doc.text(lines, 40, 60);
    doc.save("Resume_and_Cover_Letter.pdf");
  };

  return (
    <main
      style={{
        background: "#f5f6fc",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          maxWidth: "820px",
          borderRadius: "16px",
          boxShadow: "0 1px 18px #dfddee",
          padding: "2.5em 2.2em",
          margin: "4vh 2vw",
        }}
      >
        <h1
          style={{
            color: "#6c3e9c",
            marginBottom: "1.2em",
            textAlign: "center",
            fontFamily: "Segoe UI, Arial, Verdana, sans-serif",
            fontWeight: "bold",
          }}
        >
          Resume & Cover Letter
        </h1>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            fontFamily: "Calibri, Arial, Verdana, 'Segoe UI', sans-serif",
            fontSize: "1.09em",
            color: "#232323",
            background: "#fcfcfb",
            borderRadius: "8px",
            padding: "1.5em 1em",
            lineHeight: "1.80",
            marginBottom: "1.6em",
          }}
        >
          {cleanedOutput || "Output will appear here."}
        </pre>
        <div style={{ display: "flex", gap: "1em" }}>
          <button
            style={{
              background: "#6c3e9c",
              color: "#fff",
              border: "none",
              borderRadius: "9px",
              padding: "1em 2em",
              fontWeight: "bold",
              fontSize: "1.03em",
              cursor: "pointer",
              boxShadow: "0 2px 4px #eee",
            }}
            onClick={handleDownload}
          >
            Download as PDF
          </button>
          <button
            style={{
              background: "#edeaff",
              color: "#54319d",
              border: "none",
              borderRadius: "9px",
              padding: "1em 2em",
              fontWeight: "bold",
              fontSize: "1.03em",
              cursor: "pointer",
              boxShadow: "0 2px 4px #eee",
            }}
            onClick={() => router.back()}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}
