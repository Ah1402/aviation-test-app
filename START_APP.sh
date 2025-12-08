#!/usr/bin/env bash
set -euo pipefail

PORT=${PORT:-8000}

banner() {
    echo "================================================"
    echo "  Aviation Test Center - Portable Launcher"
    echo "================================================"
    echo
}

info()  { echo -e "[INFO]  $*"; }
warn()  { echo -e "[WARN]  $*"; }
error() { echo -e "[ERROR] $*"; }

open_browser() {
    local url=$1
    if command -v xdg-open >/dev/null 2>&1; then xdg-open "$url" >/dev/null 2>&1 || true; fi
    if command -v open     >/dev/null 2>&1; then open "$url"       >/dev/null 2>&1 || true; fi
    if command -v wslview  >/dev/null 2>&1; then wslview "$url"    >/dev/null 2>&1 || true; fi
}

start_python3() {
    info "Starting Python 3 server on port $PORT..."
    python3 -m http.server "$PORT"
}

start_python2() {
    info "Starting Python 2 server on port $PORT..."
    python -m SimpleHTTPServer "$PORT"
}

start_python_any() {
    info "Starting Python (any) server on port $PORT..."
    python - <<'PY'
import sys, os
try:
        import http.server as hs
        import socketserver as ss
except Exception:
        import SimpleHTTPServer as hs
        import SocketServer as ss
PORT = int(os.environ.get('PORT', '8000'))
class Handler(hs.SimpleHTTPRequestHandler):
        pass
httpd = ss.TCPServer(('', PORT), Handler)
sys.stderr.write('Serving at http://localhost:%d\n' % PORT)
try:
        httpd.serve_forever()
except KeyboardInterrupt:
        sys.stderr.write('\nShutting down...\n')
        httpd.server_close()
PY
}

start_php() {
    info "Starting PHP server on port $PORT..."
    php -S "127.0.0.1:$PORT" -t .
}

start_busybox() {
    info "Starting BusyBox httpd on port $PORT..."
    busybox httpd -f -p "$PORT" -h .
}

start_node_http_server() {
    info "Starting Node http-server on port $PORT..."
    npx --yes http-server -p "$PORT" -c-1 .
}

start_node_serve() {
    info "Starting Node serve on port $PORT..."
    npx --yes serve -l "$PORT" .
}

banner
info "Attempting to start a local web server..."
echo
info "Once started, your browser should open at: http://localhost:$PORT"
info "Press Ctrl+C to stop the server"
echo
echo "================================================"
echo

trap 'echo; warn "Server stopped."' INT TERM

open_browser "http://localhost:$PORT" || true

if command -v python3 >/dev/null 2>&1; then
    start_python3
elif command -v python >/dev/null 2>&1; then
    # Prefer py3 if python points to it; else fallback to py2 module
    if python - <<'PY' 2>/dev/null | grep -q PY3_OK; then
import sys
print('PY3_OK' if sys.version_info[0] == 3 else 'PY2')
PY
    then
        info "'python' is Python 3"
        python -m http.server "$PORT"
    else
        start_python2 || start_python_any
    fi
elif command -v php >/dev/null 2>&1; then
    start_php
elif command -v busybox >/dev/null 2>&1; then
    start_busybox
elif command -v node >/dev/null 2>&1; then
    start_node_http_server || start_node_serve
else
    error "No suitable local server found."
    echo
    warn "Try one of these options:"
    echo "  - Install Python: https://www.python.org/downloads/"
    echo "  - Or install Node.js: https://nodejs.org/ and use 'npx http-server'"
    echo
    echo "Alternatively, open 'index.html' directly in your browser (limited features)."
    echo
    read -r -p "Press Enter to exit..." _
fi
