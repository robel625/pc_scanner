from django.contrib.auth import authenticate
from django.shortcuts import render
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializers import *
from .models import Employee, Device, Check
from rest_framework import generics, viewsets, permissions
from rest_framework.pagination import PageNumberPagination

from .serializers import EmployeeCreateSerializer
from django.shortcuts import get_object_or_404
import base64
from django.core.files.base import  ContentFile
from django.db.models import Q

from .authentication import create_access_token, create_refresh_token, decode_access_token, decode_refresh_token
from .models import User
from rest_framework.exceptions import APIException, AuthenticationFailed
from rest_framework.authentication import get_authorization_header
import jwt
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from django.core import serializers
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from django.conf import settings


from django.db.models import Subquery, OuterRef
from datetime import datetime, timedelta
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login


def get_auth_for_user(user):
    tokens = RefreshToken.for_user(user)
    return {
        'user': UserSerializer(user).data,
        'access_token': str(tokens.access_token),
        'refresh_token': str(tokens),
    }


class SignInView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
          
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
     


class SignUpView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        new_user = SignUpSerializer(data=request.data)
        new_user.is_valid(raise_exception=True)
        user = new_user.save()

        user_data = get_auth_for_user(user)

        return Response(user_data)
     

class RegisterAPIView(APIView):
    permission_classes = [AllowAny] 
    # def post(self, request):
    #     serializer = UserSerializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data)
     
    def post(self, request):
        #  if request.method == 'POST':
        try:
            data = request.data  # Access POST data as a dictionary
            print("data",data)
            full_name = data.get('full_name')
            username = data.get('username')
            if username is not None:
               username = username.lower().replace(' ', '')
            # username = data.get('username').lower().replace(' ', '')
            email = data.get('email')
            password = data.get('password')
            # ... other fields

            if User.objects.filter(username=username).exists():
                return JsonResponse({'msg': 'This user name already exists.'}, status=400)

            if User.objects.filter(email=email).exists():
                return JsonResponse({'msg': 'This email already exists.'}, status=400)

            if len(password) < 6:
                return JsonResponse({'msg': 'Password must be at least 6 characters.'}, status=400)
            
            serializer = UserSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            # new_user = User.objects.create_user(
            #     username=username,
            #     email=email,
            #     password=make_password(password),  # Use Django's password hashing
            #     # ... other fields
            # )

            # serialized_user = serializers.serialize('json', [new_user])
            # user_data = serialized_user[1:-1]  # Remove brackets from serialized data

            # access_token = create_access_token(new_user)
            # refresh_token = create_refresh_token(new_user)

            # response = JsonResponse({
            #     'msg': 'Register Success!',
            #     'access_token': access_token,
            #     'user': user_serializer.data
            # })

            access_token = create_access_token(serializer.data)
            refresh_token = create_refresh_token(serializer.data)

            response = JsonResponse({
                'msg': 'Register Success!',
                'access_token': access_token,
                'user': serializer.data,
            })
            response.set_cookie('refreshtoken', refresh_token, httponly=True, path='/api/refresh_token', max_age=30 * 24 * 60 * 60)
            return response  

        except Exception as err:
            return JsonResponse({'msg': str(err)}, status=500)
    


class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            data = request.data 
            email = data.get('email')
            password = data.get('password')

            user = authenticate(request, email=email, password=password)

            if user is not None:
              serializer = UserSerializer(user)
              access_token = create_access_token(serializer.data['id'])
              refresh_token = create_refresh_token(serializer.data['id'])

              
              response = JsonResponse({
                  'msg': 'Login Success!',
                  'refresh_token': refresh_token,
                  'access_token': access_token,
                  'user': serializer.data,
              })
              response.set_cookie('refreshtoken', refresh_token, httponly=True, path='/api/refresh_token', max_age=30 * 24 * 60 * 60)
              return response
            else:
                return JsonResponse({'msg': 'Invalid email or password'}, status=400)

        except Exception as err:
            return JsonResponse({'msg': str(err)}, status=500)
        


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod

    def get_token(cls, user):
        token = super().get_token(user)
        # Don't add user data to the token here
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        data['user'] = UserSerializer(user).data # Serialize user data separately
        return data
 
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# class CustomTokenRefreshSerializer(TokenRefreshSerializer):
#     def validate(self, attrs):
#         data = super().validate(attrs)

