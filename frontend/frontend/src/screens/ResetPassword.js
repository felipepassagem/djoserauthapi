import React, { useState } from 'react';
import { Navigate  } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth'
import LoadingSpinner from '../components/LoadingSpinner';

export const ResetPassword = ({ reset_password }) => {

  const [requestSent, setRequestSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
      });
    
      const { email } = formData;
    
      const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    
      const onSubmit = async e => {
        e.preventDefault();
        setIsLoading(true)
        var res = await reset_password(email)
        setRequestSent(true)
        setIsLoading(false)
      }

      if (requestSent) {
        return <Navigate  to='/' />
      }
  return (
    <div>
      
      <Container className="d-flex justify-content-center align-items-center">
      <div className="p-5 m-5 login-signup-form">
          
      <div>
          <h1> Request Password Reset:</h1>
          <Form onSubmit={e => onSubmit(e)} >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={e => handleChange(e)}  required/>
              
            </Form.Group>
    
            
            <Button variant="primary" type="submit" >
            {isLoading ? <LoadingSpinner /> : "Reset Password"}
            </Button>
          </Form>
          
        </div>
        </div>
      </Container>

      
    </div>
  )
}

export default connect(null, { reset_password })(ResetPassword)