import React, { useState, useEffect } from 'react';
import { Link, Navigate  } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button } from "react-bootstrap";
import { reset_password } from '../actions/auth'

export const ResetPasswordForm = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
      });
    
      const { email } = formData;
    
      const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    
      const onSubmit = e => {
        e.preventDefault();
        reset_password(email)
        setRequestSent(true)
      }

      if (requestSent) {
        return <Navigate  to='/' />
      }

    return (
        <div>
          <h1> Request Password Reset:</h1>
          <Form onSubmit={e => onSubmit(e)} >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={e => handleChange(e)}  required/>
              
            </Form.Group>
    
            
            <Button variant="primary" type="submit" >
              Reset Password
            </Button>
          </Form>
          
        </div>
      );
}

// const mapStateToProps = (state) => ({
//     isAuthenticated: state.auth.isAuthenticated
// })

// const mapDispatchToProps = {}

// export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm)

export default connect(null, { reset_password })(ResetPasswordForm)