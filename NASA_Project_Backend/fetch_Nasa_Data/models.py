from django.db import models

# Create your models here.

class Photo_Data(models.Model):
    title = models.CharField(max_length=50)
    date = models.CharField(max_length=20)
    copyright = models.CharField(max_length=50, blank=True, null=True)  # Make this optional
    explanation = models.TextField()
    hdurl = models.URLField()
