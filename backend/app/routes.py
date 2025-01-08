from flask import Blueprint, request, jsonify
from .models import User, Book
from . import db

main = Blueprint('main', __name__)

@main.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([{'id': book.id, 'title': book.title, 'author': book.author, 'status': book.status} for book in books])

@main.route('/books', methods=['POST'])
def add_book():
    data = request.get_json()
    new_book = Book(title=data['title'], author=data['author'], genre=data['genre'], status=data['status'], user_id=data['user_id'])
    db.session.add(new_book)
    db.session.commit()
    return jsonify({'message': 'Book added successfully!'})
