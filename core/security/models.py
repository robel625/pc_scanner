from django.contrib.auth.models import (AbstractBaseUser, PermissionsMixin, UserManager)
from django.db import models
import datetime
import hashlib
from django.utils.translation import gettext_lazy as _


def upload_thumbnail(instance, filename):
	path = f'thumbnails/{instance.first_name}'
	extension = filename.split('.')[-1]
	if extension:
		path = path + '.' + extension
	return path

USER_TYPE = (
    ('JS', 'Job Seeker'),
    ('RR', 'Recruiter'),
    ('RA', 'Recruiter Admin'),
    ('AA', 'Agency Admin'),
    ('AR', 'Agency Recruiter'),
)

GENDER_TYPES = (
    ('F', 'Female'),
    ('M', 'Male'),
)


current_date = datetime.datetime.fromisoformat(str(datetime.date.today())).strftime("%y-%m-%d")

def img_url(self, filename):
    hash_ = hashlib.md5()
    hash_.update(
        str(filename).encode('utf-8') + current_date.encode('utf-8'))
    file_hash = hash_.hexdigest()

    if self.__class__.__name__ == "Company":
        # parsed_target_url = urlparse(self.website)
        # domain = str(parsed_target_url.netloc).split('.')[0]
        filename = self.slug + '.' + str(filename.split('.')[-1])
    else:
        filename = filename
    return "%s%s/%s" % (self.file_prepend, file_hash, filename)

class User(AbstractBaseUser, PermissionsMixin):
	file_prepend = "user/img/"
	username = models.CharField(max_length=100, unique=True)
	full_name = models.CharField(max_length=100, blank=True)
	email = models.EmailField(max_length=255, unique=True, db_index=True)
	is_staff = models.BooleanField(_('staff status'), default=True)
	profile_pic = models.FileField(
        max_length=1000, upload_to=img_url, null=True, blank=True)
	role = models.CharField(choices=USER_TYPE, max_length=10, default='')
	is_active = models.BooleanField(default=True)
	gender = models.CharField(
        choices=GENDER_TYPES, max_length=10, blank=True, null=True)
	eeu_id = models.CharField(max_length=20, blank=True, null=True)
	address = models.TextField(max_length=1000, blank=True, null=True)
	mobile = models.CharField(max_length=20, blank=True, null=True)
	country = models.TextField(max_length=1000, blank=True, null=True)
	city = models.CharField(max_length=20, blank=True, null=True)
	organization = models.TextField(max_length=1000, blank=True, null=True)
	department = models.CharField(max_length=20, blank=True, null=True)
	job_title = models.TextField(max_length=1000, blank=True, null=True)
	birthday = models.CharField(max_length=20, blank=True, null=True)
	photo = models.CharField(max_length=500, blank=True, null=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
    
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']

	objects = UserManager()
    


class Employee(models.Model):
	# thumbnail = models.ImageField(upload_to=upload_thumbnail,null=True,blank=True),
	# username = models.CharField(max_length=100, unique=True)
	first_name = models.CharField(max_length=100, blank=True)
	last_name = models.CharField(max_length=100, blank=True, null=True)
	email = models.EmailField(max_length=255,  db_index=True)
	mobile = models.CharField(max_length=20,  db_index=True)
	gender = models.CharField(
        choices=GENDER_TYPES, max_length=10, blank=True, null=True)
	staff = models.BooleanField(default=False)
	eeu_id = models.CharField(max_length=20, blank=True, null=True)
	department = models.CharField(max_length=100, blank=True, null=True)
	job_title = models.CharField(max_length=100, blank=True, null=True)
	user = models.ForeignKey(User, on_delete=models.PROTECT, default=1)
	thumbnail = models.ImageField(
		upload_to=upload_thumbnail,
		null=True,
		blank=True
	)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)


	class Meta:
		ordering = ('-updated_at',)


	

class Device(models.Model):
	file_prepend = "device/img/"
	employee = models.ForeignKey(Employee, on_delete=models.PROTECT)
	user = models.ForeignKey(User, on_delete=models.PROTECT, default=1)
	type = models.CharField(max_length=100, blank=True, null=True)
	model = models.CharField(max_length=100, blank=True, null=True)
	serial_number = models.CharField(max_length=100, blank=True, null=True)
	barcode = models.CharField(max_length=100, blank=True, null=True)
	thumbnail = models.ImageField(max_length=1000, upload_to=img_url, null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)


	class Meta:
		ordering = ('-updated_at',)



class Check(models.Model):
	status = models.BooleanField(default=False)
	employee = models.ForeignKey(Employee, on_delete=models.PROTECT)
	device = models.ForeignKey(Device, on_delete=models.PROTECT)
	user = models.ForeignKey(User, on_delete=models.PROTECT, default=1)
	barcode = models.CharField(max_length=100, blank=True, null=True)
	exceptions = models.BooleanField(default=False)
	reason = models.TextField(blank=True, null=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	
	
	class Meta:
		ordering = ('-updated_at',)
	





	
	









