from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv
from pymongo import MongoClient

# Load environment variables from .env file
load_dotenv()


def create_app():
    app = Flask(__name__)
    CORS(app)

    # Database configuration
    mongo_uri = os.getenv("MONGO_URI")
    client = MongoClient(mongo_uri)
    app.db = client["travel_assistant_db"]

    # Register routes
    from .routes import api_blueprint

    app.register_blueprint(api_blueprint)

    return app
