from django.urls import path, re_path
# from .views import SignInView, SignUpView 
    # EmployeeView, EmployeeDetail, EquipmentView, EquipmentDetail , CheckView, CheckDetail

from .views import *

from .views import RegisterAPIView, LoginAPIView, UserAPIView, RefreshAPIView, LogoutAPIView

app_name = "security"

urlpatterns = [
	path('signin/', SignInView.as_view()),
	# path('signup/', SignUpView.as_view()),

    # path('login/', SignInView.as_view()),
	# path('register/', SignUpView.as_view()),

    path('register/', RegisterAPIView.as_view()),
    path('login', LoginAPIView.as_view()),
    path('user', UserAPIView.as_view()),
    path('refresh_token', RefreshAPIView.as_view()),
    path('logout', LogoutAPIView.as_view()),

    path('updateUser/<int:user_id>', user_update_view),
    path('changepassword/', change_password),
    # path('employee/', EmployeeView.as_view({'get': 'list', 'post': 'create'})),
    # path('employee/<int:pk>', EmployeeDetail.as_view()),
    # path('equipment/', EquipmentView.as_view()),
    # path('equipment/<int:pk>', EquipmentDetail.as_view()),
    # path('check/', CheckView.as_view()),
    # path('check/<int:pk>', CheckDetail.as_view()),

    path('posts',employee_reactcreate_view2 ),
    path('post/<int:employee_id>',employee_update_view ),
    path('get_posts/',employee_list_view ),
    path('delete_employee/<int:employee_id>',employee_delete_view ),
    # re_path(r'^get_posts/(?P<page>[0-9]+)/$', employee_list_view),

    path('devices',device_reactcreate_view2 ),
    path('device/<int:device_id>',device_update_view ),
    path('get_devices/',device_list_view ),
    path('delete_device/<int:device_id>',device_delete_view ),

    path('getdevice_byid/', getdevice_byid_view),
    

    path('create_check',check_create_view ),
    # path('check/<int:device_id>',device_update_view ),
    path('get_check/',check_device_view ),
    path('get_checklist/',check_list_view),


    path('getall_byid/', getall_byid_view),
    

    path('get_dashboard/',dashboard_view),
     


    path('create/', employee_create_view),
    path('employee/list/', employee_list_view),
    path('employee/filter/', employee_filter_view),

    path('<int:employee_id>/', employee_detail_view),
    path('<int:employee_id>/delete/', employee_delete_view),
    path('<int:employee_id>/update/', employee_update_view),

    path('create/device', device_create_view),
    path('device/filter/', device_filter_view),
    

    
    
]