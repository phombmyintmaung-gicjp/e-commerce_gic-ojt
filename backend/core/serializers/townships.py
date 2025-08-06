from rest_framework import serializers
from ..models import Township

class TownshipsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Township
        fields = '__all__'