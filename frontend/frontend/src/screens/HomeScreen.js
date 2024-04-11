import React from 'react'
import { Link } from 'react-router-dom'

function HomeScreen() {
  return (
    <div className="container bg-dark text-light p-5 m-5 rounded">
      <div className="container bg-dark p-5">
          <h1 className="display-4">Auth System</h1>
          <hr/>
          <p>Test auth system</p>
          <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
  </div>
  )
}

export default HomeScreen;