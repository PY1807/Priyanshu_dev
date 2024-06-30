from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .models import person,Login,SignUp,Login_Detail
from django.http import JsonResponse,HttpResponse
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password,check_password
import json
from datetime import datetime
import pytz
import smtplib
from django.core.mail import send_mail
from django.conf import settings
import random
from django.views.decorators.csrf import csrf_exempt

import os
import logging.config

# Path to the httpd directory
a='../../../../../..'
LOG_DIR = '/opt/homebrew/var/log/httpd/'  # Update this path to your actual httpd directory path

# Full path to the custom log file
log_file_path = os.path.join(LOG_DIR, 'custom.log')

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': log_file_path,
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
        'custom': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}

# Apply logging configuration
logging.config.dictConfig(LOGGING)
logger=logging.getLogger('custom')





def index(request):
  return render(request,'index.html')

@api_view(['POST'])
def add(request):
  # data = request.data
  data = json.loads(request.body)
  name=data['username']
  email=data['email']
  

  def is_valid_email_domain(email):
    # Extract domain from email address
    domain = email.split('@')[-1]

    # List of known valid domains
    valid_domains = [  'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'icloud.com',
    'mail.com',
    'zoho.com',
    'inbox.com',
    'live.com',
    'fastmail.com','gmail.co.uk',
    'hotmail.co.uk',
    'yahoo.co.uk',
    'sky.com','hotmail.fr','yahoo.co.jp',
    'hotmail.co.jp',
    'docomo.ne.jp','yahoo.com.au','yahoo.de',
    'hotmail.de','yahoo.co.za','hotmail.com.br',
    'gmail.com.br',
    'yahoo.com.br','yahoo.it',
    'hotmail.it','vodafone.it',
    'yahoo.com.mx',
    'hotmail.com.mx','gmail.com.mx',
    'yahoo.com.ar',
    'hotmail.com.ar',
    'live.com.ar', 'hotmail.com.co',
    'yahoo.com.co',
    'gmail.com.co',
    'outlook.com.co',
    'hotmail.es',
    'yahoo.es',
    'gmail.es','mail.com',
    'email.com','googlemail.com',
    'outlook.com',
    'live.com','office365.com',
    'outlook.co.uk', 'yahoo.com.ua',
    'yahoo.com.ru',
    'yahoo.com.cn',
    'yahoo.co.uk','yahoo.co.in','facebook.com',
    'twitter.com','instagram.com','x.com','whatsapp.com']  # Add more valid domains as needed

    # Check if the domain is in the list of valid domains
    return domain in valid_domains

# Example usage:


  if is_valid_email_domain(email)==False:
    message=f'Email was wrong, {name} could not Sign Up'
    logger.info(message)
    return JsonResponse({"status": "unsuccessful", "message": "Wrong Email"})


  
  user = person.find_one({"username": name})
  
  if user:
     message=f'Person with same username already exists, {name} could not Sign Up'
     logger.info(message)
     return JsonResponse({"status": "unsuccessful", "message": "A person with same username already exists"})
  hashed_password = make_password(data['password'])
  us=SignUp(username=data['username'],
    first_name= data['firstName'],
    last_name= data['lastName'],
    age=data['age'],
    country=data['country'],
    Sec=data['select'],
    ans=data['ans'],
    email_address=data['email'],
    password1=hashed_password,
    password2="",
    password3="")
  us.save()
  
  records={
     "username":data['username'],
    "firstname": data['firstName'],
    "lastname": data['lastName'],
    "age":data['age'],
    "country":data['country'],
    "Security Question":data['select'],
    "Answer":data['ans'],
    "email":data['email'],
    "password1":hashed_password,
    "password2":"",
    "password3":""
  }
  # username=user['username']
  message=f'{name} Signed Up'
  logger.info(message)
  person.insert_one(records)
  return HttpResponse("Yes")

@api_view(['POST'])
def login(request):
  # data = request.data
  data = json.loads(request.body)
  name=data['user']
  password=data['password']
  
  user = person.find_one({"username": name})
 
 
  utc_now = datetime.now(pytz.utc)

# Define the IST timezone
  ist_timezone = pytz.timezone('Asia/Kolkata')

# Convert the current time to IST
  ist_now = utc_now.astimezone(ist_timezone)

