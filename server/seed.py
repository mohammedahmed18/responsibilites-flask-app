from models import User, db

# List of users to add
users_to_add = [
    {'name': "محمد ابراهيم", 'rotba': "نقيب", 'username': "m.ibrahim", 'password': "123456", 'role': "EDITOR"},
]

def performSeed(app):
    with app.app_context():
        db.create_all()

        for user_data in users_to_add:
            # Check if the user already exists in the database
            existing_user = User.query.filter_by(username=user_data['username']).first()

            if not existing_user:
                # If the user doesn't exist, add them to the session
                new_user = User(
                    name=user_data['name'],
                    rotba=user_data['rotba'],
                    username=user_data['username'],
                    role=user_data['role'],
                )
                new_user.set_password(user_data['password'])
                db.session.add(new_user)
                print(f"Added user: {user_data['username']}")
            else:
                print(f"User already exists: {user_data['username']}")

        # Commit the transaction
        db.session.commit()
        print("done!!!!")
