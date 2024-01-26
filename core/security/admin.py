from django.contrib import admin
from .models import User, Employee , Device, Check

# Register your models here.
admin.site.register(User)
admin.site.register(Employee)
admin.site.register(Device)
admin.site.register(Check)
