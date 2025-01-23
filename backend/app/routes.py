# from flask import Blueprint, request, jsonify
# from app.models import db, Book
# from flask_cors import cross_origin

# app_bp = Blueprint('app_bp', __name__)

# @app_bp.route('/books', methods=['POST'])
# @cross_origin(origin='http://localhost:3000')

# def add_book():
#     data = request.get_json()

#     # Extract book details from the request
#     title = data.get('title')
#     author = data.get('author')
#     genre = data.get('genre')
#     # published_date = data.get('published_date')

#     # Validate input
#     if not title or not author:
#         return jsonify({'error': 'Title and author are required.'}), 400

#     # Create a new book instance
#     new_book = Book(
#         title=title,
#         author=author,
#         genre=genre,
#         # published_date=published_date
#     )

#     # Add the new book to the database
#     db.session.add(new_book)
#     db.session.commit()

#     return jsonify({'message': 'Book added successfully!', 'book': {
#         'title': title,
#         'author': author,
#         'genre': genre,
#         # 'published_date': published_date
#     }}), 201

from flask import jsonify, request
from app.models import Book
from app import db

app_bp = Blueprint('app_bp', __name__)

@app_bp.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    books_data = [{'id': book.id, 'title': book.title, 'author': book.author, 'status': book.status} for book in books]
    return jsonify(books_data)

@app_bp.route('/books', methods=['POST'])
def add_book():
    data = request.json
    new_book = Book(title=data['title'], author=data['author'], status='Reading')
    db.session.add(new_book)
    db.session.commit()
    return jsonify({'id': new_book.id, 'title': new_book.title, 'author': new_book.author, 'status': new_book.status}), 201

@app_bp.route('/books/<int:book_id>', methods=['PUT'])
def update_book_status(book_id):
    data = request.json
    book = Book.query.get(book_id)
    if not book:
        return jsonify({'error': 'Book not found'}), 404
    book.status = data.get('status', book.status)
    db.session.commit()
    return jsonify({'id': book.id, 'title': book.title, 'author': book.author, 'status': book.status})
