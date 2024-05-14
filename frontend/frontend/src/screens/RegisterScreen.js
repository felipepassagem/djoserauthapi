import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/auth";
import axios from "axios";
import { toast } from 'react-toastify';
import LoadingSpinner from "../components/LoadingSpinner";



export const RegisterScreen = ({ signup, isAuthenticated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    name: "Placeholder",
    email: "",
    password: "",
    re_password: "",
  });

  const { email, password, re_password } = formData;

  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=http://localhost:8000`
      );
      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === re_password) {
      setIsLoading(true)
      var res = await signup(email, password, re_password);
      setIsLoading(false)
      if (res[0] === 1){
        toast.success(res[1]);
        setAccountCreated(true);
        <Navigate to="/" />
        
      } else {
        toast.error("Error " + res[2] + ": " + res[1]);
      }
      
    }

    
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div className="p-5 m-5 login-signup-form">
        <h1> Sign Up</h1>
        <p></p>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={(e) => handleChange(e)}
              required
              disabled={isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => handleChange(e)}
              minLength="0"
              required
              disabled={isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Retype Password"
              name="re_password"
              value={re_password}
              onChange={(e) => handleChange(e)}
              minLength="0"
              required
              disabled={isLoading}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : "Signup"}
          </Button>
        </Form>

        <Button
          className="mt-2"
          variant="danger"
          type="submit"
          onClick={continueWithGoogle}
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner /> : "Continue With Google"}
        </Button>
        <p className="mt-3">
          Already have an account? <Link to="/login">Login </Link>
        </p>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(RegisterScreen);


//Nigga8194@@