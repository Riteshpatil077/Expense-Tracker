# pyrefly: ignore [missing-import]
from rest_framework import viewsets, filters
# pyrefly: ignore [missing-import]
from rest_framework.decorators import action
# pyrefly: ignore [missing-import]
from rest_framework.response import Response
# pyrefly: ignore [missing-import]
from django.db.models import Sum, Q
# pyrefly: ignore [missing-import]
from django.utils import timezone
# pyrefly: ignore [missing-import]
from .models import Transaction, Category
# pyrefly: ignore [missing-import]
from .serializers import TransactionSerializer, CategorySerializer

    
class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter(
            Q(user=self.request.user) | Q(is_default=True)
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'note']
    ordering_fields = ['date', 'amount', 'created_at']

    def get_queryset(self):
        qs = Transaction.objects.filter(user=self.request.user).select_related('category')

        tx_type = self.request.query_params.get('type')
        if tx_type:
            qs = qs.filter(type=tx_type)

        month = self.request.query_params.get('month')
        year = self.request.query_params.get('year')
        if month and year:
            qs = qs.filter(date__month=month, date__year=year)

        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category_id=category)

        return qs

    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Monthly income/expense summary with chart data"""
        now = timezone.now()
        month = request.query_params.get('month', now.month)
        year = request.query_params.get('year', now.year)

        qs = Transaction.objects.filter(
            user=request.user, date__month=month, date__year=year
        ).select_related('category')

        total_income = qs.filter(type='income').aggregate(total=Sum('amount'))['total'] or 0
        total_expense = qs.filter(type='expense').aggregate(total=Sum('amount'))['total'] or 0
        balance = total_income - total_expense

        # Budget progress
        profile = request.user
        budget = float(profile.monthly_budget) if profile.monthly_budget else None
        budget_pct = (float(total_expense) / budget * 100) if budget else None

        # Category-wise expense breakdown (for pie chart)
        category_data = list(
            qs.filter(type='expense')
            .values('category__name', 'category__color')
            .annotate(total=Sum('amount'))
            .order_by('-total')
        )

        # Daily trend (for line chart)
        daily_income = (
            qs.filter(type='income')
            .values('date')
            .annotate(total=Sum('amount'))
            .order_by('date')
        )
        daily_expense = (
            qs.filter(type='expense')
            .values('date')
            .annotate(total=Sum('amount'))
            .order_by('date')
        )

        # Merge daily data
        daily_map = {}
        for item in daily_income:
            d = str(item['date'])
            daily_map.setdefault(d, {'date': d, 'income': 0, 'expense': 0})
            daily_map[d]['income'] = float(item['total'])
        for item in daily_expense:
            d = str(item['date'])
            daily_map.setdefault(d, {'date': d, 'income': 0, 'expense': 0})
            daily_map[d]['expense'] = float(item['total'])

        daily_trend = sorted(daily_map.values(), key=lambda x: x['date'])

        return Response({
            'total_income': float(total_income),
            'total_expense': float(total_expense),
            'balance': float(balance),
            'budget': budget,
            'budget_pct': round(budget_pct, 1) if budget_pct is not None else None,
            'category_breakdown': category_data,
            'daily_trend': daily_trend,
        })
