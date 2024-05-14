import React, { Fragment} from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { logout } from '../actions/auth'


function HomeScreen({ logout, isAuthenticated }) {

  if (!isAuthenticated) {
    var btn = () => (
      <Fragment>
          <Button href="/login">Login</Button>
      </Fragment>
    )
  } else {
    var btn = () => (
      <Fragment>
          <Button onClick={logout}>Logout</Button>
      </Fragment>
    )
  }
  console.log(isAuthenticated)
  return (
    <div className="container home-container  p-5 m-5 rounded">
      <div className="container p-5">
          <h1 className="display-3">Auth System</h1>
          <hr/>
          <p>Test auth system</p>
          {btn()}
      </div>
  </div>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default  connect(mapStateToProps, { logout })(HomeScreen);