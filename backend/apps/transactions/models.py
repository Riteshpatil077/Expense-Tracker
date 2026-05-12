# pyrefly: ignore [missing-import]
from django.db import models
# pyrefly: ignore [missing-import]
from django.conf import settings


class Category(models.Model):
    TYPES = [('income', 'Income'), ('expense', 'Expense')]
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=10, choices=TYPES)
    icon = models.CharField(max_length=50, blank=True)
    color = models.CharField(max_length=20, blank=True, default='#6366F1')
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True, blank=True,
        related_name='categories'
    )
    is_default = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'categories'
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.type})"


class Transaction(models.Model):
    TYPES = [('income', 'Income'), ('expense', 'Expense')]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='transactions'
    )
    title = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    type = models.CharField(max_length=10, choices=TYPES)
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='transactions'
    )
    date = models.DateField()
    note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date', '-created_at']

    def __str__(self):
        return f"{self.title} — {self.amount} ({self.type})"
