# Generated by Django 5.1.3 on 2024-11-28 14:37

import django.db.models.deletion
import gym.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Classes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField()),
                ('file', models.FileField(blank=True, max_length=500, null=True, upload_to=gym.models.content_type_file_path)),
            ],
        ),
        migrations.CreateModel(
            name='Contacts',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Coach',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=20)),
                ('file', models.FileField(blank=True, max_length=500, null=True, upload_to=gym.models.content_type_file_path)),
                ('specialization', models.CharField(max_length=100)),
                ('classes', models.ManyToManyField(related_name='coachs_classes', to='gym.classes')),
            ],
        ),
        migrations.AddField(
            model_name='classes',
            name='coach_name',
            field=models.ManyToManyField(related_name='classes_coachs', to='gym.coach'),
        ),
        migrations.CreateModel(
            name='Exercises',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('repetitions', models.PositiveIntegerField()),
                ('sessions', models.PositiveIntegerField()),
                ('classes', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='exercises_classes', to='gym.classes')),
                ('coach_name', models.ManyToManyField(related_name='exercises_coachs', to='gym.coach')),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('age', models.PositiveIntegerField()),
                ('phone', models.CharField(max_length=20)),
                ('file', models.FileField(blank=True, max_length=500, null=True, upload_to=gym.models.content_type_file_path)),
                ('coach_name', models.ManyToManyField(related_name='student_coache', to='gym.coach')),
                ('exercises', models.ManyToManyField(related_name='student_exercise', to='gym.exercises')),
            ],
        ),
        migrations.AddField(
            model_name='coach',
            name='student_name',
            field=models.ManyToManyField(related_name='coach_student', to='gym.student'),
        ),
    ]