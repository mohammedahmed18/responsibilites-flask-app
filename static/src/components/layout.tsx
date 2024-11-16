import React from "react"
import Navbar from "./Navbar"
import { AuthProvider } from "../protectedRoute/authContext"
import { MantineProvider } from "@mantine/core"
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from "@mantine/notifications";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <MantineProvider>
                <Notifications position="top-center" />
                <div>
                    <Navbar />
                    <div className="py-20">
                        {children}
                    </div>
                </div>
            </MantineProvider>
        </AuthProvider>
    )
}
export default Layout