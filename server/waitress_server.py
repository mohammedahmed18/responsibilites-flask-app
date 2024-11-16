from waitress import serve
from server import get_app
from config.config import Config

c = Config().production_config
app = get_app(c, True)
serve(app, host=c.HOST, port=c.PORT)