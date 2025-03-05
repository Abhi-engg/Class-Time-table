
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import TimetableViewSet, register_user, login_user, logout_user

router = DefaultRouter()
router.register(r'api/timetable', TimetableViewSet, basename='timetable')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api/register/', register_user, name='register'),
    path('api/login/', login_user, name='login'),
    path('api/logout/', logout_user, name='logout'),
] 