# Generated by Django 5.1.3 on 2024-11-28 21:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gym', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='exercises',
            name='students_name',
            field=models.ManyToManyField(related_name='exercises_students', to='gym.student'),
        ),
    ]
