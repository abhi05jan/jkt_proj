from asgiref.sync import sync_to_async
from .models import Book

class BookService:
    @staticmethod
    @sync_to_async
    def get_book(book_id: int):
        return Book.objects.get(id=book_id)