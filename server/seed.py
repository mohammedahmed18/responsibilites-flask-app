#!./venv/bin/python3

from models import User, db
from server import app

# List of users to add
users_to_add = [
    {'name': "mohammed ahmed", 'rotba': "gondy"},
    {'name': "GAD", 'rotba': "gondy"},
]

with app.app_context():
    db.create_all()

    for user_data in users_to_add:
        # Check if the user already exists in the database
        existing_user = User.query.filter_by(
            name=user_data['name'], rotba=user_data['rotba']).first()

        if not existing_user:
            # If the user doesn't exist, add them to the session
            new_user = User(name=user_data['name'], rotba=user_data['rotba'])
            db.session.add(new_user)
            print(f"Added user: {user_data['name']}")
        else:
            print(f"User already exists: {user_data['name']}")

    # Commit the transaction
    db.session.commit()
    print("done!!!!")
