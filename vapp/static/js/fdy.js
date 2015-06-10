// import tornado.httpserver
// import tornado.websocket
// import tornado.ioloop
// import tornado.web
// import json
// import os
// import sys
// sys.path.append('/home/aneesh/Desktop/hrmanager')
// os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hrmanager.settings")
// from django.core.wsgi import get_wsgi_application
// application = get_wsgi_application()
// from chat.models import Message
// from django.contrib.auth.models import User
// from dateutil import parser


// class WSHandler(tornado.websocket.WebSocketHandler):
//     CONNECTIONS = {}
//     MESSAGES = {}

//     def open(self, data):
//         print 'new connection', data
//         data = json.loads(data)
//         connection = {self: {'sender': data['sender'], 'receiver': data['receiver']}}
//         self.CONNECTIONS.update(connection)

//     def on_message(self, message):
//         print 'message received %s' % json.loads(message)
//         message = json.loads(message)
//         if message['typing'] is 'true':
//             for con, data in self.CONNECTIONS.iteritems():
//                 if data['sender'] == message['receiver'] and data['receiver'] == message['sender']:
//                     con.write_message(message)
//         else:
//             for con, data in self.CONNECTIONS.iteritems():
//                 if data['sender'] == message['receiver'] and data['receiver'] == message['sender']:
//                     con.write_message(message)
//             users = User.objects.all()
//             sender = User.objects.get(username=message['sender'])
//             receiver = User.objects.get(username=message['receiver'])
//             new_message = Message(
//                 sender=sender,
//                 receiver=receiver,
//                 message_body=message['message_body'],
//                 datetime=parser.parse(message['datetime'])
//             )
//             new_message.save()

//     def on_close(self):
//         self.CONNECTIONS.pop(self)
//         print 'connection closed'


// application = tornado.web.Application([
//     (r'/data=(?P<data>.*)', WSHandler),
// ])


// if __name__ == "__main__":
//     http_server = tornado.httpserver.HTTPServer(application)
//     http_server.listen(8888, address='192.168.0.20')
//     tornado.ioloop.IOLoop.instance().start()
