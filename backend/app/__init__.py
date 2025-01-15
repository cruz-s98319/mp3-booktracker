from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:password@localhost:5432/book_tracker'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # Import and register blueprints
    from app.routes import app_bp
    app.register_blueprint(app_bp)

    return app
