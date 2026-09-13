"""Run the North Tower educational walk locally. Requires Python 3."""
import functools
import http.server
from pathlib import Path
import webbrowser

root = Path(__file__).resolve().parent / 'world'
handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(root))
server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
url = f'http://127.0.0.1:{server.server_port}/'
print(f'North Tower historical walk: {url}\nKeep this window open. Press Ctrl+C to stop.')
webbrowser.open(url)
try:
    server.serve_forever()
except KeyboardInterrupt:
    server.server_close()
