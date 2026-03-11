from flask import Blueprint, request, jsonify
from app.database.database import Connection
import jwt
import datetime

baimena_bp = Blueprint("baimena", __name__)

# 数据库对象
db = Connection()
#SECRET_KEY = os.environ.get("SECRET_KEY")
SECRET_KEY = "streamix_secret"


# -----------------------------
# ERREGISTRATU (注册)
# -----------------------------
@baimena_bp.route("/erregistratu", methods=["POST"])
def erregistratu():

    datuak = request.get_json()

    izena = datuak.get("izena")
    email = datuak.get("email")
    pasahitza = datuak.get("pasahitza")

    # 检查用户是否已经存在
    erabiltzailea = db.select(
        "SELECT * FROM erabiltzaileak WHERE email = ?",
        (email,)
    )

    if erabiltzailea:
        return jsonify({"mezua": "Erabiltzaile hori existitzen da"}), 400

    # 插入新用户
    db.insert(
        "INSERT INTO erabiltzaileak (izena, email, pasahitza) VALUES (?, ?, ?)",
        (izena, email, pasahitza)
    )

    return jsonify({"mezua": "Kontua ongi sortu da"}), 201


# -----------------------------
# LOGIN (登录)
# -----------------------------
@baimena_bp.route("/sartu", methods=["POST"])
def sartu():

    datuak = request.get_json()

    email = datuak.get("email")
    pasahitza = datuak.get("pasahitza")

    erabiltzailea = db.select(
        "SELECT * FROM erabiltzaileak WHERE email = ?",
        (email,)
    )

    if not erabiltzailea:
        return jsonify({"mezua": "Erabiltzaile hori ez da existitzen"}), 404

    erabiltzailea = erabiltzailea[0]

    if erabiltzailea["pasahitza"] != pasahitza:
        return jsonify({"mezua": "Pasahitz okerra"}), 401

    # JWT token
    token = jwt.encode(
        {
            "id": erabiltzailea["id"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({
        "mezua": "Login zuzena",
        "token": token
    })