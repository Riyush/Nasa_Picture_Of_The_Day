from django.shortcuts import render
from .models import Photo_Data
from .serializers import Photo_Data_Serializer
from rest_framework.views import APIView
from rest_framework.response import Response
from fetch_Nasa_Data.helpers import *


class ReactView(APIView):
    def post(self, request):
        queried_date = request.data
        current_Photo_Data = Photo_Data.objects.all()[0]

        if queried_date == current_Photo_Data.date:
            output = [{
                "title": current_Photo_Data.title,
                "date": current_Photo_Data.date,
                "copyright": current_Photo_Data.copyright,
                "explanation": current_Photo_Data.explanation,
                "hdurl": current_Photo_Data.hdurl,
            }]
        else:
            current_Photo_Data.delete()
            new_photo_data = fetchdata()
            save_data_to_database(new_photo_data)
            new_Photo_Data = Photo_Data.objects.all()[0]
            output = [{
                "title": new_Photo_Data.title,
                "date": new_Photo_Data.date,
                "copyright": new_Photo_Data.copyright,
                "explanation": new_Photo_Data.explanation,
                "hdurl": new_Photo_Data.hdurl,
            }]
        return Response(output)