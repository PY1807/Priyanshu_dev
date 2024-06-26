# Generated by Django 5.0.6 on 2024-06-26 13:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_signup_delete_person'),
    ]

    operations = [
        migrations.AddField(
            model_name='signup',
            name='Sec',
            field=models.CharField(default='A', max_length=25),
        ),
        migrations.AddField(
            model_name='signup',
            name='age',
            field=models.CharField(default='A', max_length=3),
        ),
        migrations.AddField(
            model_name='signup',
            name='ans',
            field=models.CharField(default='A', max_length=15),
        ),
        migrations.AddField(
            model_name='signup',
            name='country',
            field=models.CharField(default='A', max_length=15),
        ),
        migrations.AddField(
            model_name='signup',
            name='username',
            field=models.CharField(default='A', max_length=30),
        ),
        migrations.AlterField(
            model_name='signup',
            name='email_address',
            field=models.CharField(default='A', max_length=20),
        ),
        migrations.AlterField(
            model_name='signup',
            name='first_name',
            field=models.CharField(default='A', max_length=30),
        ),
        migrations.AlterField(
            model_name='signup',
            name='last_name',
            field=models.CharField(default='A', max_length=30),
        ),
        migrations.AlterField(
            model_name='signup',
            name='password1',
            field=models.CharField(default='A', max_length=80),
        ),
        migrations.AlterField(
            model_name='signup',
            name='password2',
            field=models.CharField(default='A', max_length=80),
        ),
        migrations.AlterField(
            model_name='signup',
            name='password3',
            field=models.CharField(default='A', max_length=80),
        ),
        migrations.AlterModelTable(
            name='signup',
            table='user',
        ),
    ]
