from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from requests import post  
from django.http import JsonResponse
from security.models import User
from django.contrib.auth import authenticate
from  security.serializers import *

class CustomUserCreate(APIView):
    permission_classes = [AllowAny] 

    def post(self, request, format='json'):

        data = request.data  # Access POST data as a dictionary
        print("data",data)
        full_name = data.get('full_name')
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        # ... other field  
        if User.objects.filter(username=username).exists():
            return JsonResponse({'msg': 'This user name already exists.'}, status=400 ) 
                                
        if User.objects.filter(email=email).exists():
            return JsonResponse({'msg': 'This email already exists.'}, status=400 ) 
        if len(password) < 8:
            return JsonResponse({'msg': 'Password must be at least 8 characters.'}, status=400)
        
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            if user:
                json = serializer.data
                response = JsonResponse({
                      'msg': 'Register Success!',
                      'user': json,
                  })
                # return response
                # return Response(json, status=status.HTTP_201_CREATED)
                
                try:
                  email = request.data.get('email')
                  password = request.data.get('password')
                  if not email or not password:
                      return Response(status=400)
                  
                  user = authenticate(email=email, password=password)
                  if not user:
                      return Response(status=401)
          
                  user_data = get_auth_for_user(user)

                  return Response(user_data)
                except Exception as err:
                  print('msg', str(err) )
                  return JsonResponse({'msg': str(err)}, status=500)
                

        # return JsonResponse({'msg': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    

def get_auth_for_user(user):
    tokens = RefreshToken.for_user(user)
    return {
        'user': UserSerializer(user).data,
        'access_token': str(tokens.access_token),
        'refresh_token': str(tokens),
    }


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        # try:
            refresh_token = request.data.get('refresh_token')
            print("refresh_token nnnnnnnnnnnnnnnnnnnnnn", refresh_token)
            token = RefreshToken(refresh_token)
            token.blacklist()
            return JsonResponse({'msg': 'Logged out!'}, status=status.HTTP_205_RESET_CONTENT)
            # return Response(status=status.HTTP_205_RESET_CONTENT)
        # except Exception as err:
        #     print({'msg': str(err)})
        #     return JsonResponse({'msg': str(err)}, status=status.HTTP_400_BAD_REQUEST)
        

            