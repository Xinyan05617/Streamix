import React, { useState } from "react";


function Login() {


 const [email, setEmail] = useState("");
 const [pasahitza, setPasahitza] = useState("");
 const [mezua, setMezua] = useState("");


 const sartu = async (e) => {
   e.preventDefault();


   const erantzuna = await fetch("http://127.0.0.1:5000/api/baimena/sartu", {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify({
       email: email,
       pasahitza: pasahitza
     })
   });


   const datuak = await erantzuna.json();


   if (erantzuna.ok) {


     // token gorde
     localStorage.setItem("token", datuak.token);


     setMezua("Login zuzena");


   } else {
     setMezua(datuak.mezua);
   }
 };


 return (
   <div>


     <h2>Identifikatu</h2>


     <form onSubmit={sartu}>


       <input
         type="email"
         placeholder="Email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         required
       />


       <br/>


       <input
         type="password"
         placeholder="Pasahitza"
         value={pasahitza}
         onChange={(e) => setPasahitza(e.target.value)}
         required
       />


       <br/>


       <button type="submit">
         Sartu
       </button>


     </form>


     <p>{mezua}</p>


   </div>
 );
}


export default Login;