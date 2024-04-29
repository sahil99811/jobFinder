import React from 'react'
import Template from '../components/core/auth/Template'

export default function Signup() {
  return (
    <div>
      <Template
        title={"Create an Account"}
        description={"Your personal job finder is here"}
        formtype={"signup"}
      ></Template>
    </div>
  )
}
