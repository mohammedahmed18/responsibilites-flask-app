from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, ForeignKey
from sqlalchemy.orm import relationship
import enum

metadata = MetaData()

db = SQLAlchemy(metadata=metadata)


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(250), nullable=False)
    rotba = db.Column(db.String(250), nullable=False)
    password = db.Column(db.String(250), nullable=False, default="123456")

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'rotba': self.rotba
        }

    def __repr__(self):
        return f'<User {self.id}, {self.name}, {self.rotba}>'


class ResponsibilityType(enum.Enum):
    CONFERENCE = "conference"
    LETTER = "letter"


class Responsibility(db.Model):
    __tablename__ = 'responsibilities'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date = db.Column(db.Date, nullable=False)

    items = relationship('ResponsibilityItem', backref='responsibility')

    @property
    def serialize(self):
        return {
            'id': self.id,
            'date': self.date,
            'items': [i.serialize for i in self.items]
        }


class ResponsibilityItem(db.Model):
    __tablename__ = 'responsibility_items'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    details = db.Column(db.Text, nullable=False)
    responsibility_id = db.Column(db.Integer, ForeignKey(
        'responsibilities.id'), nullable=False)
    type = db.Column(db.Enum(ResponsibilityType), nullable=True)
    notes = db.Column(db.Text, nullable=True)

    associated_users = relationship(
        'ResponsibilityUser', backref='responsibility_item')

    @property
    def serialize(self):
        return {
            'id': self.id,
            'details': self.details,
            'responsibility_id': self.responsibility_id,
            'type': self.type.name,
            'notes': self.notes,
            'users': [a.user.serialize for a in self.associated_users]
        }


class ResponsibilityUser(db.Model):
    __tablename__ = 'responsibility_users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    responsibility_id = db.Column(db.Integer, ForeignKey(
        'responsibility_items.id'), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)

    user = relationship('User', backref='user')
