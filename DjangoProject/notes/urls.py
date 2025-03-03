from rest_framework.routers import DefaultRouter

from notes.viewsets import NoteViewSet

route = DefaultRouter()
route.register("notes", NoteViewSet)

urlpatterns = route.urls