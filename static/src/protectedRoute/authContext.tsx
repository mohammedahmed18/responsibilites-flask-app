// contexts/auth.js

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { api } from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { AppRole } from '../utils/roles';


// export type AdminType =
// TODO: change the location of this
export type User = {
    id?: string;
    name?: string;
    rotba?: string;
    username?: string;
    role?: keyof typeof AppRole;
    isAnonymous: boolean
};

export type UserWithEdit = Omit<User, "isAnonymous"> & {password?: string};

const defaultUser: User = {
    isAnonymous: true
};

type ContextType = {
    isAnonymous: boolean;
    user: User;
    loading: boolean;
    login: (username: string, password: string) => void;
    logout: () => void;
};

const initialContextValue: ContextType = {
    isAnonymous: true,
    user: defaultUser,
    loading: true,
    login: () => {
        //
    },
    logout: () => {
        //
    },
};
const AuthContext = createContext<ContextType>(initialContextValue);

type props = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: props) => {
    const [user, setUser] = useState<User>(defaultUser);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const { redirect } = useParams();

    async function validateTokenAndSetUser(token: string | undefined) {
        // validate the token
        // NOTE: the token will be undefined in production because it's set as an http only cookie
        if (token) {
            console.log(token);

            api.defaults.headers.Authorization = `Bearer ${token}`;
            try {
                const response = await api.get('/auth/me');
                const user: User = response?.data;
                setUser({ ...user, isAnonymous: false });
                return { success: true };
            } catch (err) {
                return { success: false }
            }
        }
        return { success: false }
    }
    async function loadUserFromCookies() {
        const token = localStorage.getItem("token");
        if (token) {
            await validateTokenAndSetUser(token);
        }

        setLoading(false);
    }

    useEffect(() => {
        loadUserFromCookies();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const res = await api.post('/auth/login', { username, password });
            const token = res?.data?.token;
            if (!token) return
            const result = await validateTokenAndSetUser(token);
            if (result?.success) {
                localStorage.setItem("token", token)
                navigate(redirect?.toString() || '/')
            };
        }catch (err) {
            notifications.show({
                message: 'اسم المستخدم أو كلمة السر غير صحيحة',
                color: "red"
            });
        }
    };

    const logout = async () => {
        localStorage.removeItem('token'); //will be removed in development
        setUser(defaultUser);
        delete api.defaults.headers.Authorization;
        await api.delete('/auth/logout');
        navigate("/login")
    };

    return (
        <AuthContext.Provider
            value={{ isAnonymous: user.isAnonymous, user, login, loading, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);