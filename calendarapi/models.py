from django.db import models

# Create your models here.
# Create your models here.
class Event(models.Model):
    title = models.TextField(null=True, blank=True)
    start = models.DateTimeField()
    end = models.DateTimeField(null=True)
    allDay = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title[0:20]