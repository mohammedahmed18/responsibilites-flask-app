from flask_httpauth import HTTPTokenAuth



auth = HTTPTokenAuth(scheme='Bearer')

tokens = {
    "secret-token-1": "john",
    "secret-token-2": "susan"
}