# Extract date and time separately
  current_date_ist = ist_now.date()
  current_time_ist = ist_now.time()
  current_date=current_date_ist.strftime('%Y-%m-%d')
  current_time=current_time_ist.strftime('%H:%M:%S')
  

  if user:
    if check_password(password, user['password1']):
     lg=Login_Detail(username=name,Date=current_date,Time=current_time,Status="Logged-In")
     lg.save()
     records={
    "username":name,
    "Date":current_date,
    "Time":current_time,
    "Status":"Logged-In"
    } 
     message=f'{name} Logged-In at {current_time} IST '
     logger.info(message)  
    #  logger.info("Login done")    
    #  with open("../log.txt","a") as file:
    #        file.write("Login failed")         
  
     Login.insert_one(records)
     return JsonResponse({"status": "success", "message": "Logged in successfully"})
    else:
        lg=Login_Detail(username=name,Date=current_date,Time=current_time,Status="Login Failed")
        lg.save()
        records={
                "username":name,
                "Date":current_date,
                "Time":current_time,
                "Status":"Login Failed"
                }
        message=f'{name} Login failed at {current_time} IST '
        logger.info(message)
        # with open("../log.txt","a") as file:
        #    file.write("Login failed")                    
        Login.insert_one(records)
        return JsonResponse({"status": "error", "message": "Wrong password"})
  else:
        return JsonResponse({"status": "error", "message": "Username does not exist"})
   

  # person.insert_one(records)
@csrf_exempt
@api_view(['POST'])
def otp(request):
  data = json.loads(request.body)
  
  def generate_otp():
    # Generate a 6-digit OTP (can be customized)
    return str(random.randint(100000, 999999))
  otp=generate_otp()

  original_starttls = smtplib.SMTP.starttls

  def debug_starttls(self, *args, **kwargs):
    print(f'starttls called with args: {args}, kwargs: {kwargs}')
    # Remove unexpected keyword arguments
    kwargs.pop('keyfile', None)
    kwargs.pop('certfile', None)
    return original_starttls(self, *args, **kwargs)

  smtplib.SMTP.starttls = debug_starttls


  subject = 'Your OTP for Login'
  message = f'Your OTP is: {otp}. This OTP is valid for 5 minutes.'
  from_email = settings.EMAIL_HOST_USER
  em=data['user']
  em1=data['email']
  recipient_list = [em1]
  user = person.find_one({"username": em})
  if user:
     if  user['email']==em1:
        send_mail(subject, message, from_email, recipient_list,fail_silently=False)
        message=f'OTP sent to {em1}'
        logger.info(message)
        return JsonResponse({"status": "success", "message": "Otp Sent","otp_to_check":otp})
     else:
      logger.info("Email not registered.")
      return JsonResponse({"status": "unsuccessful", "message": "Email not registered.","otp_to_check":otp})
  else:
       logger.info("Username not present.")
       return JsonResponse({"status": "unsuccessful", "message": "Username not present.","otp_to_check":otp})
  
     
  

@api_view(['POST'])
def otpverify(request):
  data = json.loads(request.body)
  
  user_otp=data['otp']
  otp=data['otp_to']
  if(otp==user_otp):
    logger.info("OTP verified")
    return JsonResponse({"status": "success", "message": "Otp matched"})
  
  else:
     logger.info("OTP did not match")
     return JsonResponse({"status": "unsuccessful", "message": "Otp did not match"})
  
@api_view(['POST'])
def newpass(request):
  data = json.loads(request.body)
  
  us=data['user']
 
  password=data['passw']
  hashed_password=make_password(password)
  user = person.find_one({"username": us})
  
  if user:
    if check_password(password, user['password1']) or check_password(password, user['password2']) or check_password(password, user['password3']):
        logger.info("Password cannot be the same as previous passwords")
        return JsonResponse({"status": "unsuccessful", "message": "Password cannot be the same as previous passwords"})
    elif(user['password2']==""):
       message=f'Password changed for {us}'
       logger.info(message)
       passworda=user['password1']
       person.update_one(
          {"username": us},
          {
        "$set": {
            "password1": hashed_password,
            "password2": passworda
        }
    } )
       return JsonResponse({"status": "success", "message": "Password changed"})
    elif(user['password3']==""):
       message=f'Password changed for {us}'
       logger.info(message)
       passworda=user['password1']
       passwordb=user['password2']
       person.update_one(
          {"username": us},
          {
        "$set": {
            "password1": hashed_password,
            "password2": passworda,
            "password3": passwordb
        }
    }
          )
       return JsonResponse({"status": "success", "message": "Password changed"})
    else:
       message=f'Password changed for {us}'
       logger.info(message)
       passworda=user['password1']
       passwordb=user['password2']
       person.update_one(
          {"username": us},
          {"$set": {
            "password1": hashed_password,
            "password2": passworda,
            "password3": passwordb
        }}
          )
       return JsonResponse({"status": "success", "message": "Password Changed"})
  
  
