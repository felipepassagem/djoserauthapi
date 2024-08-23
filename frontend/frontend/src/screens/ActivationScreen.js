import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Button, Col, Row } from "react-bootstrap";
import { verify } from "../actions/auth";
import LoadingSpinner from "../components/LoadingSpinner";

export const ActivationScreen = ({ verify }) => {
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  var { uid, token } = useParams();

  const verify_account = (e) => {
    e.preventDefault();
    setIsLoading(true)
    verify(uid, token);
    setVerified(true);
    setIsLoading(false)
  };

  if (verified) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mt-5">
      <div className="justify-content-center">
        <Row>
          <h1>Verify your Account:</h1>
        </Row>
        <Row>
          <Button variant="primary" onClick={verify_account}>
            
            {isLoading ? <LoadingSpinner /> : "Verify"}
          </Button>
        </Row>
      </div>
    </div>

    //  <div className="d-flex flex-column jusify-content-center align-itens-center">
    //   <h1>Verify your account</h1>
    //  <Button variant="primary" onClick={verify_account}>
    //         Verify
    //       </Button>

    //  </div>
  );
};

// const mapDispatchToProps = {}

// export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default connect(null, { verify })(ActivationScreen);
