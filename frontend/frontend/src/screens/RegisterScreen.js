import React from "react";
import FormRegister from "../components/FormRegister.js";
import { Col } from "react-bootstrap";

function RegisterScreen() {
  return (
    <div>
      
      <Col className="m-5">
        <div className="container-fluid bg-dark text-light p-5 ">
          <div className="container bg-dark p-3"></div>
          <FormRegister />
        </div>
      </Col>

      
    </div>
  );
}

export default RegisterScreen;
