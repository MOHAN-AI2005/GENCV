import { useState } from "react";
import { useRouter } from "next/router";

function BackButton({ to = "/" }) {
  const router = useRouter();
  return (
    <button
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

export default function Login() {
  const [email, setEmail] = useState("reddymohan2048@gmail.com");
  const [password, setPassword] = useState("1234");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) router.push("/dashboard");
  };

  return (
    <main
      style={{
        background: "#f5f6fc",
        minHeight: "100vh",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      <BackButton to="/" />
      <div style={{ textAlign: "center", marginTop: "6vh" }}>
        <image
          src="/learning-hub.png"
          alt="Learning Hub Icon"
          style={{ width: "60px", marginBottom: "1.2em" }}
        />
        <h2 style={{ color: "#2c387e", marginBottom: "1em", fontSize: "2em" }}>
          Sign In to GenCV
        </h2>
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          boxShadow: "0 1px 18px #d9dbe9",
          padding: "2.5em 3em",
          margin: "3vh auto",
          maxWidth: "350px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.8em",
              marginBottom: "1em",
              borderRadius: "8px",
              border: "1px solid #b4aad8",
              fontSize: "1em",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="off"
            style={{
              width: "100%",
              padding: "0.8em",
              marginBottom: "1em",
              borderRadius: "8px",
              border: "1px solid #b4aad8",
              fontSize: "1em",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.8em",
              background: "#6c3e9c",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1.08em",
              boxShadow: "0 2px 6px #aaa",
              cursor: "pointer",
              marginTop: "0.5em",
            }}
          >
            Login
          </button>
        </form>
        <div
          style={{
            background: "#f8f7fa",
            color: "#6c3e9c",
            borderRadius: "8px",
            padding: "1em",
            marginTop: "1.3em",
            fontSize: "1em",
          }}
        >
          <b>Tip:</b> Your GenCV account unlocks AI resume, cover letter, and
          career learning tools!
        </div>
      </div>
    </main>
  );
}
