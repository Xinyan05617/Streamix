// Login.js
import React, { useState } from "react";
import "./App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [pasahitza, setPasahitza] = useState("");
  const [mezua, setMezua] = useState("");

  // Saioa hasteko funtzioa
  const sartu = async (e) => {
    e.preventDefault();

    const erantzuna = await fetch("http://127.0.0.1:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pasahitza })
    });

    const datuak = await erantzuna.json();

    if (erantzuna.ok) {
      localStorage.setItem("token", datuak.token);
      setMezua("Login zuzena");  // Saioa ondo hasi da
    } else {
      setMezua(datuak.mezua);   // Error mezua
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Identifikatu</h2>

        <form onSubmit={sartu}>
          <div className="input-group">
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              className="input"
              type="password"
              placeholder="Pasahitza"
              value={pasahitza}
              onChange={(e) => setPasahitza(e.target.value)}
              required
            />
          </div>

          <button className="button" type="submit">
            Sartu
          </button>
        </form>

        {mezua && (
          <p className={`message ${mezua.includes("zuzena") ? "success" : "error"}`}>
            {mezua}
          </p>
        )}

        <p className="text-center">
          Ez duzu konturik? <a href="/erregistratu">Erregistratu</a>
        </p>
      </div>
    </div>
  );
}

export default Login;