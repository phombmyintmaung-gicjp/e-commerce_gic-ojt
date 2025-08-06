from rest_framework import viewsets, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import update_session_auth_hash

from ..models import Township
from ..serializers import TownshipsListSerializer

class TownshipsListViewSet(viewsets.ModelViewSet):
    queryset = Township.objects.all()
    serializer_class = TownshipsListSerializer
