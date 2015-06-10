#!/usr/bin/env python
import sys
import os
import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web
import json
import datetime

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "voting.settings")
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
from django.contrib.auth.models import User
 
Connections = {}
Teams = {}

class SocketHandler(tornado.websocket.WebSocketHandler):

    def check_origin(self, origin):
        print 'check_origin'
        return True

    def open(self,arg):
        print 'open'
        self.userid = arg
        user = User.objects.get( id = self.userid)
        self.connection = { self.userid : {'instance': self}}
        Connections.update(self.connection)   

    def on_close(self):
        print 'on_close'
        Connections.pop(self.userid)

    def send_msg(self,message,conn):
        print 'send_msg_tornado'
        conn.write_message(json.dumps(message))

    def on_message(self, message):
        print 'on_message_tornado'
        # Check if reciever is connected
        message = json.loads(message)
        #print message
        if message['chat_type']=='individual':
            if message['reciever'] in Connections:
                connection = Connections[message['reciever']]
                self.send_msg(message, connection['instance'])

application = tornado.web.Application([
    (r'/ws/(.*)', SocketHandler),
])
 
 
if __name__ == "__main__":
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
