from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

app = Flask(__name__)
CORS(app)

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", ""),
    "database": os.getenv("DB_NAME", "research_portal")
}


def get_db():
    return mysql.connector.connect(**DB_CONFIG)


@app.route("/api/opportunities", methods=["POST"])
def create_opportunity():
    data = request.get_json()

    required = [
        "research_title",
        "research_description",
        "research_area",
        "faculty_name",
        "department",
        "required_skills",
        "available_positions",
        "application_deadline",
        "status"
    ]

    for field in required:
        if field not in data or str(data[field]).strip() == "":
            return jsonify({"error": field + " is required"}), 400

    try:
        positions = int(data["available_positions"])
        if positions < 1:
            return jsonify({"error": "available_positions must be at least 1"}), 400
    except:
        return jsonify({"error": "available_positions must be a number"}), 400

    if data["status"] not in ["Open", "Closed"]:
        return jsonify({"error": "status must be Open or Closed"}), 400

    try:
        db = get_db()
        cursor = db.cursor()

        sql = """
        INSERT INTO opportunities
        (research_title, research_description, research_area,
         faculty_name, department, required_skills,
         available_positions, application_deadline, status)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        values = (
            data["research_title"],
            data["research_description"],
            data["research_area"],
            data["faculty_name"],
            data["department"],
            data["required_skills"],
            positions,
            data["application_deadline"],
            data["status"]
        )

        cursor.execute(sql, values)
        db.commit()
        new_id = cursor.lastrowid

        cursor.close()
        db.close()

        return jsonify({
            "message": "Research opportunity created",
            "id": new_id
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/opportunities", methods=["GET"])
def get_all_opportunities():
    try:
        db = get_db()
        cursor = db.cursor(dictionary=True)

        cursor.execute("SELECT * FROM opportunities ORDER BY id DESC")
        opportunities = cursor.fetchall()

        cursor.close()
        db.close()

        return jsonify(opportunities), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/opportunities/<int:opportunity_id>", methods=["GET"])
def get_one_opportunity(opportunity_id):
    try:
        db = get_db()
        cursor = db.cursor(dictionary=True)

        cursor.execute(
            "SELECT * FROM opportunities WHERE id = %s",
            (opportunity_id,)
        )

        opportunity = cursor.fetchone()

        cursor.close()
        db.close()

        if opportunity is None:
            return jsonify({"error": "Research opportunity not found"}), 404

        return jsonify(opportunity), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/opportunities/<int:opportunity_id>", methods=["PUT"])
def update_opportunity(opportunity_id):
    data = request.get_json()

    allowed = [
        "research_title",
        "research_description",
        "research_area",
        "faculty_name",
        "department",
        "required_skills",
        "available_positions",
        "application_deadline",
        "status"
    ]

    fields = []
    values = []

    for field in allowed:
        if field in data:
            fields.append(field + " = %s")
            values.append(data[field])

    if len(fields) == 0:
        return jsonify({"error": "No fields to update"}), 400

    if "status" in data and data["status"] not in ["Open", "Closed"]:
        return jsonify({"error": "status must be Open or Closed"}), 400

    if "available_positions" in data:
        try:
            positions = int(data["available_positions"])
            if positions < 1:
                return jsonify({
                    "error": "available_positions must be at least 1"
                }), 400

            index = fields.index("available_positions = %s")
            values[index] = positions
        except:
            return jsonify({
                "error": "available_positions must be a number"
            }), 400

    try:
        db = get_db()
        cursor = db.cursor()

        values.append(opportunity_id)

        sql = (
            "UPDATE opportunities SET "
            + ", ".join(fields)
            + " WHERE id = %s"
        )

        cursor.execute(sql, tuple(values))

        if cursor.rowcount == 0:
            cursor.close()
            db.close()
            return jsonify({
                "error": "Research opportunity not found"
            }), 404

        db.commit()

        cursor.close()
        db.close()

        return jsonify({
            "message": "Research opportunity updated"
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/opportunities/<int:opportunity_id>", methods=["DELETE"])
def delete_opportunity(opportunity_id):
    try:
        db = get_db()
        cursor = db.cursor()

        cursor.execute(
            "DELETE FROM opportunities WHERE id = %s",
            (opportunity_id,)
        )

        if cursor.rowcount == 0:
            cursor.close()
            db.close()
            return jsonify({
                "error": "Research opportunity not found"
            }), 404

        db.commit()

        cursor.close()
        db.close()

        return jsonify({
            "message": "Research opportunity deleted"
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
