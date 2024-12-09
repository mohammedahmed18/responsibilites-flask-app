import { ChangeEvent, useEffect, useState } from "react";
import { User, UserWithEdit } from "../../protectedRoute/authContext";
import { Tmode } from "./createUser";
import { AppRole, SingleRoleType } from "../../utils/roles";
import useAsync from "../../hooks/use-async";
import { api } from "../../api/api";
import { notifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";
import Select from "react-select";

const defaultValues: UserWithEdit = {
    name: "",
    username: "",
    password: "",
    rotba: "",
    role: "VIEWER"
};

type Props = {
    mode: Tmode
    data?: User
    closeModal: () => void
    onUserCreated: (u: User) => void
    onUserEdited: (userId: string, u: User) => void
}
const UserForm = ({
    mode,
    data,
    closeModal,
    onUserCreated,
    onUserEdited,
}: Props) => {
    const [inputData, setInputData] = useState<UserWithEdit>(defaultValues);
    const [role, setRole] = useState<SingleRoleType>(AppRole.VIEWER as SingleRoleType);


    useEffect(() => {
        if (!data) return
        if (mode == "edit") {
            // const dbPermissions = data.permissions || [];
            // const plainPermissions = dbPermissions.map((dbP) => dbP.name);
            // data.permissions = plainPermissions;
            setInputData(data);
            data.role && setRole(data.role);
        } else {
            resetForm();
        }
    }, [mode, data]);

    const { loading, error, value, perform } = useAsync(
        (userData: User) => {
            return new Promise(async (resolve, reject) => {
                // create a new user
                try {
                    const promise =
                        mode == "edit"
                            ? api.put(`/users/${data?.id}`, userData)
                            : api.post("/users", userData);
                    const res = await promise;
                    if (res.status == 200) {
                        const dbUser = (res.data as User);
                        if (mode == "create") {
                            onUserCreated(dbUser);
                        } else {
                            dbUser.id && onUserEdited(dbUser.id, dbUser);
                        }
                        closeModal();
                        resetForm();
                        resolve(true);
                    }
                } catch (err: any) {
                    const message = err.response?.data?.message;
                    message && notifications.show({
                        message,
                        color: "red"
                    });
                    reject("حدث خطأ أثناء إنشاء مستخدم جديد");
                }
            });
        },
        [inputData],
        false
    );

    const resetForm = () => {
        setInputData(defaultValues);
    };



    const handleRoleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newRole = e.target.value;
        setRole(newRole as SingleRoleType);
    };

    // const handleUserPermissionsChanges = (p, event) => {
    //     const checked = event.target.checked;
    //     if (checked) {
    //         setInputData((prev) => ({
    //             ...prev,
    //             permissions: [...prev.permissions, p.name],
    //         }));
    //     } else {
    //         setInputData((prev) => ({
    //             ...prev,
    //             permissions: prev.permissions.filter((per) => per !== p.name),
    //         }));
    //     }
    // };

    const handleSumbit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        perform({
            ...inputData,
            role,
        });
    };

    const handleSetInputData = (key: keyof UserWithEdit, value: string) => {
        const clone = Object.assign({}, inputData);
        clone[key] = value;
        setInputData(clone);
    };

    return (
        <form onSubmit={handleSumbit}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">
                        اسم المستخدم{" "}
                        <span className="text-gray-500">
                            (الاسم المستخدم عند تسجيل الدخول)
                        </span>
                    </span>
                </label>
                {/*  */}
                <input
                    required
                    className="input input-bordered"
                    type="text"
                    value={inputData["username"]}
                    onChange={(e) =>
                        handleSetInputData("username", e.target.value)
                    }
                />
                {/* <span className="text-error text-xs">{errors["username"]}</span> */}
            </div>

            <div className="flex items-center justify-between">
                <div className="form-control w-full">
                    <label className="label cursor-pointer flex flex-col gap-2 !items-start">
                        <span className="label-text text-right block">
                            الرتبة
                        </span>
                        <Select
                            required
                            placeholder=""
                            className="outline-none w-full"
                            isSearchable
                            tabIndex={0}
                            value={{
                                label: inputData.rotba,
                                value: inputData.rotba,
                            }}
                            onChange={(o) =>
                                o?.value && handleSetInputData("rotba", o.value)
                            }
                            options={[
                                {
                                    label: "جندي",
                                    value: "جندي",
                                },
                                {
                                    label: "صف ظابط",
                                    value: "صف ظابط",
                                },
                                {
                                    label: "ظابط",
                                    value: "ظابط",
                                },
                                {
                                    label: "نقيب",
                                    value: "نقيب",
                                },
                                {
                                    label: "رائد",
                                    value: "رائد",
                                },
                                {
                                    label: "مقدم",
                                    value: "مقدم",
                                },
                                {
                                    label: "عقيد",
                                    value: "عقيد",
                                },
                                {
                                    label: "عميد",
                                    value: "عميد",
                                },
                            ]}
                        />
                    </label>
                </div>

                <div className="form-control w-full">
                    <label className="label cursor-pointer flex flex-col gap-2 !items-start">
                        <span className="label-text text-right">الاسم</span>
                        <input
                            required
                            className="input input-bordered w-full"
                            type="text"
                            value={inputData["name"]}
                            onChange={(e) =>
                                handleSetInputData("name", e.target.value)
                            }
                        />
                    </label>

                    {/* <span className="text-error text-xs">{errors["name"]}</span> */}
                </div>
            </div>
            {mode == "create" && (
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">كلمة السر</span>
                    </label>
                    <input
                        required
                        className="input input-bordered flex-1"
                        type="password"
                        name="password"
                        value={inputData["password"]}
                        onChange={(e) =>
                            handleSetInputData("password", e.target.value)
                        }
                    />
                    {/* <span className="text-error text-xs">{errors["password"]}</span> */}
                </div>
            )}
            <div className="form-control w-24">
                <label className="label cursor-pointer">
                    <span className="label-text">أدمن</span>
                    <input
                        type="radio"
                        name="roleId"
                        className="radio"
                        value={"ADMIN"}
                        checked={role == "ADMIN"}
                        onChange={handleRoleChange}
                    />
                </label>
            </div>
            <div className="form-control w-24">
                <label className="label cursor-pointer">
                    <span className="label-text">مستخدم</span>
                    <input
                        type="radio"
                        name="roleId"
                        className="radio"
                        value={"VIEWER"}
                        checked={role == "VIEWER"}
                        onChange={handleRoleChange}
                    />
                </label>
            </div>
            <div className="form-control w-24">
                <label className="label cursor-pointer">
                    <span className="label-text">مُعدل</span>
                    <input
                        type="radio"
                        name="roleId"
                        className="radio"
                        value={AppRole.EDITOR}
                        checked={role == AppRole.EDITOR}
                        onChange={handleRoleChange}
                    />
                </label>
            </div>

            {/* <div className="form-control w-full">
                <label className="cursor-pointer">
                    <span className="label-text">الصلاحيات</span>
                    <div className="flex flex-wrap">
                        {userPermissions.map((p) => (
                            <div className="form-control" key={p.name}>
                                <label className="cursor-pointer label">
                                    <span className="label-text mx-4 text-xl">
                                        {
                                            kanteenPermissions.find(
                                                (per) =>
                                                    per.namespace +
                                                    ":" +
                                                    per.p ==
                                                    p.name
                                            )?.nameInArabic
                                        }
                                    </span>
                                    <input
                                        onChange={(e) =>
                                            handleUserPermissionsChanges(p, e)
                                        }
                                        checked={inputData.permissions?.includes(
                                            p.name
                                        )}
                                        type="checkbox"
                                        className="checkbox"
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                </label>
            </div> */}

            <div className="form-control mt-6">
                <button
                    type="submit"
                    className="btn w-fit btn-primary"
                    disabled={loading}
                >
                    {loading ? (
                        <Loader variant="dots" />
                    ) : mode == "edit" ? (
                        "تعديل"
                    ) : (
                        "إضافة"
                    )}
                </button>
            </div>
        </form>
    );
};

export default UserForm;