#!/bin/sh
export FLASK_APP='server.py' && export PYTHONPATH='.' && flask db upgrade
