import React, { useState, useEffect } from 'react';
import { Link, Navigate  } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button } from "react-bootstrap";
import { signup } from '../actions/auth'

export const FormRegister = ({ signup, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false)
    const [formData, setFormData] = useState({
        name: 'Placeholder',
        email: '',
        password: '',
        re_password: ''
      });
    
      const { email, password, re_password } = formData;

      
    
      const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    
      const onSubmit = e => {
        e.preventDefault();
        if (password === re_password) {
          signup( email, password, re_password)
          setAccountCreated(true)
          
        }
        
      }

      if (isAuthenticated) {
        return <Navigate  to='/' />
      }
      if (isAuthenticated) {
        return <Navigate  to='/login' />
      }

    return (
        <div>
          <h1> Sign Up</h1>
          <p ></p>
          <Form onSubmit={e => onSubmit(e)} >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={e => handleChange(e)}  required/>
              
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={e => handleChange(e)} minLength='0' required/>
            </Form.Group>

            
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Retype Password" name='re_password' value={re_password} onChange={e => handleChange(e)} minLength='0' required/>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Button variant="primary" type="submit" >
              Signup
            </Button>
          </Form>
          {/* <p className='mt-3'>Don't have an account? <Link to='/signup'>Sign Up </Link></p>
          <p className='mt-3'>Forgot your Password? <Link to='/reset-password'>Reset Password </Link></p> */}
        </div>
      );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

// const mapDispatchToProps = {}

// export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default connect(mapStateToProps, { signup })(FormRegister)