from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.decorators import api_view

from .models import Todo
from .serializers import TodoSerializer

@api_view(['GET'])
def get_routes(request):

    routes = [
        {
            'Endpoint': '/todos/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/todos/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/todos/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/todos/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/todos/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)


@api_view(['GET'])
def get_todos(request):
    todos = Todo.objects.all().order_by('-updated')
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_todo(request, pk):
    note = Todo.objects.get(id=pk)
    serializer = TodoSerializer(note, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def create_todo(request):
    data = request.data
    todo = Todo.objects.create(
        body=data["body"]
    )
    serializer = TodoSerializer(todo, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_todo(request, pk):
    todo = Todo.objects.get(id=pk)
    todo.delete()
    return Response("Todo was deleted!")


@api_view(['PUT'])
def update_todo(request, pk):
    data = request.data
    note = Todo.objects.get(id=pk)
    serializer = TodoSerializer(instance=note, data=data)
    
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)