from flask import Blueprint, request, jsonify
from .models.gemini_model import get_gemini_response

api_blueprint = Blueprint("api", __name__)

@api_blueprint.route("/process-input", methods=["POST"])
def process_input():
    user_input = request.json.get("input")

    # Validate user input
    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    # Pass input to the Gemini model
    ai_response = get_gemini_response(user_input)

    return jsonify({"response": ai_response}), 200

@api_blueprint.route("/save-destination", methods=["POST"])
def save_destination():
    data = request.json
    destination = data.get("destination")
    travel_dates = data.get("dates")

    # Validate input
    if not destination or not travel_dates:
        return jsonify({"error": "Destination and travel dates are required"}), 400

    # Insert into MongoDB
    db = request.app.db
    try:
        db.destinations.insert_one({"destination": destination, "dates": travel_dates})
        return jsonify({"message": "Destination saved successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Internal Server Error
