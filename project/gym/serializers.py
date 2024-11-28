from rest_framework.serializers import ModelSerializer
from gym.models import *

class ContactsSerializer(ModelSerializer):
    class Meta:
        model = Contacts
        fields = ['name', 'email', 'phone', 'message']

class ClassesSerializer(ModelSerializer):
    class Meta:
        model = Classes
        fields = '__all__'

class ExerciseSerializer(ModelSerializer):
    class Meta:
        model = Exercises
        fields = '__all__'

class CoachSerializer(ModelSerializer):
    class Meta:
        model = Coach
        fields = '__all__'

class StudentSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'