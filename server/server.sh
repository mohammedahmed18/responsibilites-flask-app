source ./venv/bin/activate
export FLASK_APP='app.py' && export PYTHONPATH='.' 
export FLASK_DEBUG=1
python -m flask run --port 3000