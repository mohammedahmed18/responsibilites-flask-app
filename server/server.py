#!./venv/bin/python3

from flask import Flask, render_template
from flask.logging import default_handler
from flask_cors import CORS
from config.config import Config
from dotenv import load_dotenv
from flask_migrate import Migrate
import os
from models import db
from routes import register_users_routes, register_responsibilities_routes
from authentication.authentication_routes import register_auth_routes
    
load_dotenv()

def get_app(config, withSeed=False):
    app = Flask(__name__,
                static_url_path="",
                static_folder="../static/dist",
                template_folder="../static/dist")

    # making our application to use dev env
    app.env = config.ENV

    basedir = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'site.db')
    # Path for our local sql lite database
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI

    # To specify to track modifications of objects and emit signals
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = os.environ.get(
        "SQLALCHEMY_TRACK_MODIFICATIONS")

    app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")

    # Flask Migrate instance to handle migrations
    migrate = Migrate(app, db)
    db.init_app(app)


    @app.route("/")
    def index():
        return render_template("index.html")

    @app.route("/manage-commitments/<date>", strict_slashes=False)
    @app.route("/commitments/<date>", strict_slashes=False)
    def index2(date):
        return render_template("index.html")

    @app.route("/edit-commitment-item/<id>", strict_slashes=False)
    def index3(id):
        return render_template("index.html")

    @app.route("/login")
    def index4():
        return render_template("index.html")
    
    if withSeed:
        import seed
        print("running seed")
        seed.performSeed(app)

    register_users_routes(app)
    register_responsibilities_routes(app)
    register_auth_routes(app)


    CORS(app, resources={r"/*": {"origins": "*"}})

    return app

if __name__ == "__main__":
    config = Config().dev_config
    app = get_app(config, withSeed=True)
    app.run(host=config.HOST,
            port=config.PORT,
            debug=config.DEBUG)
