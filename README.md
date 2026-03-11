# Streamix

# Windowsean, ingurune virtuala eskuz aktibatzeko
python -m venv .venv
.venv\Scripts\activate   
pip install -r requirements.txt

# Programa exekutatzeko
Terminal batean, exekutatu honako komandoa:
python run.py

Beste terminal bat ireki, eta honako komandoak exekutatu.: 
1. cd .\app\frontend
2. npm install
//npm install react-router-dom router, aurrekoarekin ez badu funtzionatzen, hau exekutatu.
3. npm start
login url adibidea:
http://localhost:3000/login

# Kontuetan izan
- Ordenagailu lokalean Node.js deskargatuta eduki behar da (https://nodejs.org/), npm exekutatzeko.
1. Deskargatutako .msi fitxategia exekutatu
2. Instalazioan:
3. Onartu “License agreement”
4. Aukeratu “Next”
5. Helmugako direktorioa utzi bere horretan
6. “Add to PATH” aukera aktibatu → Honek Node.js eta npm komandoak terminalean erabilgarri jartzen ditu
7. Amaitu instalazioa.
8. Egiaztatzeko, ordenagailu lokalean exekutatu: node -v eta npm -v (Bi komandoek balioak erakusten badituzte, instalazioa ondo egin da)
   
- (Behar izanez gero) PATH aldatu eskuz:
1. Windows bilaketa → “Environment Variables”
2. “Edit system environment variables” → “Environment Variables”
3. “System variables” → Path → “Edit” → NIRE KASUAN:
   - C:\Program Files\nodejs\
   - C:\Users\xwang\AppData\Roaming\npm
4. Gorde, eta denak amatatu, eta berriro exekutatu
   
- Python 3.x ere beharrezkoa da Flask backend-rako
