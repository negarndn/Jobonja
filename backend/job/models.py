from datetime import datetime, timedelta
from django.contrib.auth.models import User
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
# from django.contrib.gis.db import models as gismodels
# from django.contrib.gis.geos import Point
# import geocoder
# import os


def return_date_time():
    now = datetime.now()
    return datetime.now() + timedelta(days=10)


class JobType(models.TextChoices):
    Permanent = 'Permanent'
    Temporary = 'Temporary'
    Internship = 'Internship'


class Education(models.TextChoices):
    Bachelors = 'Bachelors'
    Masters = 'Masters'
    Phd = 'Phd'


class Industry(models.TextChoices):
    Business = 'Business'
    IT = 'IT'
    Banking = 'Banking'
    Education = 'Education'
    Telecommunication = 'Telecommunication'
    Others = 'Others'


class Experience(models.TextChoices):
    No_Experience = 'No Experience'
    One_Year = '1 Year'
    Two_Years = '2 Years'
    Three_Years_Above = '3 Years Above'



class Job(models.Model):
    title = models.CharField(max_length=200, null=True)
    description = models.TextField(null=True)
    email = models.EmailField(null=True)
    address = models.CharField(max_length=100, null=True)
    jobType = models.CharField(
        max_length=20,
        choices=JobType.choices,
        default=JobType.Permanent
    )
    education = models.CharField(
        max_length=20,
        choices=Education.choices,
        default=Education.Bachelors
    )
    industry = models.CharField(
        max_length=50,
        choices=Industry.choices,
        default=Industry.Business
    )
    experience = models.CharField(
        max_length=20,
        choices=Experience.choices,
        default=Experience.No_Experience
    )
    salary = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(100000000)])
    positions = models.IntegerField(default=1)
    company = models.CharField(max_length=250, null=True)
    # point = gismodels.PointField(default=Point(0.0, 0.0))
    lastDate = models.DateTimeField(default=return_date_time)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    createAt = models.DateTimeField(auto_now_add=True)

    # def save(self, *args, **kwargs):
    #     g = geocoder.mapquest(self.address, key=os.environ.get('GEOCODER_API'))
    #
    #     print(g)
    #
    #     lng = g.lng
    #     lat = g.lat
    #     self.point = Point(lng, lat)
    #     super(Job, self).save(*args, **kwargs)