#         # Add additional user data to the response
#         # user = self.context['request'].user
#         # print("UUUUUUUUUUUUUUUUUUUUUUUUUUU", user)
#         serialized_user = UserSerializer(user).data
#         data['user'] = serialized_user

#         return data

class MyTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        # Retrieve user data from the access token
        # user = self.request.user
        # user_data = UserSerializer(instance=user).data

        payload = jwt.decode(response.data['access'], algorithms='HS256', verify=False, options={'verify_signature': False})

        

        if payload:
            id = payload.get('user_id')

            user = User.objects.filter(pk=id).first()
    
            user = UserSerializer(user)

            # Modify the response to include user data separately
            response.data = {
                'access': response.data['access'],
                'user': user.data
            }

            return response

        response.data = {
                'access': response.data['access'],
            }

        return response



class UserAPIView(APIView):
    

    def get(self, request):
        authentication_classes = []
        auth = get_authorization_header(request).split()
        print("auth", auth)

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            print("token",  token)
            # id = decode_access_token(token)
            payload = jwt.decode(token, 'access_secret', algorithms='HS256', verify=False, options={'verify_signature': False})
            
            if payload:
                 id = payload.get('user_id')

            user = User.objects.filter(pk=id).first()

            return Response(UserSerializer(user).data)

        raise AuthenticationFailed('unauthenticated')


class RefreshAPIView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        print("refersh hit", request.COOKIES.get('refreshToken'))
        data = request.data
        print("locastorage data", data )
        rf_token = data.get('post1')
        print("locastorage", rf_token )
        if not rf_token:
            return JsonResponse({'msg': 'Please login now.'}, status=400)
        
        payload = jwt.decode(rf_token, 'refresh_secret', algorithms=['HS256'] , verify=False, options={'verify_signature': False})
        if payload:
                 id = payload.get('user_id')
                 print("iddddddddddddddd", id)

        user = User.objects.filter(pk=id).first()

        serializer = UserSerializer(user)
        
        access_token = create_access_token(serializer.data['id'])  # Assuming create_access_token is defined elsewhere

        return JsonResponse({'access_token': access_token, 'user': serializer.data})
    


        # print("refersh hit", request.COOKIES.get('refreshToken') )
        # refresh_token = request.COOKIES.get('refreshToken')
        # id = decode_refresh_token(refresh_token)
        # access_token = create_access_token(id)
        # return Response({
        #     'token': access_token
        # })


class LogoutAPIView(APIView):
    def post(self, _):
        try: 
            response = JsonResponse({})
            response.delete_cookie(key="refreshToken")
            return JsonResponse({'msg': 'Logged out!'})
            
        except Exception as err:
            return JsonResponse({'msg': str(err)}, status=500)

    

# class EmployeeView(viewsets.ModelViewSet):
# 	queryset = Employee.objects.all()
# 	serializer_class = EmployeeSerializer
# 	permission_classes =[permissions.IsAuthenticatedOrReadOnly]

# class EmployeeDetail(generics.RetrieveUpdateDestroyAPIView):
# 	queryset = Employee.objects.all()
# 	serializer_class = EmployeeSerializer

# class DeviceView(generics.ListCreateAPIView):
# 	queryset = Device.objects.all()
# 	serializer_class = DeviceSerializer

# class DeviceDetail(generics.RetrieveUpdateDestroyAPIView):
# 	queryset = Device.objects.all()
# 	serializer_class = DeviceSerializer
     
# class CheckView(generics.ListCreateAPIView):
# 	queryset = Check.objects.all()
# 	serializer_class = CheckSerializer

# class CheckDetail(generics.RetrieveUpdateDestroyAPIView):
# 	queryset = Check.objects.all()
# 	serializer_class = CheckSerializer

