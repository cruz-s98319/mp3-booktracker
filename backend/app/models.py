from app import db

# class User(db.Model):
#     __tablename__ = 'users'
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(150), unique=True, nullable=False)
#     password = db.Column(db.String(255), nullable=False)

class Book(db.Model):
    __tablename__ = 'books'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), default='Reading')
    # published_date = db.Column(db.Date, nullable=True)

# class UserBook(db.Model):
#     __tablename__ = 'user_books'
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
#     status = db.Column(db.String(50), default='want to read')
