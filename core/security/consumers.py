import base64
import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.core.files.base import  ContentFile
from django.db.models import Q, Exists, OuterRef
from django.db.models.functions import Coalesce
from .serializers import *
from .models import Employee, Device, Check
from rest_framework.response import Response

# from .models import User, Connection, Message

# from .serializers import (
# 	UserSerializer, 
# 	SearchSerializer, 
# 	RequestSerializer, 
# 	FriendSerializer,
# 	MessageSerializer
# )



class ChatConsumer(WebsocketConsumer):
 
   def connect(self):
        user = self.scope['user']
        print("uuseruuuuuuuu",user, user.is_authenticated)

        if not user.is_authenticated:
            return
        # Save username to use as a group name for this user
        self.username = user.username
        # Join this user to a group with their username
        async_to_sync(self.channel_layer.group_add)(
            self.username, self.channel_name
        )
        self.accept()

   def disconnect(self, close_code):
        # Leave room/group
        async_to_sync(self.channel_layer.group_discard)(
            self.username, self.channel_name
        )


   def receive(self, text_data):
        # Receive message from websocket
        data = json.loads(text_data)
        data_source = data.get('source')

        # Pretty print  python dict
        print('receive', json.dumps(data, indent=2))

        # Get friend list
        if data_source == 'barcode':
            self.receive_barcode(data)

   def receive_barcode(self, data):
       user = self.scope['user']
       print("barcodevalur", data, user)

       cqs = Check.objects.all()
       checkbarcode = data.get('BarValue')
    
       if checkbarcode != None:
           cbc = cqs.filter(barcode= checkbarcode).first()
           print("barcode", cbc)
           if cbc != None:
             serializer = CheckSerializer(cbc, many=False)
             self.send_group(user.username, 'barcode', serializer.data)
             return Response(serializer.data, status=200)
       
                   
       qs = Device.objects.all()
       barcode = data.get('BarValue')
       if barcode != None:
           bc = qs.filter(barcode= barcode).first()
           print("barcode11", bc)
           if bc != None:
             serializer = DeviceCheckSerializer(bc, many=False)
             self.send_group(user.username, 'barcode', serializer.data)
             print("serializer.data12", serializer.data)
             return Response(serializer.data, status=200)
           
           nodata = {
               "barcode" : barcode,
               "msg": "nodata"
           }
           self.send_group(user.username, 'barcode', nodata)
           return Response({'msg': 'device not found.'}, status=404)
   
       
       self.send_group(user.username, 'barcode', barcode)
   
   
   
   def send_group(self, group, source, data):
        response = {
            'type': 'broadcast_group',
            'source': source,
            'data': data
        }
        async_to_sync(self.channel_layer.group_send)(
            group, response
        )

   def broadcast_group(self, data):
        '''
        data:
            - type: 'broadcast_group'
            - source: where it originated from
            - data: what ever you want to send as a dict
        '''
        data.pop('type')
        '''
        return data:
            - source: where it originated from
            - data: what ever you want to send as a dict
        '''
        self.send(text_data=json.dumps(data))