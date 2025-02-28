import React from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRoutesProps{
    children: React.ReactNode
}
export default function ProtectedRoute({children}: ProtectedRoutesProps) {
    const token = sessionStorage.getItem("Authorization")
    if(token == null || token == ""){
        return <Navigate to ="/login" />
    }

  return <> {children}</>
}
