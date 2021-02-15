import signal, sys
from http.server import BaseHTTPRequestHandler, HTTPServer

PORT = 80

def signal_handler(sig, frame):
    """ Ctrl-C signal handler"""
    sys.exit(0)

class GetHandler(BaseHTTPRequestHandler):
    """ Class to set headers an return index.html """
    def do_GET(self):
        try:
            f = open('index.html','rb')
            self.send_response(200)
            #self.send_header('X-Frame-Options',
            #             'DENY')
            #self.end_headers()
            self.wfile.write(f.read())
        except IOError:
            self.send_error(404, 'File Not Found: %s' % self.path)

signal.signal(signal.SIGINT, signal_handler)
httpd = HTTPServer(('localhost', PORT), GetHandler)
httpd.serve_forever()

