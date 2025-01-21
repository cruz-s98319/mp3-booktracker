from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Database configuration
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:1903Dybala!@localhost:5432/book_tracker'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://cruzs98319:1903Dybala!@localhost:5433/book_tracker'

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions
    db.init_app(app)

    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    # Import and register blueprints
    from app.routes import app_bp
    app.register_blueprint(app_bp)

    return app
