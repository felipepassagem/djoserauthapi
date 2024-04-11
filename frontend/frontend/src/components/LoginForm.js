import React, { useState, useEffect } from 'react';
import { Link, Navigate  } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button } from "react-bootstrap";
import { login } from '../actions/auth'

export const LoginForm = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    
      const { email, password } = formData;
    
      const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    
      const onSubmit = e => {
        e.preventDefault();
    
        login(email, password)
      }

      if (isAuthenticated) {
        return <Navigate  to='/' />
      }

    return (
        <div>
          <h1> Login</h1>
          <Form onSubmit={e => onSubmit(e)} >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={e => handleChange(e)}  required/>
              
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={e => handleChange(e)} minLength='0' required/>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Button variant="primary" type="submit" >
              Login
            </Button>
          </Form>
          <p className='mt-3'>Don't have an account? <Link to='/signup'>Sign Up </Link></p>
          <p className='mt-3'>Forgot your Password? <Link to='/reset-password'>Reset Password </Link></p>
        </div>
      );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

// const mapDispatchToProps = {}

// export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default connect(mapStateToProps, { login })(LoginForm)