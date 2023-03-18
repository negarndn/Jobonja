from datetime import *
from django.contrib.auth.models import User
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.gis.db import models as gismodels
from django.contrib.gis.geos import Point


def return_date_time():
    now = datetime.now()
    return now + datetime.timedelta(days=10)


class JobType(models.TextChoices):
    Permanent = 'تمام وقت'
    Temporary = 'پاره وقت'
    Internship = 'کارآموزی'


class Education(models.TextChoices):
    Bachelors = 'کارشناسی'
    Masters = 'کارشناسی ارشد'
    Phd = 'دکتری'


class Industry(models.TextChoices):
    Business = 'تجارت'
    IT = 'فناوری اطلاعات'
    Banking = 'حسابداری'
    Education = 'آموزش'
    Telecommunication = 'مخابرات'
    Others = 'دیگر'


class Experience(models.TextChoices):
    noExperience = 'بدون تجربه'
    oneYear = '1 سال'
    twoYear = '2 سال'
    threeYearAbove = 'بیشتر از 3 سال'



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
        default=Experience.noExperience
    )
    salary = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(100000000)])
    positions = models.IntegerField(default=1)
    company = models.CharField(max_length=250, null=True)
    point = gismodels.PointField(default=Point(0.0, 0.0))
    lastDate = models.DateTimeField(default=return_date_time)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    createAt = models.DateTimeField(auto_now_add=True)