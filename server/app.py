from server.server import get_app
from config.config import Config

c = Config().dev_config
app = get_app(c)