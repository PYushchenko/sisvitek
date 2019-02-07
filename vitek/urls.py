from django.urls import path, include
from rest_framework import routers

from . import views


router = routers.DefaultRouter(trailing_slash=False)
router.register(r'transactions', views.TransactionViewSet)
router.register(r'outcome_transactions', views.OutcomeTransactionViewSet)
router.register(r'income_transactions', views.IncomeTransactionViewSet)
router.register(r'transfer_transactions', views.TransferTransactionViewSet)
router.register(r'places', views.PlaceViewSet)
router.register(r'tags', views.TagsTransactionViewSet)

urlpatterns = [
    path(r'api/', include(router.urls)),
    path(r'test', views.test),
    path('', views.index, name='index'),
]