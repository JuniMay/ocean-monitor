from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(2048), nullable=False)
    role = db.Column(db.String(20), nullable=False)

class HydroData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date, nullable=False)
    water_temperature = db.Column(db.Float, nullable=False)  # 水温
    pH = db.Column(db.Float, nullable=False)  # pH
    dissolved_oxygen = db.Column(db.Float, nullable=False)  # 溶氧量
    conductivity = db.Column(db.Float, nullable=False)  # 电导率
    turbidity = db.Column(db.Float, nullable=False)  # 浊度
    permanganate_index = db.Column(db.Float, nullable=False)  # 高锰酸盐指数
    ammonia_nitrogen = db.Column(db.Float, nullable=False)  # 氨氮
    total_phosphorus = db.Column(db.Float, nullable=False)  # 总磷
    total_nitrogen = db.Column(db.Float, nullable=False)  # 总氮
