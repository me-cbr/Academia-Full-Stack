import os
from django.views.decorators.csrf import csrf_exempt
from pathlib import Path
from django.http import HttpResponse
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from gym.serializers import *
from gym.models import *
from django.middleware.csrf import get_token
from django.http import JsonResponse

def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})


def react_index(request):
    react_index_path = Path(settings.BASE_DIR) / "dist" / "index.html"

    try:
        with open(react_index_path, "r") as file:
            html_content = file.read()

        html_content = html_content.replace(
            "/assets/",
            settings.STATIC_URL + "assets/"
        )

        return HttpResponse(html_content, content_type="text/html")

    except FileNotFoundError:
        return HttpResponse(
            "O build do React não foi encontrado. Certifique-se de rodar 'npm run build'.",
            status=404,
        )

class ContactCreateView(APIView):
    @csrf_exempt
    def post(self, request):
        print(request.data)
        serializer = ContactsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Contato enviado com sucesso!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ClassesList(APIView):
    def get(self, request):
        classes = Classes.objects.all()
        serializer = ClassesSerializer(classes, many=True)
        return Response(serializer.data)


class ExerciseCreateListView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ExerciseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, students_id):
        exercises = Exercises.objects.filter(
            students_id=students_id)
        serializer = ExerciseSerializer(exercises, many=True)
        return Response(serializer.data)

class CoachView(APIView):
    def get(self, request):
        coaches = Coach.objects.all()
        serializer = CoachSerializer(coaches, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = CoachSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentList(APIView):
    def get(self, request):
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)


class StudentCreate(APIView):
    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
