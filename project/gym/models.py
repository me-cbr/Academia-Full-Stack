from django.db import models
from uuid import uuid4

def content_type_file_path(self, filename):
    base_path = 'documents/{}/{}/{}'
    content_name = 'gym'
    content_type = 'services'
    try:
        extension = f".{filename.split('.')[-1]}"
    except KeyError:
        extension = ''
    return base_path.format(content_name, content_type, '{}'.format(str(uuid4()), extension))


class Contacts(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    message = models.CharField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.name

class Classes(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField()
    file = models.FileField(
        upload_to=content_type_file_path,
        max_length=500, blank=True, null=True)
    coach_id = models.ManyToManyField('Coach', related_name='classes_coachs')

    def __str__(self):
        return self.name


class Exercises(models.Model):
    name = models.CharField(max_length=100)
    repetitions = models.PositiveIntegerField()
    sessions = models.PositiveIntegerField()
    coach_id = models.ManyToManyField('Coach', related_name='exercises_coachs')
    classes = models.ForeignKey(Classes, on_delete=models.CASCADE, related_name='exercises_classes')
    students_id = models.ManyToManyField('Student', related_name='exercises_students')

    def __str__(self):
        return self.name


class Coach(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    file = models.FileField(
        upload_to=content_type_file_path,
        max_length=500, blank=True, null=True)
    specialization = models.CharField(max_length=100)
    classes_id = models.ManyToManyField(Classes, related_name='coachs_classes')
    student_id = models.ManyToManyField('Student', related_name='coach_student')

    def __str__(self):
        return self.name


class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    age = models.PositiveIntegerField()
    phone = models.CharField(max_length=20)
    file = models.FileField(
        upload_to=content_type_file_path,
        max_length=500, blank=True, null=True)

    def __str__(self):
        return self.name

