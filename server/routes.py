from models import User, Responsibility, db
from flask import jsonify, request
from urls import get_all_res_url, get_all_users_url, get_res_by_id_url, create_new_res_url, delete_a_res_url
import datetime


def register_users_routes(app):
    @app.route(get_all_users_url, strict_slashes=False)
    def getUsers():
        users = User.query.all()
        return jsonify([u.serialize for u in users])


def register_responsibilities_routes(app):
    @app.route(get_all_res_url, strict_slashes=False)
    def getAllRes():
        responsibilities = Responsibility.query.all()
        return jsonify([r.serialize for r in responsibilities])

    @app.route(get_res_by_id_url, strict_slashes=False)
    def getResById(res_id):
        existing_res = Responsibility.query.filter_by(id=int(res_id)).first()
        if not existing_res:
            return jsonify(success=False, message="record can't be found")
        return existing_res.serialize

    @app.route(create_new_res_url, strict_slashes=False, methods=["POST"])
    def createNewRes():
        data = request.get_json(force=True)
        # parse date to python date object
        date_obj = datetime.datetime.strptime(data["date"], '%Y-%m-%d')
        newRes = Responsibility(date=date_obj)
        db.session.add(newRes)
        db.session.commit()
        return jsonify(newRes.serialize)

    @app.route(delete_a_res_url, strict_slashes=False, methods=["DELETE"])
    def deleteRes(res_id):
        db.session.query(Responsibility).filter_by(id=int(res_id)).delete()
        db.session.commit()
        return "ok"
