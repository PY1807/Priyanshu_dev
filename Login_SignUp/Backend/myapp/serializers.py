from rest_framework import serializers
from .models import SignUp
class SignUpSerializer(serializers.ModelSerializer):
  class Meta:
    model=SignUp
    fields =['id','first_name','last_name','email_address','password1','password2','password3']