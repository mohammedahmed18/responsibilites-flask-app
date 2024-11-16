from models import User, Responsibility, db, ResponsibilityItem, ResponsibilityUser,Role
from flask import jsonify, request
from urls import get_all_res_url, get_all_users_url, get_res_by_id_url, create_new_res_url, delete_a_res_url, get_tomorrow_res_url, create_new_res_item_url, get_commitment_item_by_id_url, get_res_by_date_url
import datetime
from sqlalchemy import desc
from authentication import auth

def register_users_routes(app):
    @app.route(get_all_users_url, strict_slashes=False)
    @auth.login_required(role=[Role.VIEWER.name, Role.EDITOR.name])
    def getUsers():
        users = User.query.order_by(desc(User.rotba))
        return jsonify([u.serialize for u in users])

def get_date_object_from_str(date):
    if date:
        date_obj = datetime.datetime.strptime(date, '%Y-%m-%d').date()
        return date_obj 
    return None
def register_responsibilities_routes(app):
    @app.route(get_all_res_url, strict_slashes=False)
    @auth.login_required(role=[Role.VIEWER.name, Role.EDITOR.name])
    def getAllRes():
        date = request.args.get('date')
        date_obj = None
        responsibilities = Responsibility.query.order_by(desc(Responsibility.date))
        if date != "":
            date_obj = get_date_object_from_str(date)
            responsibilities = responsibilities.filter_by(date=date_obj)
        return jsonify([r.serialize for r in responsibilities])

    @app.route(get_tomorrow_res_url, strict_slashes=False)
    @auth.login_required(role=[Role.VIEWER.name, Role.EDITOR.name])
    def getTomorrow():
        # db.session.query(Responsibility).delete()
        tomorrow_date_time = datetime.date.today() + datetime.timedelta(days=1)
        tomorrow_commitment = Responsibility.query.filter_by(
            date=tomorrow_date_time).first()
        if not tomorrow_commitment:
            # parse date to python date object
            tomorrow_commitment = Responsibility(date=tomorrow_date_time)
            db.session.add(tomorrow_commitment)
            db.session.commit()

        return tomorrow_commitment.serialize

    @app.route(get_res_by_date_url, strict_slashes=False)
    @auth.login_required(role=[Role.VIEWER.name, Role.EDITOR.name])
    def getCommitmentByDate(date):
        # db.session.query(Responsibility).delete()
        date_obj = datetime.datetime.strptime(date, '%Y-%m-%d').date()
        commitment = Responsibility.query.filter_by(date=date_obj).first()
        if not commitment:
            # parse date to python date object
            commitment = Responsibility(date=date_obj)
            db.session.add(commitment)
            db.session.commit()
        return commitment.serialize

    @app.route(get_res_by_id_url, strict_slashes=False)
    @auth.login_required(role=[Role.VIEWER.name, Role.EDITOR.name])
    def getResById(res_id):
        existing_res = Responsibility.query.filter_by(id=int(res_id)).first()
        if not existing_res:
            return jsonify(success=False, message="record can't be found")
        return existing_res.serialize

    @app.route(get_commitment_item_by_id_url, strict_slashes=False)
    @auth.login_required(role=[Role.VIEWER.name, Role.EDITOR.name])
    def getCommitmentItemById(res_item_id):
        commitment_item = ResponsibilityItem.query.filter_by(
            id=int(res_item_id)).first()
        if not commitment_item:
            return jsonify(message="no records found"), 404
        return commitment_item.serialize

    @app.route(create_new_res_url, strict_slashes=False, methods=["POST"])
    @auth.login_required(role=Role.EDITOR.name)
    def createNewRes():
        data = request.get_json(force=True)
        # parse date to python date object
        date_obj = datetime.datetime.strptime(data["date"], '%Y-%m-%d')
        newRes = Responsibility(date=date_obj)
        db.session.add(newRes)
        db.session.commit()
        return jsonify(newRes.serialize)

    @app.route(create_new_res_item_url, strict_slashes=False, methods=["POST", "PUT"])
    @auth.login_required(role=Role.EDITOR.name)
    def createNewResItem():
        data = request.get_json(force=True)
        usersIds = data['users']
        del data['users']
        if request.method == "POST":
            newRes = ResponsibilityItem(
                type=data['type'],
                responsibility_id=data['responsibility_id'],
                notes=data['notes'],
                details=data['details'],
            )
            db.session.add(newRes)
            db.session.commit()
            create_associated_users(usersIds, newRes.id)
            return jsonify(newRes.serialize)
        if request.method == "PUT":
            item_id = data['id']
            del data['id']
            del data['responsibility_id']
            ResponsibilityItem.query.filter_by(
                id=item_id).update(dict(data))
            db.session.commit()
            # update users
            db.session.query(ResponsibilityUser).filter_by(
                responsibility_id=item_id).delete()
            create_associated_users(usersIds, item_id)
            return jsonify(None)

    @app.route(delete_a_res_url, strict_slashes=False, methods=["DELETE"])
    @auth.login_required(role=Role.EDITOR.name)
    def deleteRes(res_id):
        db.session.query(Responsibility).filter_by(id=int(res_id)).delete()
        db.session.commit()
        return "ok"

    def create_associated_users(user_ids, commitment_item_id):
        # create associated users
        for id in user_ids:
            resUser = ResponsibilityUser(
                responsibility_id=commitment_item_id, user_id=id)
            db.session.add(resUser)
        db.session.commit()
