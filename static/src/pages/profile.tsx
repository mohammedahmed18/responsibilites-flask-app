import { FormEventHandler, useState } from "react";
import { api } from "../api/api";
import { useAuth } from "../protectedRoute/authContext";
import { useNavigate } from "react-router-dom";
import { Loader, TextInput, PasswordInput, Button, Alert, Avatar } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import ProtectedRoute from "../protectedRoute";

const ProfilePage = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handlePasswordChange: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (!oldPassword.trim().length || !newPassword.trim().length || !confirmNewPassword.trim().length) {
            notifications.show({
                message: 'قم بإدخال جميع البيانات',
                color: "red"
            });
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setSuccessMessage("");
            notifications.show({
                message: 'كلمة السر غير متطابقة',
                color: "red"
            });
        } else {
            setLoading(true);
            api.patch("/auth/change-pass", {
                old_password: oldPassword,
                new_password: newPassword,
            })
                .then(() => {
                    setSuccessMessage("تم تغيير كلمة السر بنجاح");
                    logout();
                    navigate("/login");
                })
                .catch((err) => {
                    notifications.show({
                        message: err.response?.data?.message,
                        color: "red"
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <ProtectedRoute>
            <div className="flex flex-col flex-wrap overflow-y-auto p-5 items-center">
                {/* Avatar Section */}
                <div className="mb-5">
                    <Avatar
                        radius="xl"
                        size={120}
                        color="primary"
                        alt={user.username}
                    >
                        {/* Fallback to the first letter of the username */}
                        {user.username && user.username[0].toUpperCase()}
                    </Avatar>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <Alert title="نجاح" color="teal" className="my-3" radius="md">
                        {successMessage}
                    </Alert>
                )}

                {/* User Info */}
                <p className="italic text-2xl">{user.name}</p>
                <p className="italic text-xl text-gray-600" dir="ltr">
                    @ {user.username}
                </p>

                {/* Change Password Form */}
                <form onSubmit={handlePasswordChange} className="w-full md:w-1/2 p-4 shadow-lg mx-auto my-7">
                    <h1 className="my-7 text-2xl text-center">تغيير كلمة السر</h1>

                    {/* Old Password */}
                    <TextInput
                        label="كلمة السر القديمة"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                        className="my-2"
                    />

                    {/* New Password */}
                    <PasswordInput
                        label="كلمة سر جديدة"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="my-2"
                    />

                    {/* Confirm New Password */}
                    <PasswordInput
                        label="تأكيد كلمة السر"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                        className="my-2"
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
                        loading={loading}
                        className="mt-10"
                    >
                        تغيير كلمة السر
                    </Button>
                </form>
            </div>
        </ProtectedRoute>
    );
};

export default ProfilePage;
