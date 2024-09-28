from flask import Flask, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Configure your Gemini model using the API key from the environment variable
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

# Create the model
generation_config = {
    "temperature": 0.5,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="tunedModels/tripstructuremodel2-vfxwyryl3i6r",
    generation_config=generation_config,
)

# Start a chat session
chat_session = model.start_chat(history=[])


def get_gemini_response(user_input):
    # Send the user input message to the chat session
    response = chat_session.send_message(user_input)
    return response.text.strip()


def process_input():
    try:
        user_input = request.json.get(
            "input"
        )  # Get the user's message from the frontend
        if not user_input:
            return jsonify({"error": "No input provided"}), 400

        # Process the input through the Gemini model
        gemini_response = get_gemini_response(user_input)

        return jsonify({"response": gemini_response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Initialize Flask application
app = Flask(__name__)


# Define route for processing input
@app.route("/process-input", methods=["POST"])
def handle_input():
    return process_input()


# Run the application
if __name__ == "__main__":
    app.run(debug=True)
