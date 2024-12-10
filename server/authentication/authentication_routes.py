#
# Blueprint: Authentication
#
# >> Make sure to import bp as the correct blueprint <<
#
from flask import jsonify, g, request
from authentication import authentication_service as auth_service
from urls import base_api_url
from models import db,User
from . import auth
from werkzeug.security import generate_password_hash, check_password_hash

def register_auth_routes(app):
    @app.route(base_api_url+'/auth/token', strict_slashes=False)
    @auth.login_required
    def get_auth_token():
        token = auth_service.generate_auth_token(600)
        return jsonify({'token': token.decode('ascii'), 'duration': 600})

    @app.route(base_api_url+'/auth/me', strict_slashes=False)
    @auth.login_required
    def me():
        return auth.current_user()

    @app.route(base_api_url+'/auth/login', strict_slashes=False,methods=["POST"])
    def login():
        data = request.get_json(force=True)
        authenticated, user = auth_service.verify_password(data['username'], data['password'])
        if user and not user.enabled:
            return jsonify(message= "User is not allowed to login"),403
        if authenticated:
            token = auth_service.generate_auth_token()
            return jsonify(token=token, user= g.user.serialize)
        return jsonify(message= "invalid username or password"),401
    
    @auth.login_required
    @app.route(base_api_url+'/auth/logout', strict_slashes=False,methods=["DELETE"])
    def logout():
        g.user = None
        return jsonify(True),200
    
    @app.route(base_api_url+'/auth/change-pass', strict_slashes=False,methods=["PATCH"])
    @auth.login_required
    def change_pass():
        data = request.get_json(force=True)
        oldPassword = data['old_password']
        newPassword = data['new_password']
        current_user = auth.current_user()
        user_id = current_user['id']
        user_db = User.query.filter_by(id=user_id).first()
        # check old password
        valid = check_password_hash(user_db.password, oldPassword)
        
        print(f"valid: {valid}")
        
        if not valid:
            return jsonify(message = "invalid password"), 403

        update_data = {
            'password': generate_password_hash(newPassword)
        }
        User.query.filter_by(id=user_id).update(dict(update_data))
        db.session.commit()
        return jsonify(success=True)