import React from 'react'

const Alert = (props) => {
  return (
    <div className="my-4">
      <div className="alert alert-primary" role="alert">
        {props.msg}
      </div>
    </div>
  )
}

export default Alert