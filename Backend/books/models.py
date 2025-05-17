from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    genre = models.CharField(max_length=100, blank=True)
    year_published = models.IntegerField(blank=True, null=True)
    summary = models.TextField(blank=True)

    class Meta:
        db_table = "books_book"

    def __str__(self):
        return self.title