from flask import Blueprint, jsonify, request
from .models import User, Book, UserBook, db

app_bp = Blueprint('app', __name__)

@app_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{ "id": user.id, "username": user.username, "email": user.email } for user in users])

@app_bp.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([{ "id": book.id, "title": book.title, "author": book.author } for book in books])

@app_bp.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({ "message": "User added successfully!" })
