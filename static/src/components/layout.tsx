import React from "react"
import Navbar from "./Navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className="py-20">
                {children}
            </div>
        </div>
    )
}
export default Layout