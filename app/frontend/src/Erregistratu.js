// Erregistratu.js
import React, { useState } from "react";
import "./App.css";

function Erregistratu() {
  const [izena, setIzena] = useState("");
  const [email, setEmail] = useState("");
  const [pasahitza, setPasahitza] = useState("");
  const [pasahitza2, setPasahitza2] = useState("");
  const [mezua, setMezua] = useState("");

  // Erregistroa bidaltzeko funtzioa
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Pasahitzak berdinak diren egiaztatu
    if (pasahitza !== pasahitza2) {
      setMezua("Pasahitzak ez datoz bat!");
      return;
    }

    try {
      const erantzuna = await fetch("http://127.0.0.1:5000/api/auth/erregistratu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ izena, email, pasahitza })
      });

      const datuak = await erantzuna.json();

      if (erantzuna.ok) {
        setMezua(datuak.mezua);
        // Saioa hasi aurretik login-era bideratu
        setTimeout(() => { window.location.href = "/login"; }, 1500);
      } else {
        setMezua(datuak.mezua || "Errore ezezaguna");
      }

    } catch (error) {
      setMezua("Errorea serverrekin komunikatzean");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Erregistratu</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              className="input"
              placeholder="Izena"
              value={izena}
              onChange={(e) => setIzena(e.target.value)}
              required
            />
          </div>

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

          <div className="input-group">
            <input
              className="input"
              type="password"
              placeholder="Pasahitza errepikatu"
              value={pasahitza2}
              onChange={(e) => setPasahitza2(e.target.value)}
              required
            />
          </div>

          <button className="button" type="submit">
            Erregistratu
          </button>
        </form>

        {mezua && (
          <p className={`message ${mezua.includes("kontua") || mezua.includes("zuzena") ? "success" : "error"}`}>
            {mezua}
          </p>
        )}

        <p className="text-center">
          Dagoeneko kontua duzu? <a href="/login">Identifikatu</a>
        </p>
      </div>
    </div>
  );
}

export default Erregistratu;