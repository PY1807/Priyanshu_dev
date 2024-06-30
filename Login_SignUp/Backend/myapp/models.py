from django.db import models
from .db_connection import db
import uuid

# Create your models here.
# class Sign(models.model):
person=db['Person']
Login=db['Login']
class SignUp(models.Model):
    username=models.CharField(max_length=30,default="A")
    first_name = models.CharField(max_length=30,default="A")
    last_name = models.CharField(max_length=30,default="A")
    age=models.CharField(max_length=3,default="A")
    country=models.CharField(max_length=15,default="A")
    Sec=models.CharField(max_length=75,default="A")
    email_address=models.CharField(max_length=40,default="A")
    ans=models.CharField(max_length=15,default="A")
    password1=models.CharField(max_length=255,default="A")
    password2=models.CharField(max_length=255,default="A")
    password3=models.CharField(max_length=255,default="A")

    class Meta:
        db_table= "user"

class Login_Detail(models.Model):
    username=models.CharField(max_length=30,default="A")
    Date=models.CharField(max_length=12,default="A")
    Time=models.CharField(max_length=16,default="A")
    Status=models.CharField(max_length=16,default="A")

    class Meta:
        db_table="Login"