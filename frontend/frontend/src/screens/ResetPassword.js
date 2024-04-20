import React from 'react'
import ResetPassworrdForm from '../components/ResetPassworrdForm'
import { Col } from 'react-bootstrap'

function ResetPassword() {
  return (
    <div>
      
      <Col className="m-5">
        <div className="container-fluid bg-dark text-light p-5 ">
          <div className="container bg-dark p-3"></div>
          <ResetPassworrdForm/>
        </div>
      </Col>

      
    </div>
  )
}

export default ResetPassword