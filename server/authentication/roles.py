from models import Role

# the first role in the array is having the heighest privellages
roles_in_order = [
    Role.ADMIN,
    Role.EDITOR,
    Role.VIEWER
]

def get_roles_chain(least_role):
    final_roles = []
    least_role_index = roles_in_order.index(least_role)
    for role in roles_in_order[0:least_role_index]:
        final_roles.append(role.name)
    final_roles.append(least_role.name)
    return final_roles
