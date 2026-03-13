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

    // --- PASahitzaren SEGURTASUN EGIAZTAPENAK ---
    // 1. Gutxieneko luzera (8 karaktere)
    if (pasahitza.length < 8) {
      setMezua("Pasahitzak 8 karaktere izan behar ditu gutxienez");
      return;
    }

    // 2. Letra larri bat behar du
    if (!/[A-Z]/.test(pasahitza)) {
      setMezua("Pasahitzak letra larri bat behar du");
      return;
    }

    // 3. Zenbaki bat behar du
    if (!/[0-9]/.test(pasahitza)) {
      setMezua("Pasahitzak zenbaki bat behar du");
      return;
    }

    // 4. Karaktere berezi bat behar du (aukerazkoa, baina gomendagarria)
    if (!/[!@#$%^&*]/.test(pasahitza)) {
      setMezua("Pasahitzak karaktere berezi bat behar du (!@#$%^&*)");
      return;
    }
    // -------------------------------------------

    // Pasahitzak berdinak diren egiaztatu
    if (pasahitza !== pasahitza2) {
      setMezua("Pasahitzak ez datoz bat!");
      return;
    }

    try {
      const erantzuna = await fetch("http://127.0.0.1:5000/api/auth/erregistratu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ izena, email, pasahitza })  // Pasahitza bidali (backend-ek hashatuko du)
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

  // --- PASahitzaren INDARRA NEURTZEKO FUNTZIOA ---
  const getPasswordStrength = () => {
    let strength = 0;
    if (pasahitza.length >= 8) strength++;
    if (/[A-Z]/.test(pasahitza)) strength++;
    if (/[0-9]/.test(pasahitza)) strength++;
    if (/[!@#$%^&*]/.test(pasahitza)) strength++;
    return strength;
  };

  const getStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength <= 1) return "#ef4444";  // Gorria - Ahula
    if (strength <= 3) return "#f59e0b";  // Laranja - Ertaina
    return "#10b981";  // Berdea - Indartsua
  };

  const getStrengthText = () => {
    const strength = getPasswordStrength();
    if (strength <= 1) return "Ahula";
    if (strength <= 3) return "Ertaina";
    return "Indartsua";
  };
  // ---------------------------------------------

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

            {/* --- PASahitzaren INDARRA ERANSI --- */}
            {pasahitza && (
              <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{
                  height: '4px',
                  width: '100%',
                  background: '#333',
                  borderRadius: '2px'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${(getPasswordStrength() / 4) * 100}%`,
                    background: getStrengthColor(),
                    borderRadius: '2px',
                    transition: 'width 0.3s'
                  }} />
                </div>
                <p style={{
                  fontSize: '0.8rem',
                  margin: '0.2rem 0 0 0',
                  color: getStrengthColor(),
                  textAlign: 'right'
                }}>
                  {getStrengthText()}
                </p>
              </div>
            )}
            {/* --------------------------------- */}
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