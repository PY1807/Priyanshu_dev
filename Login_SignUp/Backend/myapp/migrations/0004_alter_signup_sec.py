# Generated by Django 5.0.6 on 2024-06-26 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0003_signup_sec_signup_age_signup_ans_signup_country_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='signup',
            name='Sec',
            field=models.CharField(default='A', max_length=75),
        ),
    ]
