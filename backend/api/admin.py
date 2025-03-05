from django.contrib import admin
from .models import Timetable

@admin.register(Timetable)
class TimetableAdmin(admin.ModelAdmin):
    list_display = ('class_name', 'subject', 'day', 'start_time', 'end_time', 'faculty', 'room')
    list_filter = ('day', 'department', 'year', 'type')
    search_fields = ('class_name', 'subject', 'faculty', 'room')
