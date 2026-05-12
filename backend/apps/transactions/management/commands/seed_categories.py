# pyrefly: ignore [missing-import]
from django.core.management.base import BaseCommand
# pyrefly: ignore [missing-import]
from apps.transactions.models import Category


DEFAULT_CATEGORIES = [
    # Expense categories
    {'name': 'Food & Dining', 'type': 'expense', 'color': '#EF4444', 'icon': '🍔'},
    {'name': 'Transport', 'type': 'expense', 'color': '#F59E0B', 'icon': '🚌'},
    {'name': 'Shopping', 'type': 'expense', 'color': '#8B5CF6', 'icon': '🛍️'},
    {'name': 'Entertainment', 'type': 'expense', 'color': '#EC4899', 'icon': '🎬'},
    {'name': 'Healthcare', 'type': 'expense', 'color': '#06B6D4', 'icon': '🏥'},
    {'name': 'Education', 'type': 'expense', 'color': '#3B82F6', 'icon': '📚'},
    {'name': 'Utilities', 'type': 'expense', 'color': '#6B7280', 'icon': '💡'},
    {'name': 'Housing', 'type': 'expense', 'color': '#78716C', 'icon': '🏠'},
    {'name': 'Personal Care', 'type': 'expense', 'color': '#F472B6', 'icon': '💅'},
    {'name': 'Other Expense', 'type': 'expense', 'color': '#9CA3AF', 'icon': '💸'},
    # Income categories
    {'name': 'Salary', 'type': 'income', 'color': '#10B981', 'icon': '💼'},
    {'name': 'Freelance', 'type': 'income', 'color': '#34D399', 'icon': '💻'},
    {'name': 'Investment', 'type': 'income', 'color': '#059669', 'icon': '📈'},
    {'name': 'Business', 'type': 'income', 'color': '#065F46', 'icon': '🏢'},
    {'name': 'Gift', 'type': 'income', 'color': '#6EE7B7', 'icon': '🎁'},
    {'name': 'Other Income', 'type': 'income', 'color': '#A7F3D0', 'icon': '💰'},
]


class Command(BaseCommand):
    help = 'Seed default transaction categories'

    def handle(self, *args, **options):
        created = 0
        for cat_data in DEFAULT_CATEGORIES:
            obj, was_created = Category.objects.get_or_create(
                name=cat_data['name'],
                type=cat_data['type'],
                is_default=True,
                defaults={
                    'color': cat_data['color'],
                    'icon': cat_data['icon'],
                    'user': None,
                }
            )
            if was_created:
                created += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully seeded {created} new default categories '
                f'({len(DEFAULT_CATEGORIES) - created} already existed).'
            )
        )
