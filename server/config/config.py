from config.dev import DevConfig
from config.production import ProdConfig


class Config:
    def __init__(self):
        self.dev_config = DevConfig()
        self.production_config = ProdConfig()