def save_base64_image(base64_str, filename):
    image_data = base64.b64decode(base64_str)
    image_file = ContentFile(image_data, name=filename)
    return image_file

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def employee_create_view(request, *args, **kwargs):

    serializer = EmployeeCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=201)
    return Response({}, status=400)


@api_view(['POST'])
def employee_reactcreate_view(request, *args, **kwargs):
  try:
          data = request.data.get("userData")
          print("Dataaaa", data )
          serializer = EmployeeCreateSerializer(data=request.data.get("userData"))
          print("Dataaaa", serializer)
          if serializer.is_valid(raise_exception=True):
             serializer.save()
             return Response(serializer.data, status=201)
        #   return Response({}, status=400)
  except Exception as err:
            return JsonResponse({'msg': str(err)}, status=500)
  
@api_view(['POST'])
def employee_reactcreate_view2(request, *args, **kwargs):
     try:
          data = request.data
          print("Dataaaa", data )
          serializer = EmployeeCreateSerializerimage(data=request.data)
        #   print("Dataaaa", serializer)
          if serializer.is_valid(raise_exception=True):
             serializer.save(user=request.user)
             return Response(serializer.data, status=201)
          
     except Exception as err:
            return JsonResponse({'msg': str(err)}, status=500)
     
 
@api_view(['POST'])
def device_reactcreate_view2(request, *args, **kwargs):
     try:
          data = request.data
          print("Dataaaa", data )
          serializer = DeviceCreateSerializerimage(data=request.data)
        #   print("Dataaaa", serializer)
          if serializer.is_valid(raise_exception=True):
             serializer.save(user=request.user)
             return Response(serializer.data, status=201)
          
     except Exception as err:
            print({'msg': str(err)})
            return JsonResponse({'msg': str(err)}, status=500)
          
@api_view(['POST'])
def check_create_view(request, *args, **kwargs):
     try:
          data = request.data
          print("Dataaaa", data )
          serializer = CreateCheckSerializer(data=request.data)
        #   print("Dataaaa", serializer)
          if serializer.is_valid(raise_exception=True):
             serializer.save(user=request.user)

             id = serializer.data.get("id")
             check = Check.objects.filter(id=id).first()
             c_serializer = CheckSerializer(check)
             return Response(c_serializer.data, status=201)
             
          
            #  return Response(serializer.data, status=201)
          
     except Exception as err:
            return JsonResponse({'msg': str(err)}, status=500)
     



@api_view(['GET'])
def employee_list_view(request, *args, **kwargs):
    permission_classes = [IsAuthenticated]


    qs = Employee.objects.all()

    staff = request.GET.get('staff') 
    if staff != None:
        qs = Employee.objects.filter(staff=staff)
        print("stafff", staff)



    # username = request.GET.get('username') # ?username=Justin
    # if username != None:
    #     qs = qs.by_username(username)

    # id = request.GET.get('id') #
    # if id != None:
    #     qs = qs.filter(pk=id).first()
    #     print("id qssssssssssssssssssssssss", qs)
    #     serializer = EmployeeSerializer(qs, many=False)
    #     return Response(serializer.data, status=200)

    # serializer = EmployeeSerializer(qs, many=True)	
    # return Response(serializer.data, status=200)

    return get_paginated_queryset_response(qs, request)

def get_paginated_queryset_response(qs, request):
    paginator = PageNumberPagination()
    paginator.page_size = 100
    paginated_qs = paginator.paginate_queryset(qs, request)
    serializer = EmployeeSerializer(paginated_qs, many=True, context={"request": request})
    return paginator.get_paginated_response(serializer.data) # Response( serializer.data, status=200)

@api_view(['GET'])
def device_list_view(request, *args, **kwargs):
    qs = Device.objects.all()
    id = request.GET.get('id') #
    if id != None:
        qs = qs.filter(employee=id)
        print("id qdddddddddddd", qs)
        serializer = DeviceSerializer(qs, many=True)
        return Response(serializer.data, status=200)
    

