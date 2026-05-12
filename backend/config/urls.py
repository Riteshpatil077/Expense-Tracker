# pyrefly: ignore [missing-import]
from django.contrib import admin# pyrefly: ignore [missing-import]

# pyrefly: ignore [missing-import]
from django.urls import path, include
# pyrefly: ignore [missing-import]
from rest_framework.routers import DefaultRouter
# pyrefly: ignore [missing-import]
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# pyrefly: ignore [missing-import]
from apps.users.views import RegisterView, ProfileView
# pyrefly: ignore [missing-import]
from apps.transactions.views import TransactionViewSet, CategoryViewSet
# pyrefly: ignore [missing-import]
from apps.reports.views import ReportView

router = DefaultRouter()
router.register('transactions', TransactionViewSet, basename='transaction')
router.register('categories', CategoryViewSet, basename='category')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/profile/', ProfileView.as_view(), name='profile'),
    path('api/reports/', ReportView.as_view(), name='reports'),
    path('api/', include(router.urls)),
]
