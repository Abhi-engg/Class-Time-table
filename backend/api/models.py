from django.db import models

# Create your models here.

class Timetable(models.Model):
    DAYS_OF_WEEK = [
        ('MON', 'Monday'),
        ('TUE', 'Tuesday'),
        ('WED', 'Wednesday'),
        ('THU', 'Thursday'),
        ('FRI', 'Friday'),
        ('SAT', 'Saturday'),
        ('SUN', 'Sunday'),
    ]

    CLASS_TYPES = [
        ('LECTURE', 'Lecture'),
        ('LAB', 'Laboratory'),
        ('TUTORIAL', 'Tutorial'),
        ('SEMINAR', 'Seminar'),
    ]

    class_name = models.CharField(max_length=100)
    day = models.CharField(max_length=3, choices=DAYS_OF_WEEK)
    start_time = models.TimeField()
    end_time = models.TimeField()
    subject = models.CharField(max_length=100)
    faculty = models.CharField(max_length=100)
    room = models.CharField(max_length=50)
    type = models.CharField(max_length=10, choices=CLASS_TYPES, default='LECTURE')
    department = models.CharField(max_length=100)
    year = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.class_name} - {self.subject} ({self.day})"

    class Meta:
        ordering = ['day', 'start_time']
