import React from 'react'

const AuthLayout = ({ children }) => {
  return (
    // Make sure this wrapper is a flex container and centers children
    <div className="flex items-center justify-center">{children}</div>
  )
}

export default AuthLayout