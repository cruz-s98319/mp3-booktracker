from flask import Blueprint, request, jsonify
from app.models import db, Book
from flask_cors import cross_origin

app_bp = Blueprint('app_bp', __name__)

@app_bp.route('/books', methods=['POST'])
@cross_origin(origin='http://localhost:3000')

def add_book():
    data = request.get_json()

    # Extract book details from the request
    title = data.get('title')
    author = data.get('author')
    genre = data.get('genre')
    # published_date = data.get('published_date')

    # Validate input
    if not title or not author:
        return jsonify({'error': 'Title and author are required.'}), 400

    # Create a new book instance
    new_book = Book(
        title=title,
        author=author,
        genre=genre,
        # published_date=published_date
    )

    # Add the new book to the database
    db.session.add(new_book)
    db.session.commit()

    return jsonify({'message': 'Book added successfully!', 'book': {
        'title': title,
        'author': author,
        'genre': genre,
        # 'published_date': published_date
    }}), 201
