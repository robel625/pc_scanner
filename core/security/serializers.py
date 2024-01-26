from rest_framework import serializers
from .models import User, Employee, Device, Check

class SignUpSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = [
			'username',
			'full_name',
			'email',
			'password',
			'gender',
		]
		extra_kwargs = {
			'password': {
				# Ensures that when serializing, this field will be excluded
				'write_only': True
			}
		}

	def create(self, validated_data):
		# Clean all values, set as lowercase
		username   = validated_data['username'].lower()
		full_name = validated_data['full_name'].lower()
		email = validated_data['email']
		# Create new user
		user = User.objects.create(
			username=username,
			full_name=full_name,
			email = email
		)
		password = validated_data['password']
		user.set_password(password)
		user.save()
		return user


class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = '__all__'
		extra_kwargs = {
			'password': {
				# Ensures that when serializing, this field will be excluded
				'write_only': True
			}
		}

	

class EmployeeSerializer(serializers.ModelSerializer):

	class Meta:
		model = Employee
		fields = '__all__'

class EmployeeCreateSerializer(serializers.ModelSerializer):
	image_str = serializers.CharField(write_only=True)
	filename = serializers.CharField(write_only=True)

	class Meta:
		model = Employee
		fields = [
			"id",
			'first_name',
			'last_name',
			'mobile',
			'email',
			'gender',
			'staff',
			'eeu_id',
			'department',
            'job_title',
			'thumbnail',
			'image_str', 
			'filename',
		]


	def save(self, **kwargs):
		image_str = self.validated_data.pop('image_str', None)
		filename = self.validated_data.pop('filename', None)
		instance = super().save(**kwargs)
        
		if image_str and filename:
			image_file = save_base64_image(image_str, filename)
			instance.thumbnail.save(filename, image_file, save=True)
        
		return instance
	
import base64
from django.core.files.base import ContentFile

def save_base64_image(base64_str, filename):
    image_data = base64.b64decode(base64_str)
    image_file = ContentFile(image_data, name=filename)
    return image_file



class EmployeeCreateSerializerimage(serializers.ModelSerializer):
	class Meta:
		model = Employee
		fields = [
			"id",
			'first_name',
			'last_name',
			'mobile',
			'email',
			'gender',
			'staff',
			'eeu_id',
			'department',
            'job_title',
			'user',
			'thumbnail',
		]


class DeviceCreateSerializerimage(serializers.ModelSerializer):
	class Meta:
		model = Device
		fields =  [
			'employee',
			'type',
			'model',
			'serial_number',
			'barcode',
			'thumbnail',]



class DeviceCreateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Device
		fields = [
			'id',
			'employee',
			'type',
			'model',
			'serial_number',
			'barcode',

		]

class DeviceSerializer(serializers.ModelSerializer):
	# employee = EmployeeSerializer()

	class Meta:
		model = Device
		fields ='__all__'

class CheckSerializer(serializers.ModelSerializer):
	device = DeviceSerializer()
	user = UserSerializer()
	employee = EmployeeSerializer()

	class Meta:
		model = Check
		fields = [
			'id',
			'status',
			'barcode',
			'device',
			'employee',
			'user',
			'exceptions',
			'reason',
			'created_at',
			'updated_at',
		]


class DeviceCheckSerializer(serializers.ModelSerializer):
	user = UserSerializer()
	employee = EmployeeSerializer()

	class Meta:
		model = Device
		fields = [
			'id',
			'employee',
			'user',
			'type',
			'model',
			'serial_number',
			'barcode']
		
			
class CreateCheckSerializer(serializers.ModelSerializer):

	class Meta:
		model = Check
		fields = [
			'id',
			'status',
			'barcode',
			'device',
			'employee',
			'user',
			'exceptions',
			'reason',
			'created_at',
			'updated_at',
		]





