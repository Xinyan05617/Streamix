from flask import Blueprint, request, jsonify, current_app
from app.database.database import Connection
import jwt
import datetime

auth_bp = Blueprint("auth", __name__)

# Datu-baseko konexioa sortu
db = Connection()

# JWT token-ak sortzeko gako sekretua
SECRET_KEY = "streamix_secret"


# -----------------------------
# ERREGISTRATU (erabiltzaile berria sortu)
# -----------------------------
@auth_bp.route("/erregistratu", methods=["POST"])
def erregistratu():

    datuak = request.get_json()

    izena = datuak.get("izena")
    email = datuak.get("email")
    pasahitza = datuak.get("pasahitza")

    # Egiaztatu erabiltzailea existitzen den ala ez
    erabiltzailea = db.select(
        "SELECT * FROM erabiltzaileak WHERE email = ?",
        (email,)
    )

    if erabiltzailea:
        return jsonify({"mezua": "Erabiltzaile hori existitzen da"}), 400

    # Erabiltzaile berria datu-basean sartu
    db.insert(
        "INSERT INTO erabiltzaileak (izena, email, pasahitza) VALUES (?, ?, ?)",
        (izena, email, pasahitza)
    )

    return jsonify({"mezua": "Kontua ongi sortu da"}), 201


# -----------------------------
# SAIO-HASIERA (login)
# -----------------------------
@auth_bp.route("/login", methods=["POST"])
def login():

    datuak = request.get_json()

    email = datuak.get("email")
    pasahitza = datuak.get("pasahitza")

    # Email bidez erabiltzailea bilatu
    erabiltzailea = db.select(
        "SELECT * FROM erabiltzaileak WHERE email = ?",
        (email,)
    )

    if not erabiltzailea:
        return jsonify({"mezua": "Erabiltzaile hori ez da existitzen"}), 404

    erabiltzailea = erabiltzailea[0]

    # Pasahitza egiaztatu
    if erabiltzailea["pasahitza"] != pasahitza:
        return jsonify({"mezua": "Pasahitz okerra"}), 401

    # JWT token-a sortu (2 orduko balioa)
    token = jwt.encode(
        {
            "id": erabiltzailea["id"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        },
        current_app.config['SECRET_KEY'],
        algorithm="HS256"
    )

    return jsonify({
        "mezua": "Login zuzena",
        "token": token
    })