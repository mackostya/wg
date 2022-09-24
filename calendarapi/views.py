from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.decorators import api_view

from .models import Event
from .serializers import EventSerializer

# Create your views here.
@api_view(['GET'])
def get_events(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_event(request):
    data = request.data
    event = Event.objects.create(
        title=data["title"],
        date=data["start"]
    )
    serializer = EventSerializer(event, many=False)
    return Response(serializer.data)