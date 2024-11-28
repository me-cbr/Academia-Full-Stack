from django.contrib import admin
from .models import *

class ContactsAdmin(admin.ModelAdmin):
    pass


class ExercisesAdmin(admin.ModelAdmin):
    pass


class CoachesAdmin(admin.ModelAdmin):
    pass


class StudentsAdmin(admin.ModelAdmin):
    pass

class ClassesAdmin(admin.ModelAdmin):
    pass

admin.site.register(Contacts, ContactsAdmin)
admin.site.register(Exercises, ExercisesAdmin)
admin.site.register(Coach, CoachesAdmin)
admin.site.register(Student, StudentsAdmin)
admin.site.register(Classes, ClassesAdmin)