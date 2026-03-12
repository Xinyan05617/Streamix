# run.py
from flask import Flask
from flask_cors import CORS
from app.backend.auth import auth_bp  # Autentifikazio blueprint-a inportatu

app = Flask(__name__)
CORS(app)  # CORS aktibatu, frontend-eko fetch eskaerek backend-a deitu ahal izateko
app.config['SECRET_KEY'] = 'streamix_secret'  # Aplikazioaren gako sekretua

# Blueprint-a erregistratu
app.register_blueprint(auth_bp, url_prefix="/api/auth")

if __name__ == "__main__":
    app.run(debug=True)  # Flask zerbitzaria debug moduan abiarazi