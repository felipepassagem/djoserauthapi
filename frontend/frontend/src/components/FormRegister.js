import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import APIService from "../APIService.js"


function FormRegister() {

    function handleButton(){
      APIService.LoginUser()
    }

  return (
    <div>
      <h1> Register Form</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="button" onClick={() => handleButton()}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default FormRegister;