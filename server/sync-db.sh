#!/bin/sh
export FLASK_APP='app.py' && export PYTHONPATH='.' && flask db upgrade
