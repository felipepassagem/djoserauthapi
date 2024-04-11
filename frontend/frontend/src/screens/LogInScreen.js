import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Col } from "react-bootstrap";

import LoginForm from "../components/LoginForm";

function LogInScreen() {
  return (
    <div>
      
      <Col className="m-5">
        <div className="container-fluid bg-dark text-light p-5 ">
          <div className="container bg-dark p-3"></div>
          <LoginForm />
        </div>
      </Col>

      
    </div>
  );
}

export default connect()(LogInScreen);
