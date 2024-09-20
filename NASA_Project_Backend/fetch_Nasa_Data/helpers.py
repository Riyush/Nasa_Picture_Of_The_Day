import os
import django

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'NASA_Project_Backend.settings')
django.setup()

import requests
from NASA_Project_Backend.settings import NASA_API_KEY
from fetch_Nasa_Data.models import Photo_Data

def fetchdata():
    payload = {
        "api_key": NASA_API_KEY
    }
    url_endpoint = "https://api.nasa.gov/planetary/apod"
    response = requests.get(url_endpoint, params=payload)
    
    #Parse the response as JSON instead of text
    if response.status_code == 200:
        return response.json()
    else:
        # Handle error cases (e.g., log errors or raise exceptions)
        return None

def save_data_to_database(response_dictionary):
    if response_dictionary:

        photo_title = response_dictionary.get("title", "No Title")
        photo_date = response_dictionary.get("date", "No date")
        photo_copyright = response_dictionary.get("copyright", "No copyright")
        photo_explanation = response_dictionary.get("explanation", "No Explanation")
        photo_hdurl = response_dictionary.get("hdurl", "No URL")

        new_obj = Photo_Data(
            title = photo_title,
            date = photo_date,
            copyright = photo_copyright,
            explanation = photo_explanation,
            hdurl = photo_hdurl
            )
        new_obj.save()
    else:
        print("Failed to fetch data")
