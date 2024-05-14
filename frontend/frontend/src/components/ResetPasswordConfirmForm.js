// import React, { useState, useEffect } from 'react';
// import { Link, Navigate, useParams  } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { Form, Button } from "react-bootstrap";
// import { reset_password_confirm } from '../actions/auth'

// export const ResetPasswordConfirmForm = ({ match, reset_password_confirm }) => {
//     const [requestSent, setRequestSent] = useState(false)
//     const [formData, setFormData] = useState({
//         new_password: '',
//         re_new_password: ''
//       });

//       var   {  uid, token } = useParams();
    
//       const { new_password, re_new_password } = formData;
    
//       const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    
//       const onSubmit = e => {
//         e.preventDefault();
//         console.log(uid, token)

//         reset_password_confirm(uid, token, new_password, re_new_password)
//         setRequestSent(true)
//       }

//       if (requestSent) {
//         return <Navigate  to='/' />
//       }

//     return (
//         <div>
//           <h1>Password Reset:</h1>
//           <Form onSubmit={e => onSubmit(e)} >
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>New Password</Form.Label>
//               <Form.Control type="password" placeholder="Enter password" name='new_password' value={new_password} onChange={e => handleChange(e)}  required/>
              
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Confirm New Password</Form.Label>
//               <Form.Control type="password" placeholder="Retype password" name='re_new_password' value={re_new_password} onChange={e => handleChange(e)}  required/>
              
//             </Form.Group>
    
           
//             <Button variant="primary" type="submit" >
//               Reset Password
//             </Button>
//           </Form>
     
//         </div>
//       );
// }

// // const mapStateToProps = (state) => ({
// //     isAuthenticated: state.auth.isAuthenticated
// // })

// // const mapDispatchToProps = {}

// // export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm)

// export default connect(null, { reset_password_confirm })(ResetPasswordConfirmForm)