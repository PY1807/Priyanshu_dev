# Steps to be performed:

Go to the Terminal in your code editor

Run the command :
git clone git@github.com:PY1807/Priyanshu_dev.git

Then run the following command:
cd Priyanshu_dev/myproject

Then run one of these 2 commands whichever works for you:

python3 manage.py runserver

or 

python manage.py runserver

# User Journey

First of all I want to explain the working of my website.

When a user enters the website , he/she can sign-up to make a new account or login if he/she has an existing account.
When he/she attempts to sign-up, they have to ensure that the password is strong enough and for that to happen they will be able to see the conditions that need to be satisfied for a strong password. The email that they are using cannot be used by anyone else or must have not been used by a user that already has an account. 
If the necessary conditions are satisfied, their account would be created and the account details would be stored in the database(here MongoDb).The user would be redirected to the Dashboard page.

A user can also login if he/she has an existing account. For this to happen,they have to enter their existing email and the password they had set at the time of creation of account.
If the details are correct, the user is logged into the account. 
Every user's login whether it was successful or not would be stored in the database.
In a case where the user has forgotten the password, they have to click the forgot password button and they would be required to enter their email on which they would receive an OTP
that would be valid for 5 minutes and if OTP is verified then they would be redirected to the page where they would be able to change the password. 
If otp is not verified, they would also have an option of resending OTP to their email.
In the Change password section, they would again be required to fullfil the necessary conditions for a strong password and their password shouldn't be the same as their previous 2 passwords.
If these conditions are satisfied then they would be required to login and if those details are correct they would be logged into the account


In my Priyanshu_dev directory, I have 2 directories named 'frontend' and 'myproject'.

# Frontend 

The 'frontend' directory contains the frontend of my website that contains a build folder that further contains the index.html as well as the static files and the json files. This 'build' folder was created on running the
command 'npm run build'.

Then we have the 'public' folder containing the code for index.html,the image files that we require, json 
file and the txt file.

The 'src' folder contains the components for the website.The index.js is the base js file which connects with the index.html file after which we start rendering the components.
App.js contains the different routes on which a different feature will be rendered.

Navbar.js has the code for creation of navbar.

Template.js defines a structure similar to both Login and Sign-up pages but differ in values.

LoginForm.js contains the LoginForm and SignupForm.js contains the Signup Form.

Home.js renders Home page,Dashboard.js renders dashboard page ,Login.js renders the Login page,Signup.js renders the Signup page.

Forgot.js renders the page for forgot password, Otp.js renders the page where otp verification is done and 
Newpassword.js renders the page for creating new password(when previous password is forgotten).

We have the css files for styling.

'package.json' and 'package-lock.json' contain the dependencies of the project that is what all packages were required for it.

# Backend

The 'myproject' directory contains the backend part of my website.
It contains our virtual environment file 'env'.

It contains our app named 'myapp' that contains many python files.
The files that i have used or built were :

db_connection.py:It helps to extablish a connection of my django project with mongodb(pymongo was installed for this).

models.py:It contains all the database collections of our database.

urls.py:It contains all the routes and the functions that would be performed on navigating to that route.

views.py:It contains the main portion of our backend part and contains all the functionalities on navigation to a particular route in the urls.py file.


The 'myproject' directory connects our django project to the frontend part and the app that we built in Django.
The files that i have used or built were :
settings.py: It contains all the paths to the different files and the dependencies that can be used in our django project.

urls.py:It connects our project with all the routes of the app that we built 'myapp'.

wsgi.py:It helps in establishing our connection with the Apache server


manage.py - It helps in running our project on local server.

The files that i have not described were not used in the project. They were installed with the startapp and startproject commands in django.
