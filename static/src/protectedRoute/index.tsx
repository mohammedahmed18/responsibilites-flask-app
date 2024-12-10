import React, { useEffect, useState } from "react"
import { useAuth } from "./authContext"
import { useNavigate } from "react-router-dom"
import { hasAccess, SingleRoleType } from "../utils/roles"

type Props = {
  children: React.ReactNode
  role? : SingleRoleType
}
function ProptectedRoute({ children, role }: Props) {
  const { isAnonymous, loading, user } = useAuth()
  const [checkingRole, setCheckingRole] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    if (loading) return
    if (isAnonymous) {
      navigate("/login")
    }
    // user is authenticated
    if (role && !hasAccess(user, role)) {
      // navigate to homepage
      navigate("/")
    }
    setCheckingRole(false)
  }, [loading])
  return (
    <div>
      {loading && <span>Loading...</span>}
      {!loading && !isAnonymous && !checkingRole && children}
    </div>
  )
}

export default ProptectedRoute