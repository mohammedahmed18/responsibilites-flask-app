import { User } from "../protectedRoute/authContext";

export const AppRole = {
    ADMIN: 'ADMIN',
    EDITOR: 'EDITOR',
    VIEWER: 'VIEWER'
};
export type SingleRoleType = keyof typeof AppRole
// Roles in order of privileges (highest first)
const rolesInOrder = [
    AppRole.ADMIN,
    AppRole.EDITOR,
    AppRole.VIEWER
];

export function getRolesChain(leastRole: SingleRoleType):SingleRoleType[] {
    const finalRoles = [];
    const leastRoleIndex = rolesInOrder.indexOf(leastRole);

    // Add roles up to (but not including) the least role
    for (let i = 0; i < leastRoleIndex; i++) {
        finalRoles.push(rolesInOrder[i]);
    }

    // Add the least role itself
    finalRoles.push(leastRole);

    return finalRoles as SingleRoleType[];
}
// TODO: enable permissions later
export function hasAccess(user: User, roleToCkeck:SingleRoleType) {
    const rolesChain = getRolesChain(roleToCkeck)
    return rolesChain.some((v) => user.role == v)
}