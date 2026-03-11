// Erregistratu.js
import React, { useState } from "react";


function Erregistratu() {
 const [izena, setIzena] = useState("");
 const [email, setEmail] = useState("");
 const [pasahitza, setPasahitza] = useState("");
 const [pasahitza2, setPasahitza2] = useState("");
 const [mezua, setMezua] = useState("");


 const handleSubmit = async (e) => {
   e.preventDefault();


   if (pasahitza !== pasahitza2) {
     setMezua("Pasahitzak ez datoz bat!");
     return;
   }


   try {
     const erantzuna = await fetch("http://127.0.0.1:5000/api/baimena/erregistratu", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         izena,
         email,
         pasahitza,
       }),
     });


     const datuak = await erantzuna.json();
     if (erantzuna.ok) {
       setMezua(datuak.mezua);
     } else {
       setMezua(datuak.mezua || "Errore ezezaguna");
     }
   } catch (error) {
     setMezua("Errorea serverrekin komunikatzean");
   }
 };


 return (
   <div style={{ maxWidth: "400px", margin: "auto" }}>
     <h2>Erregistratu</h2>
     <form onSubmit={handleSubmit}>
       <div>
         <label>Izena:</label>
         <input value={izena} onChange={(e) => setIzena(e.target.value)} required />
       </div>
       <div>
         <label>Email:</label>
         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
       </div>
       <div>
         <label>Pasahitza:</label>
         <input type="password" value={pasahitza} onChange={(e) => setPasahitza(e.target.value)} required />
       </div>
       <div>
         <label>Pasahitza errepikatu:</label>
         <input type="password" value={pasahitza2} onChange={(e) => setPasahitza2(e.target.value)} required />
       </div>
       <button type="submit">Erregistratu</button>
     </form>
     {mezua && <p>{mezua}</p>}
   </div>
 );
}


export default Erregistratu;