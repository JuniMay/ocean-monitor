from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, User, HydroData
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
app = Flask(__name__)
CORS(app)
# https://stackoverflow.com/questions/27766794/switching-from-sqlite-to-mysql-with-flask-sqlalchemy
app.config["SQLALCHEMY_DATABASE_URI"] = (
    # just for testing
    "mysql+pymysql://root:Tt102938!@127.0.0.1:3306/ocean_monitor"
)
db.init_app(app)


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    user: User = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password_hash, password):
        return jsonify(
            {
                "message": "Login successful",
                "username": user.username,
                "role": user.role, # the role will be used in the client.
            }
        )
    else:
        return jsonify({"message": "Invalid username or password"}), 401


@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    role = data["role"]
    new_user = User(
        username=username, role=role, password_hash=generate_password_hash(password)
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(
        {
            "message": "Registration successful",
            "username": new_user.username,
            "role": new_user.role, # the role will be used in the client.
        }
    )


@app.route("/api/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify(
        [
            {"id": user.id, "username": user.username, "role": user.role}
            for user in users
        ]
    )


@app.route("/api/users/<int:user_id>", methods=["PUT"])
def update_user_role(user_id):
    data = request.get_json()
    new_role = data["role"]
    user = db.session.get(User, user_id)
    if user:
        user.role = new_role
        db.session.commit()
        return jsonify({"message": "User role updated"})
    else:
        return jsonify({"message": "User not found"}), 404

@app.route("/api/hydrodata", methods=["POST"])
def add_hydrodata():
    data = request.get_json()
    location = data["location"]
    date = datetime.strptime(data["date"], "%Y-%m-%d")
    water_temperature = data["water_temperature"]
    pH = data["pH"]
    dissolved_oxygen = data["dissolved_oxygen"]
    conductivity = data["conductivity"]
    turbidity = data["turbidity"]
    permanganate_index = data["permanganate_index"]
    ammonia_nitrogen = data["ammonia_nitrogen"]
    total_phosphorus = data["total_phosphorus"]
    total_nitrogen = data["total_nitrogen"]

    new_data = HydroData(
        location=location,
        date=date,
        water_temperature=water_temperature,
        pH=pH,
        dissolved_oxygen=dissolved_oxygen,
        conductivity=conductivity,
        turbidity=turbidity,
        permanganate_index=permanganate_index,
        ammonia_nitrogen=ammonia_nitrogen,
        total_phosphorus=total_phosphorus,
        total_nitrogen=total_nitrogen
    )
    db.session.add(new_data)
    db.session.commit()
    return jsonify({"message": "HydroData added successfully", "data": data})

@app.route("/api/hydrodata", methods=["GET"])
def get_hydrodata():
    hydrodata = HydroData.query.all()
    return jsonify([{
        "id": data.id,
        "location": data.location,
        "date": data.date.strftime("%Y-%m-%d"),
        "water_temperature": data.water_temperature,
        "pH": data.pH,
        "dissolved_oxygen": data.dissolved_oxygen,
        "conductivity": data.conductivity,
        "turbidity": data.turbidity,
        "permanganate_index": data.permanganate_index,
        "ammonia_nitrogen": data.ammonia_nitrogen,
        "total_phosphorus": data.total_phosphorus,
        "total_nitrogen": data.total_nitrogen
    } for data in hydrodata])

@app.route("/api/hydrodata/<int:data_id>", methods=["PUT"])
def update_hydrodata(data_id):
    data = request.get_json()
    hydrodata = db.session.get(HydroData, data_id)
    if hydrodata:
        hydrodata.location = data["location"]
        hydrodata.date = datetime.strptime(data["date"], "%Y-%m-%d")
        hydrodata.water_temperature = data["water_temperature"]
        hydrodata.pH = data["pH"]
        hydrodata.dissolved_oxygen = data["dissolved_oxygen"]
        hydrodata.conductivity = data["conductivity"]
        hydrodata.turbidity = data["turbidity"]
        hydrodata.permanganate_index = data["permanganate_index"]
        hydrodata.ammonia_nitrogen = data["ammonia_nitrogen"]
        hydrodata.total_phosphorus = data["total_phosphorus"]
        hydrodata.total_nitrogen = data["total_nitrogen"]
        db.session.commit()
        return jsonify({"message": "HydroData updated successfully"})
    else:
        return jsonify({"message": "HydroData not found"}), 404

@app.route("/api/hydrodata/<int:data_id>", methods=["DELETE"])
def delete_hydrodata(data_id):
    hydrodata = db.session.get(HydroData, data_id)
    if hydrodata:
        db.session.delete(hydrodata)
        db.session.commit()
        return jsonify({"message": "HydroData deleted successfully"})
    else:
        return jsonify({"message": "HydroData not found"}), 404


# @app.route("api")
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
