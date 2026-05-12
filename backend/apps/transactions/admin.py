# pyrefly: ignore [missing-import]
from django.contrib import admin
# pyrefly: ignore [missing-import]
from .models import Category, Transaction


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'is_default', 'user', 'color']
    list_filter = ['type', 'is_default']


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['title', 'amount', 'type', 'category', 'date', 'user']
    list_filter = ['type', 'date', 'category']
    search_fields = ['title', 'note']
    date_hierarchy = 'date'
