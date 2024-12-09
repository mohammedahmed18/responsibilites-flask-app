import { User } from "../../protectedRoute/authContext";
import UserForm from "./userForm";

export type Tmode = "create" | "edit" | "reset_pass"
type Props = {
    handleAddUser: (u:User) => void,
    handleEditUser:(userId: string, user: User) => void
    selectedUser?: User,
    modalOpen: boolean
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    mode: Tmode
    setMode: (mode:Tmode) => void
}
const CreateUser = ({
    handleAddUser,
    handleEditUser,
    selectedUser,
    modalOpen,
    setModalOpen,
    mode,
    setMode,
}: Props) => {
    const handleCloseModalForm = () => {
        setModalOpen(false);
    };
    return (
        <>
            <label
                htmlFor="usersModal"
                onClick={() => setMode("create")}
                className="btn gap-2 mb-4 btn-primary"
            >
                إنشاء مستخدم جديد
            </label>

            <input
                type="checkbox"
                id="usersModal"
                className="modal-toggle"
                checked={modalOpen}
                onChange={(e) => setModalOpen((prev) => !prev)}
            />
            <label
                htmlFor="usersModal"
                className="modal cursor-pointer"
                tabIndex={-1}
            >
                <label className="modal-box relative w-11/12 max-w-5xl">
                    <UserForm
                        onUserCreated={handleAddUser}
                        onUserEdited={handleEditUser}
                        closeModal={handleCloseModalForm}
                        data={selectedUser}
                        mode={mode}
                    />
                </label>
            </label>
        </>
    );
};

export default CreateUser;