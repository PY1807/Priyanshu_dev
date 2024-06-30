from django.contrib import admin
from .models import SignUp

# Register your models here.

@admin.register(SignUp)
class PersonAdmin(admin.ModelAdmin):
  list_display=['id','first_name','last_name','email_address','password1','password2','password3']