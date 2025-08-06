from rest_framework import viewsets, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import update_session_auth_hash

from ..models import Region
from ..serializers import RegionsListSerializer

class RegionsListViewSet(viewsets.ModelViewSet):
    queryset = Region.objects.all()
    serializer_class = RegionsListSerializer
