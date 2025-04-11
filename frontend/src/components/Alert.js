import React from 'react'

const Alert = ({ msg, type = "primary" }) => {
  return (
    <div className="my-4">
      <div className={`alert alert-${type}`} role="alert">
        {msg}
      </div>
    </div>
  )
}

export default Alert