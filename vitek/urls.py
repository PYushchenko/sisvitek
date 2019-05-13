from django.urls import path, include
from rest_framework import routers

from . import views


router = routers.DefaultRouter(trailing_slash=False)
router.register(r'transactions', views.TransactionViewSet)
router.register(r'places', views.PlaceViewSet)
router.register(r'tags', views.TagsTransactionViewSet)

urlpatterns = [
    path(r'api/', include(router.urls)),
    path(r'api/chart', views.PayoutsChartNewView.as_view()),
    path(r'api/chart_category', views.CategoryChartView.as_view()),
    path(r'test', views.test),
    path('', views.index, name='index'),
]