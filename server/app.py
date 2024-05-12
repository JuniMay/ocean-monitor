from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, User
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)
# https://stackoverflow.com/questions/27766794/switching-from-sqlite-to-mysql-with-flask-sqlalchemy
app.config["SQLALCHEMY_DATABASE_URI"] = (
    # just for testing
    "mysql+pymysql://root:123456@127.0.0.1:3306/ocean_monitor"
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


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
