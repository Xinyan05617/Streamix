# run.py
from flask import Flask
from flask_cors import CORS
from app.backend.auth import baimena_bp  # 你的认证蓝图

app = Flask(__name__)
CORS(app)  # 允许跨域，前端 fetch 才能调用
app.config['SECRET_KEY'] = 'zure_gako_sekretua'

# 注册蓝图
app.register_blueprint(baimena_bp, url_prefix='/api/baimena')

if __name__ == "__main__":
    app.run(debug=True)