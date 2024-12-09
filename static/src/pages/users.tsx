import { useEffect, useState } from "react";
import { api } from "../api/api";
import useAsync from "../hooks/use-async";
import { User } from "../protectedRoute/authContext";
import { notifications } from "@mantine/notifications";
import CreateUser, { Tmode } from "../components/users/createUser";
import UsersTable from "../components/users/usersTable";
import ProptectedRoute from "../protectedRoute";
import { AppRole, SingleRoleType } from "../utils/roles";

const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [changePassModal, setChangePassModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>();
    const [newPassword, setNewPassword] = useState<string | undefined>();
    const [mode, setMode] = useState<Tmode>("create");
    const [changePassLoading, setChangePassLoading] = useState(false);

    const { loading } = useAsync(() => {
        return new Promise(async (resolve, reject) => {
            const res = await api.get("/users");

            if (res.status == 200) {
                const users = res.data
                setUsers(users);
                resolve(users);
            } else {
                reject("حدث خطا أثناء تحميل المستخدمين من قاعدة البيانات");
            }
        });
    });

    // const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => { };
    const handleAddUser = (user: User) => setUsers((prev) => [...prev, user]);
    const handleEditUser = (userId: string, user: User) => {
        const newUsers = [...users];
        const index = newUsers.findIndex((u) => u.id == userId);
        newUsers[index] = user;
        setUsers(newUsers);
    };

    const handleChangeUserPassword: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setChangePassLoading(true);
        api
            .patch(`/users/${selectedUser?.id}/changepass`, {
                password: newPassword,
            })
            .then((res) => {
                notifications.show({
                    message: res.data.message,
                    color: "red"
                });
                setChangePassModal(false);
            })
            .catch((err) => { })
            .finally(() => {
                setChangePassLoading(false);
                setSelectedUser(undefined);
            });
    };

    return (
        <ProptectedRoute role={AppRole.ADMIN as SingleRoleType}>
            <div className="mx-5 my-4">
                <input
                    type="checkbox"
                    className="modal-toggle"
                    id="changePassModal"
                    checked={changePassModal}
                    onChange={(e) => {
                        setChangePassModal((prev) => !prev);
                    }}
                />
                <label
                    htmlFor="changePassModal"
                    className="modal cursor-pointer"
                    tabIndex={-1}
                >
                    <label className="modal-box relative w-11/12 max-w-5xl">
                        <form onSubmit={handleChangeUserPassword}>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-lg">
                                        كلمة السر الجديدة
                                    </span>
                                </label>
                                <input
                                    required
                                    type="password"
                                    className="input input-bordered w-full"
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                            </div>

                            <button
                                disabled={changePassLoading}
                                className="btn btn-info my-3"
                            >
                                تغيير كلمة السر ل {selectedUser?.username}
                            </button>
                        </form>
                    </label>
                </label>
                {/* end change password modal */}
                <CreateUser
                    handleAddUser={handleAddUser}
                    handleEditUser={handleEditUser}
                    selectedUser={selectedUser}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    mode={mode}
                    setMode={setMode}
                />
                {loading ? (
                    <span>Loading....</span>
                ) : (
                    <UsersTable
                        loading={loading}
                        users={users || []}
                        onEditClick={(user) => {
                            setModalOpen(true);
                            setMode("edit");
                            setSelectedUser(user);
                        }}
                    // TODO: implement later
                    // onResetUserPasswordClicked={(user) => {
                    //     setChangePassModal(true);
                    //     setMode("reset_pass");
                    //     setSelectedUser(user);
                    // }}
                    />
                )}
            </div>
        </ProptectedRoute>
    );
}
export default UsersPage