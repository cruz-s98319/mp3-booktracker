from flask import Blueprint, jsonify, request
from app.models import Book
from app import db

app_bp = Blueprint('app_bp', __name__)

@app_bp.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    books_data = [
        {
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'genre': book.genre,
            'status': book.status
        } for book in books
    ]
    return jsonify(books_data)

@app_bp.route('/books', methods=['POST'])
def add_book():
    data = request.get_json()
    title = data.get('title')
    author = data.get('author')
    genre = data.get('genre')
    status = data.get('status', 'Reading')

    if not title or not author:
        return jsonify({'error': 'Title and author are required!'}), 400

    new_book = Book(title=title, author=author, genre=genre, status=status)
    db.session.add(new_book)
    db.session.commit()

    return jsonify({'message': 'Book added successfully!'})

@app_bp.route('/books/<int:book_id>', methods=['PATCH'])
def update_status(book_id):
    book = Book.query.get_or_404(book_id)
    data = request.get_json()
    new_status = data.get('status')

    if new_status not in ['Reading', 'Complete']:
        return jsonify({'error': 'Invalid status'}), 400

    book.status = new_status
    db.session.commit()
    return jsonify({
        'id': book.id,
        'title': book.title,
        'author': book.author,
        'genre': book.genre,
        'status': book.status
    })
