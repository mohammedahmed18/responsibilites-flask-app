import { FormEventHandler, useState } from "react";
import { useAuth } from "../protectedRoute/authContext";
import { TextInput, PasswordInput, Button, Container, Paper, Title, Grid } from '@mantine/core';

const LoginForm = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({ username: "", password: "" });

    const setValueInFormData = (key: "username" | "password", newVal: string) => {
        setFormData((prev) => ({
            ...prev,
            [key]: newVal
        }));
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) return;

        login(formData.username, formData.password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Container size="xs" py="md">
                <Paper radius="md" p="lg" shadow="lg">
                    <Title order={2} className="text-center" mb="lg">تسجيل الدخول</Title>

                    <Grid>
                        <Grid.Col span={12}>
                            <TextInput
                                label="اسم المستخدم"
                                placeholder="أدخل اسم المستخدم"
                                value={formData.username}
                                onChange={(e) => setValueInFormData("username", e.target.value)}
                            />
                        </Grid.Col>

                        <Grid.Col span={12}>
                            <PasswordInput
                                label="كلمة المرور"
                                placeholder="أدخل كلمة المرور"
                                value={formData.password}
                                onChange={(e) => setValueInFormData("password", e.target.value)}
                            />
                        </Grid.Col>

                        <Grid.Col span={12}>
                            <Button fullWidth mt="md" type="submit">
                                تسجيل الدخول
                            </Button>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </Container>
        </form>
    );
};

export default LoginForm;
