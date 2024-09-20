from rest_framework import serializers
from .models import Photo_Data

class Photo_Data_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Photo_Data
        fields = '__all__'