@api_view(['GET'])
def getall_byid_view(request, *args, **kwargs):

    id = request.GET.get('id') #
    if id != None:
        employee = Employee.objects.filter(pk=id).first()
        device = Device.objects.filter(employee=id)
        check = Check.objects.filter(employee=id)
        Last_CheckIn = Check.objects.filter(employee_id=id, status=1).first()
        Last_CheckOut = Check.objects.filter(employee_id=id, status=0).first()



        eserializer = EmployeeSerializer(employee, many=False)
        dserializer = DeviceSerializer(device, many=True)
        cserializer = CheckSerializer(check, many=True)
        inserializer = CheckSerializer(Last_CheckIn, many=False)
        outserializer = CheckSerializer(Last_CheckOut, many=False)

        response = JsonResponse({
                'employee': eserializer.data ,
                'device': dserializer.data,
                'check': cserializer.data,
                'Last_CheckIn': inserializer.data,
                'Last_CheckOut': outserializer.data,

            })
        return response  

        # return Response(serializer.data, status=200)

    serializer = EmployeeSerializer(employee, many=True)	
    return Response(serializer.data, status=200)

    # return get_paginated_queryset_response(qs, request)


@api_view(['GET'])
def getdevice_byid_view(request, *args, **kwargs):

    id = request.GET.get('id') #
    if id != None:
        employee = Employee.objects.filter(pk=id).first()
        device = Device.objects.filter(employee=id)



        eserializer = EmployeeSerializer(employee, many=False)
        dserializer = DeviceSerializer(device, many=True)

        response = JsonResponse({
                'device': dserializer.data,
            })
        return response  

        # return Response(serializer.data, status=200)

    serializer = EmployeeSerializer(employee, many=True)	
    return Response(serializer.data, status=200)

    # return get_paginated_queryset_response(qs, request)





@api_view(['GET'])
def check_device_view(request, *args, **kwargs):
    cqs = Check.objects.all()
    checkbarcode = request.GET.get('barcode') #
    
    if checkbarcode != None:
        cbc = cqs.filter(barcode= checkbarcode).first()
        print("barcode", cqs)
        if cbc != None:
          serializer = CheckSerializer(cbc, many=False)
          return Response(serializer.data, status=200)
    
                
    qs = Device.objects.all()
    barcode = request.GET.get('barcode') #
    if barcode != None:
        bc = qs.filter(barcode= barcode).first()
        print("barcode", qs)
        if bc != None:
          serializer = DeviceCheckSerializer(bc, many=False)
          return Response(serializer.data, status=200)
        return Response({'msg': 'device not found.'}, status=404)
    
    # serializer = DeviceCheckSerializer(qs, many=True)	
    # return Response(serializer.data, status=200)



@api_view(['GET'])
def check_list_view(request, *args, **kwargs):
    # qs = Check.objects.all()
    
    # serializer = CheckSerializer(qs, many=True)	
    # return Response(serializer.data, status=200)

    #  def filter_and_serialize(self, request):
          # Get date filter from query parameters
        # if date_filter:
        #     try:
        #         date_object = datetime.datetime.strptime(date_filter, '%Y-%m-%d').date()  # Parse date string
        #         print("dateeeeeeeeeeeeee2", date_object )
        #         filtered_data = Check.objects.filter(updated_at=date_object)  # Filter data
        #     except ValueError:
        #         return Response({'error': 'Invalid date format'}, status=400)
        # else:
        #     filtered_data = Check.objects.all()  # No filter, retrieve all data

        # serializer = CheckSerializer(filtered_data, many=True)  # Serialize the filtered data
        # return Response(serializer.data)  # Return the serialized data as a response

    date_filter = request.GET.get('date') #
    print("dateeeeeeeeeeeeee", date_filter )
    if date_filter:
            try:
                # date_object = datetime.datetime.strptime(date_filter, '%Y-%m-%d').date()  # Parse date string
                # print("dateeeeeeeeeeeeee2", date_object )
                # filtered_data = Check.objects.filter(updated_at=date_object)  # Filter data
                filtered_data = Check.objects.filter(created_at__date=date_filter)
            except ValueError:
                return Response({'error': 'Invalid date format'}, status=400)
            
    serializer = CheckSerializer(filtered_data, many=True)  # Serialize the filtered data
    return Response(serializer.data)  # Return the serialized data as a response
            
    # qs = Check.objects.all()
    
    # serializer = CheckSerializer(qs, many=True)	
    # return Response(serializer.data, status=200)


