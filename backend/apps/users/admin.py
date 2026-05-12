from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ['email', 'username', 'currency', 'monthly_budget', 'is_active']
    fieldsets = UserAdmin.fieldsets + (
        ('Finance', {'fields': ('currency', 'monthly_budget')}),
    )
