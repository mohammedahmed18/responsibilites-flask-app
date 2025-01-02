""" gunicorn-app.py """
from server import get_app
from config.config import Config



def create_app_for_prod():
    c = Config().production_config
    app = get_app(c, True)
    return app

if __name__ == "__main__":
    c = Config().production_config
    app = get_app(c, withSeed=True)
    app.run(host=c.HOST,
            port=c.PORT,
            debug=c.DEBUG)