@api_view(['GET'])
def dashboard_view(request, *args, **kwargs):

    startDate = request.GET.get('startDate')
    endDate = request.GET.get('endDate')

    if startDate and endDate:  # Use "and" for boolean comparison
        try:
            # chickIn= Check.objects.filter(created_at__range=(startDate, endDate) & Q(checkin="checkin"))
            # chickIn_count = chickIn.count()
            
            countofstaff = Employee.objects.filter(staff=True).count()
            countofguest= Employee.objects.filter(staff=False).count()
            countofdevices= Device.objects.filter().count()

            still_checked_in_devices = Check.objects.filter(
                                          status=1,
                                          id__in=Subquery(
                                              Check.objects.filter(device_id=OuterRef('device_id'))
                                              .order_by('-updated_at')
                                              .values('id')[:1]  # Get the latest record for each device
                                          )
                                        )            


            endDate = datetime.strptime(endDate, "%Y-%m-%d")  # Convert to datetime object
            endDate_plus_one = endDate + timedelta(days=1)
            filtered_data = Check.objects.filter(created_at__range=(startDate, endDate_plus_one))


            serializer = CheckSerializer(filtered_data, many=True)

            stillserializer = CheckSerializer(still_checked_in_devices, many=True)
            
            
            response = JsonResponse({
                'still_in':  stillserializer.data,
                'check_date': serializer.data,
                'count_staff': countofstaff,
                'count_guest': countofguest,
                'count_devices': countofdevices,
            })
            return response    # Use __range for filtering
        except ValueError:
            return Response({'error': 'Invalid date format'}, status=400)
    # else:
        # filtered_data = Check.objects.all()  # Retrieve all objects if dates are not provided

    serializer = CheckSerializer(filtered_data, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def employee_filter_view(request, *args, **kwargs):
     print(request)
     query = request.GET.get('query', '')
     staff = request.GET.get('staff')  # assuming the query parameter is passed in the request URL
     employees = Employee.objects.filter(staff=staff)
     if query:
        employees = employees.filter(
            Q(first_name__icontains=query) |
            Q(last_name__icontains=query) |
            Q(mobile__icontains=query) |
            Q(email__icontains=query) |
            Q(eeu_id=query)
        ).order_by('-id')
     serializer = EmployeeSerializer(employees, many=True)
    #  serialized_data = []	
    #  for employee in employees:
    #     serialized_data.append({
    #         'username': employee.username,
    #         'firstname': employee.firstname,
    #         'lastname': employee.lastname,
    #         'id': employee.id,
    #     })
     
     return get_paginated_queryset_response(employees, request)
    
     return Response(serializer.data, status=200)

@api_view(['GET'])
def employee_detail_view(request, employee_id, *args, **kwargs):
    qs = Employee.objects.filter(id=employee_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = EmployeeSerializer(obj)
    return Response(serializer.data, status=200)

@api_view(['DELETE', 'POST', 'GET'])
@permission_classes([IsAuthenticated])
def employee_delete_view(request, employee_id, *args, **kwargs):
    # qs = Employee.objects.filter(id=employee_id)
    instance = get_object_or_404(Employee, pk=employee_id)
    print("deleted object", instance.thumbnail)
    if instance.thumbnail:
                instance.thumbnail.delete()
    # obj = qs.first()
    instance.delete()
    
    return Response({"message": "Employee removed"}, status=200)

@api_view(['DELETE', 'POST', 'GET'])
@permission_classes([IsAuthenticated])
def device_delete_view(request, device_id, *args, **kwargs):
    # qs = Employee.objects.filter(id=employee_id)
    instance = get_object_or_404(Device, pk=device_id)
    print("deleted object", instance.thumbnail)
    if instance.thumbnail:
                instance.thumbnail.delete()
    # obj = qs.first()
    instance.delete()
    
    return Response({"message": "Device removed"}, status=200)


@api_view(['PUT', 'GET', 'PATCH'])
# @permission_classes([IsAuthenticated])
def user_update_view(request, user_id, *args, **kwargs):
    user = get_object_or_404(User, pk=user_id)
    updated_fields = ['full_name','username','mobile','email','gender','eeu_id','role','country','city','organization','department','job_title','address','birthday']
    

     # Delete the previous thumbnail if a new one is being uploaded
    if request.data.get('profile_pic') and user.profile_pic:
        user.profile_pic.delete()  # Delete the old thumbnail

    if 'profile_pic' in request.data:
        updated_fields.append('profile_pic')
        
    for field in updated_fields:
        setattr(user, field, request.data.get(field))
        
    user.save(update_fields=updated_fields)
    serializer = UserSerializer(user)
    return Response({"user": serializer.data,'msg': 'successfully updated.'}, status=200)


# @login_required
@api_view(['POST'])
def change_password(request):
    if request.method == "POST":
        old_password = request.data.get("oldPassword")
        new_password = request.data.get("newPassword")
        
        # Authenticate the user with the old password
        user = authenticate(username=request.user.email, password=old_password)
        
        if user is not None:
            # Use Django's built-in set_password method to change the password
            user.set_password(new_password)
            user.save()
            
            # Log the user back in with the new password
            login(request, user)
            
            return Response({"msg": "Password changed successfully"}, status=200)
        else:
            return Response({"msg": "Invalid old password."}, status=400)

    return Response({"msg": "Invalid request method."}, status=400)

# @api_view(['PATCH'])
# def change_password(request):
#     if request.method == 'PATCH':
#         form = PasswordChangeForm(request.user, request.POST)
#         if form.is_valid():
#             user = form.save()
#             update_session_auth_hash(request, user)
#             return Response({'msg': 'Your password was successfully updated!'}, status=200)
#         else:
#             return Response({'msg': 'current password incorrect!'}, status=500)


@api_view(['PUT', 'GET', 'PATCH'])
# @permission_classes([IsAuthenticated])
def employee_update_view(request, employee_id, *args, **kwargs):
    employee = get_object_or_404(Employee, pk=employee_id)
    updated_fields = ['first_name','last_name','mobile','email','gender','eeu_id','department','job_title']

     # Delete the previous thumbnail if a new one is being uploaded
    if request.data.get('thumbnail') and employee.thumbnail:
        employee.thumbnail.delete()  # Delete the old thumbnail

    if 'thumbnail' in request.data:
        updated_fields.append('thumbnail')
        
    for field in updated_fields:
        setattr(employee, field, request.data.get(field))
        
    employee.save(update_fields=updated_fields)
    serializer = EmployeeSerializer(employee)
    return Response(serializer.data, status=200)

@api_view(['PUT', 'GET', 'PATCH'])
# @permission_classes([IsAuthenticated])
def device_update_view(request, device_id, *args, **kwargs):
    device = get_object_or_404(Device, pk=device_id)
    print("device", device_id)
    updated_fields = [ 'type', 'model', 'serial_number', 'barcode']

     # Delete the previous thumbnail if a new one is being uploaded
    if request.data.get('thumbnail') and Device.thumbnail:
        device.thumbnail.delete()  # Delete the old thumbnail

    if 'thumbnail' in request.data:
        updated_fields.append('thumbnail')

    for field in updated_fields:
        setattr(device, field, request.data.get(field))
    
    
    device.save(update_fields=updated_fields)
    serializer = DeviceSerializer(device)
    return Response(serializer.data, status=200)






@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def device_create_view(request, *args, **kwargs):

    serializer = DeviceCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=201)
    return Response({}, status=400)




@api_view(['GET'])
def device_filter_view(request, *args, **kwargs):
     query = request.GET.get('query', '')  # assuming the query parameter is passed in the request URL
     devices = Device.objects.filter(barcode = query)
     if not devices.exists():
        return Response({}, status=404)
         
     devices = devices.first()
     serializer = DeviceSerializer(devices)
    
     return Response(serializer.data, status=200)

