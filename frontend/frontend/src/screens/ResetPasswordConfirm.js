import React, { useState, useEffect } from 'react';
// import ResetPasswordConfirmForm from '../components/ResetPasswordConfirmForm'
import { Container } from 'react-bootstrap'

import { Link, Navigate, useParams  } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button } from "react-bootstrap";
import { reset_password_confirm } from '../actions/auth'


export const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {

  const [requestSent, setRequestSent] = useState(false)
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
      });

      var   {  uid, token } = useParams();
    
      const { new_password, re_new_password } = formData;
    
      const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    
      const onSubmit = e => {
        e.preventDefault();
        console.log(uid, token)

        reset_password_confirm(uid, token, new_password, re_new_password)
        setRequestSent(true)
      }

      if (requestSent) {
        return <Navigate  to='/' />
      }
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div className="p-5 m-5 login-signup-form">
      <div>
          <h1>Password Reset:</h1>
          <Form onSubmit={e => onSubmit(e)} >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" name='new_password' value={new_password} onChange={e => handleChange(e)}  required/>
              
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password" placeholder="Retype password" name='re_new_password' value={re_new_password} onChange={e => handleChange(e)}  required/>
              
            </Form.Group>
    
           
            <Button variant="primary" type="submit" >
              Reset Password
            </Button>
          </Form>
     
        </div>
    
    </div>
    </Container>
  )
}

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm)

//thisbuttestpassword444