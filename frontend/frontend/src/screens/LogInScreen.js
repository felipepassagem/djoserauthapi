import React, { useState, useEffect } from "react";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Button, Container } from "react-bootstrap";
import { login } from "../actions/auth";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";


function LogInScreen({ login, isAuthenticated }) {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await login(email, password);
    if (res[0] === 1){
      toast.success(res[1]);
    } else {
      toast.error("Error " + res[2] + ": " + res[1]);
    }
    setIsLoading(false);


  };

  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=http://localhost:8000`
      );
      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div className="p-5 m-5 login-signup-form">
        <h1> Login</h1>
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

          <Button variant="primary" type="submit" disabled={isLoading} >
            {isLoading ? <LoadingSpinner /> : "Login"}
          </Button>
        </Form>
        <Button
        className="mt-2"
          variant="danger"
          type="submit"
          disabled={isLoading}
          onClick={continueWithGoogle}
        >
          {isLoading ? <LoadingSpinner /> : "Continue With Google"}
        </Button>
        <p className="mt-3">
          Don't have an account? <Link to="/signup">Sign Up </Link>
        </p>
        <p className="mt-3">
          Forgot your Password?{" "}
          <Link to="/reset-password">Reset Password </Link>
        </p>
      </div>
    </Container>
  );


}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LogInScreen);
