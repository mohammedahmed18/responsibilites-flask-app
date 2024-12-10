import { Avatar, Button, CheckIcon, Loader, Table } from "@mantine/core";
import { useAuth, User } from "../../protectedRoute/authContext";

const actionGhostBtnClassName =
    "py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10";
type Props = {
    users: User[]
    loading: boolean
    onEditClick: (u: User) => void
    onResetUserPasswordClicked?: (u: User) => void
}
const UsersTable = ({
    users,
    loading,
    onEditClick,
    onResetUserPasswordClicked,
}: Props) => {
    const { user } = useAuth()
    const handleSetEditedUser = (user: User) => {
        onEditClick(user);
    };

    const editActionTemplate = (rowData: User) => {
        return (
            <button
                className={actionGhostBtnClassName}
                onClick={() => handleSetEditedUser(rowData)}
            >
                تعديل
            </button>
        );
    };

    const changePassTemplate = (rowData: User) => {
        return user?.id !== rowData.id ? (
            <Button
                className={actionGhostBtnClassName}
                onClick={() => onResetUserPasswordClicked(rowData)}
            >تغيير كلمة السر</Button>
        ) : null;
    };

    const roleTemplate = (rowData: User) => {
        if (rowData.role === "ADMIN") {
            return <span className="badge badge-primary">أدمن</span>;
        } else if (rowData.role === "EDITOR") {
            return <span className="badge badge-neutral">مُعدل</span>;
        }
        else if (rowData.role === "VIEWER") {
            return <span className="badge badge-ghost">مستخدم</span>;
        }
        return null;
    };
    const enabledTemplate = (rowData: User) => {
        if (rowData.enabled) {
            return <span className="badge badge-neutral">enabled</span>;
        }
        else {
            return <span className="badge badge-ghost">disabled</span>;
        }
        return null;
    };
    return (
        <>
            <>
                <div className="overflow-x-auto">
                    <Table className="w-full table table-zebra-zebra" striped highlightOnHover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Avatar</th>
                                <th>الرتبة</th>
                                <th>الإسم</th>
                                <th>اسم المستخدم</th>
                                {!!onEditClick && <th>تعديل</th>}
                                {!!onResetUserPasswordClicked && <th>تغيير كلمة السر</th>}
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((rowData, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Avatar radius="xl" className="bg-neutral-focus mx-auto text-neutral-content">
                                            {rowData.name && rowData.name[0]}
                                        </Avatar>
                                    </td>
                                    <td>{rowData.rotba}</td>
                                    <td>{rowData.name}</td>
                                    <td>{rowData.username}</td>
                                    {!!onEditClick && (
                                        <td>
                                            {editActionTemplate(rowData)}
                                        </td>
                                    )}
                                    {!!onResetUserPasswordClicked && (
                                        <td>
                                            {changePassTemplate(rowData)}
                                        </td>
                                    )}
                                    <td>{roleTemplate(rowData)}</td>
                                    <td>{enabledTemplate(rowData)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                {loading && (
                    <div className="flex justify-center items-center">
                        <Loader variant="dots" />
                    </div>
                )}
            </>
        </>
    );
};
export default UsersTable;