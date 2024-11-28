from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, re_path

from gym.views import *

urlpatterns = [
    path('get-csrf-token/', csrf_token_view, name='csrf_token'),
    path('contacts/', ContactCreateView.as_view(), name='contacts'),
    path('coaches/', CoachView.as_view(), name='coaches'),
    path('classes/', ClassesList.as_view(), name='classes'),
    path('exercises/', ExerciseCreateListView.as_view(), name='exercises'),
    path('exercises/<int:students_id>/', ExerciseCreateListView.as_view(), name='exercise-list'),
    path('students/', StudentList.as_view(), name='students-list'),
    path('students/create/', StudentCreate.as_view(), name='students-create'),
    re_path(r'^.*$', react_index),
]

urlpatterns += static(settings.STATIC_URL, document_root=os.path.join(settings.BASE_DIR, 'static', 'assets'))
